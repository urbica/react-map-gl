// @flow

import mapboxgl from 'mapbox-gl';
import supercluster from 'supercluster';
import { point } from '@turf/helpers';
import { Children, PureComponent, createElement } from 'react';
import type { Node, Component } from 'react';
import Marker from './Marker';

type Props = {
  /** Mapbox GL JS map instance */
  map: mapboxgl.Map,

  /** Minimum zoom level at which clusters are generated */
  minZoom: Number,

  /** Maximum zoom level at which clusters are generated */
  maxZoom: Number,

  /** Cluster radius, in pixels */
  radius: Number,

  /** (Tiles) Tile extent. Radius is calculated relative to this value */
  extent: Number,

  /** Size of the KD-tree leaf node. Affects performance */
  nodeSize: Number,

  /** Whether timing info should be logged */
  log: Boolean,

  /** ReactDOM element to use as a marker */
  element: Class<Component<any, any>>,

  /** Markers */
  children: Node
};

type State = {
  clusters: Array<Object>
};

class Cluster extends PureComponent<Props, State> {
  _cluster: Object;
  _recalculate: () => void;

  static displayName = 'Cluster';

  static defaultProps = {
    minZoom: 0,
    maxZoom: 16,
    radius: 40,
    extent: 512,
    nodeSize: 64,
    log: false
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      clusters: []
    };

    this._recalculate = this._recalculate.bind(this);
  }

  componentDidMount() {
    const {
      map,
      minZoom,
      maxZoom,
      radius,
      extent,
      nodeSize,
      log,
      children
    } = this.props;

    const points = Children.map(children, child =>
      point([child.props.longitude, child.props.latitude], child));

    const cluster = supercluster({
      minZoom,
      maxZoom,
      radius,
      extent,
      nodeSize,
      log
    });

    cluster.load(points);
    this._cluster = cluster;

    map.on('moveend', this._recalculate);
    this._recalculate();
  }

  _recalculate() {
    const { map } = this.props;
    const zoom = map.getZoom();
    const bounds = map.getBounds().toArray();
    const bbox = bounds[0].concat(bounds[1]);

    const clusters = this._cluster.getClusters(bbox, Math.floor(zoom));
    this.setState({ clusters });
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
          element: createElement(element, cluster.properties),
          key: `cluster-${cluster.properties.cluster_id}`
        });
      }
      const { type, key, props } = cluster.properties;
      return createElement(type, { map, key, ...props });
    });
  }
}

export default Cluster;
