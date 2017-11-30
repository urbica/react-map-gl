// @flow

import supercluster from 'supercluster';
import { point } from '@turf/helpers';
import { Children, PureComponent, createElement } from 'react';
import type { Node, Component } from 'react';

import mapboxgl from '../utils/mapbox-gl';
import Marker from './Marker';
import shallowCompareChildren from '../utils/shallowCompareChildren';

type Props = {
  /** Mapbox GL JS map instance */
  map: mapboxgl.Map,

  /** Minimum zoom level at which clusters are generated */
  minZoom: number,

  /** Maximum zoom level at which clusters are generated */
  maxZoom: number,

  /** Cluster radius, in pixels */
  radius: number,

  /** (Tiles) Tile extent. Radius is calculated relative to this value */
  extent: number,

  /** Size of the KD-tree leaf node. Affects performance */
  nodeSize: number,

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
    const { map } = this.props;

    this._createCluster(this.props);
    this._recalculate();

    map.on('moveend', this._recalculate);
  }

  componentWillReceiveProps(newProps: Props) {
    const shouldUpdate =
      newProps.minZoom !== this.props.minZoom ||
      newProps.maxZoom !== this.props.maxZoom ||
      newProps.radius !== this.props.radius ||
      newProps.extent !== this.props.extent ||
      newProps.nodeSize !== this.props.nodeSize ||
      !shallowCompareChildren(this.props.children, newProps.children);

    if (shouldUpdate) {
      this._createCluster(newProps);
      this._recalculate();
    }
  }

  _createCluster(props: Props) {
    const {
      minZoom, maxZoom, radius, extent, nodeSize, children, innerRef
    } = props;

    const cluster = supercluster({
      minZoom,
      maxZoom,
      radius,
      extent,
      nodeSize
    });

    const points = Children.map(children, child =>
      point([child.props.longitude, child.props.latitude], child));

    cluster.load(points);
    this._cluster = cluster;
    if (innerRef) innerRef(this._cluster);
  }

  _recalculate() {
    const { map } = this.props;
    const zoom = map.getZoom();
    const bounds = map.getBounds().toArray();
    const bbox = bounds[0].concat(bounds[1]);

    const clusters = this._cluster.getClusters(bbox, Math.floor(zoom));
    this.setState(() => ({ clusters }));
  }

  render() {
    const { clusters } = this.state;
    const { map, element } = this.props;

    return clusters.map((cluster) => {
      if (cluster.properties.cluster) {
        const [longitude, latitude] = cluster.geometry.coordinates;
        return createElement(Marker, {
          map,
          longitude,
          latitude,
          element: createElement(element, cluster),
          key: `cluster-${cluster.properties.cluster_id}`
        });
      }
      const { type, key, props } = cluster.properties;
      return createElement(type, { map, key, ...props });
    });
  }
}

export default Cluster;
