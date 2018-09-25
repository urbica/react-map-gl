// @flow

import supercluster from 'supercluster';
import { Children, PureComponent, createElement } from 'react';
import type { Node, Component } from 'react';

import Marker from '../Marker';
import MapContext from '../MapContext';

import point from '../../utils/point';
import shallowCompareChildren from '../../utils/shallowCompareChildren';

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

  /** ReactDOM element to use as a marker */
  element: Class<Component<any, any>>,

  /**
   * Callback that is called with the supercluster instance as an argument
   * after componentDidMount
   */
  /* eslint-disable react/no-unused-prop-types */
  innerRef: (cluster: supercluster.Supercluster) => void,
  /* eslint-enable react/no-unused-prop-types */

  /** Markers as children */
  children: Node
};

type State = {
  clusters: Array<Object>
};

class Cluster extends PureComponent<Props, State> {
  _map: MapboxMap;

  _cluster: Object;

  _recalculate: () => void;

  _createCluster: (props: Props) => void;

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

    this._recalculate = this._recalculate.bind(this);
    this._createCluster = this._createCluster.bind(this);
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

  _createCluster(props: Props) {
    const { minZoom, maxZoom, radius, extent, nodeSize, children, innerRef } = props;

    const cluster = supercluster({
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
    if (innerRef) innerRef(this._cluster);
  }

  _recalculate() {
    const zoom = this._map.getZoom();
    const bounds = this._map.getBounds().toArray();
    const bbox = bounds[0].concat(bounds[1]);

    const clusters = this._cluster.getClusters(bbox, Math.floor(zoom));
    this.setState(() => ({ clusters }));
  }

  render() {
    return createElement(MapContext.Consumer, {}, (map) => {
      if (map) {
        this._map = map;
      }

      const clusters = this.state.clusters.map((cluster) => {
        if (cluster.properties.cluster) {
          const [longitude, latitude] = cluster.geometry.coordinates;
          return createElement(Marker, {
            longitude,
            latitude,
            element: createElement(this.props.element, cluster),
            key: `cluster-${cluster.properties.cluster_id}`
          });
        }
        const { type, key, props } = cluster.properties;
        return createElement(type, { key, ...props });
      });

      return clusters;
    });
  }
}

export default Cluster;
