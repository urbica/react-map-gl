// @flow
import Supercluster from 'supercluster';
import { Children, PureComponent, createElement, version } from 'react';

import MapContext from '../MapContext';

import point from '../../utils/point';
import shallowCompareChildren from '../../utils/shallowCompareChildren';

const reactVersion = parseInt(version, 10);

export type SuperclusterFeature = {
  type: 'Feature',
  id: number,
  properties: {
    cluster: true,
    cluster_id: number,
    point_count: number,
    point_count_abbreviated: string | number
  },
  geometry: {
    type: 'Point',
    coordinates: [number, number]
  }
};

export type ClusterComponentProps = {
  longitude: number,
  latitude: number,
  clusterId: number,
  pointCount: number,
  pointCountAbbreviated: string | number
};

export type ClusterComponent = React$Component<ClusterComponentProps, any>;

type Props = {
  /** Minimum zoom level at which clusters are generated */
  minZoom?: number,

  /** Maximum zoom level at which clusters are generated */
  maxZoom?: number,

  /** Cluster radius, in pixels */
  radius?: number,

  /** (Tiles) Tile extent. Radius is calculated relative to this value */
  extent?: number,

  /** Size of the KD-tree leaf node. Affects performance */
  nodeSize?: number,

  /** React Component for rendering Cluster */
  component: Class<ClusterComponent>,

  /** List of Markers */
  children: React$Node
};

type State = {
  clusters: Array<Object>
};

class Cluster extends PureComponent<Props, State> {
  _map: MapboxMap;

  _cluster: Object;

  static displayName = 'Cluster';

  static defaultProps = {
    minZoom: 0,
    maxZoom: 16,
    radius: 40,
    extent: 512,
    nodeSize: 64
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      clusters: []
    };
  }

  componentDidMount() {
    this._createCluster(this.props);
    this._recalculate();

    this._map.on('moveend', this._recalculate);
  }

  componentDidUpdate(prevProps: Props) {
    const shouldUpdate =
      prevProps.minZoom !== this.props.minZoom ||
      prevProps.maxZoom !== this.props.maxZoom ||
      prevProps.radius !== this.props.radius ||
      prevProps.extent !== this.props.extent ||
      prevProps.nodeSize !== this.props.nodeSize ||
      !shallowCompareChildren(prevProps.children, this.props.children);

    if (shouldUpdate) {
      this._createCluster(this.props);
      this._recalculate();
    }
  }

  componentWillUnmount() {
    if (!this._map || !this._map.getStyle()) {
      return;
    }

    this._map.off('moveend', this._recalculate);
  }

  getCluster() {
    return this._cluster;
  }

  _createCluster = (props: Props) => {
    const { minZoom, maxZoom, radius, extent, nodeSize, children } = props;

    const cluster = new Supercluster({
      minZoom,
      maxZoom,
      radius,
      extent,
      nodeSize
    });

    const points = Children.map(children, child =>
      point([child.props.longitude, child.props.latitude], child)
    );

    cluster.load(points);
    this._cluster = cluster;
  };

  _recalculate = () => {
    const zoom = this._map.getZoom();
    const bounds = this._map.getBounds().toArray();
    const bbox = bounds[0].concat(bounds[1]);

    const clusters = this._cluster.getClusters(bbox, Math.round(zoom));
    this.setState(() => ({ clusters }));
  };

  _renderCluster = (cluster: SuperclusterFeature) => {
    const [longitude, latitude] = cluster.geometry.coordinates;
    const {
      cluster_id: clusterId,
      point_count: pointCount,
      point_count_abbreviated: pointCountAbbreviated
    } = cluster.properties;

    return createElement(this.props.component, {
      longitude,
      latitude,
      clusterId,
      pointCount,
      pointCountAbbreviated,
      key: `cluster-${cluster.properties.cluster_id}`
    });
  };

  render() {
    return createElement(MapContext.Consumer, {}, (map) => {
      if (map) {
        this._map = map;
      }

      if (this.state.clusters.length === 0) {
        return null;
      }

      const clusters = this.state.clusters.map((cluster) => {
        if (cluster.properties.cluster) {
          return this._renderCluster(cluster);
        }
        const { type, key, props } = cluster.properties;
        return createElement(type, { key, ...props });
      });

      return reactVersion < 16 ? createElement('div', {}, ...clusters) : clusters;
    });
  }
}

export default Cluster;
