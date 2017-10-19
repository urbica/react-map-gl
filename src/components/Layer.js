// @flow

import mapboxgl from 'mapbox-gl';
import { PureComponent } from 'react';
import { is } from 'immutable';
import type { MapLayer } from '../types';
import diff from '../diff';
import queryRenderedFeatures from '../queryRenderedFeatures';

type Props = {
  /** Mapbox GL JS map instance */
  map: mapboxgl.Map,

  /** Mapbox GL layer id */
  id?: string,

  /** ImmutableJS Object representing Mapbox GL layer */
  layer: MapLayer,

  /**
   * Called when the layer is clicked.
   * @callback
   * @param {Object} event - The mouse event.
   * @param {[Number, Number]} event.lngLat - The coordinates of the pointer
   * @param {Array} event.features - The features under the pointer, using Mapbox's
   * queryRenderedFeatures API:
   * https://www.mapbox.com/mapbox-gl-js/api/#Map#queryRenderedFeatures
   */
  onClick: (event: mapboxgl.MapEvent) => any,

  /**
   * Called when the layer is hovered over.
   * @callback
   * @param {Object} event - The mouse event.
   * @param {[Number, Number]} event.lngLat - The coordinates of the pointer
   * @param {Array} event.features - The features under the pointer, using Mapbox's
   * queryRenderedFeatures API:
   * https://www.mapbox.com/mapbox-gl-js/api/#Map#queryRenderedFeatures
   */
  onHover: (event: mapboxgl.MapEvent) => any,

  /**
   * Called when the layer feature is entered.
   * @callback
   * @param {Object} event - The mouse event.
   * @param {[Number, Number]} event.lngLat - The coordinates of the pointer
   * @param {Array} event.features - The features under the pointer, using Mapbox's
   * queryRenderedFeatures API:
   * https://www.mapbox.com/mapbox-gl-js/api/#Map#queryRenderedFeatures
   */
  onEnter: (event: mapboxgl.MapEvent) => any,

  /**
   * Called when the layer feature is leaved.
   * @callback
   * @param {Object} event - The mouse event.
   * @param {[Number, Number]} event.lngLat - The coordinates of the pointer
   * @param {Array} event.features - The features under the pointer, using Mapbox's
   * queryRenderedFeatures API:
   * https://www.mapbox.com/mapbox-gl-js/api/#Map#queryRenderedFeatures
   */
  onLeave: (event: mapboxgl.MapEvent) => any,

  /** Radius to detect features around a clicked/hovered point (defaults to 0) */
  radius: number
};

class Layer extends PureComponent<Props> {
  _id: string;
  _onClick: (event: mapboxgl.MapEvent) => void;
  _onHover: (event: mapboxgl.MapEvent) => void;
  _onEnter: (event: mapboxgl.MapEvent) => void;
  _onLeave: (event: mapboxgl.MapEvent) => void;

  static defaultProps = {
    onClick: null,
    radius: 0
  };

  constructor(props: Props) {
    super(props);
    this._id = props.id || props.layer.get('id', '');

    this._onClick = this._onClick.bind(this);
    this._onHover = this._onHover.bind(this);
    this._onEnter = this._onEnter.bind(this);
    this._onLeave = this._onLeave.bind(this);
  }

  componentDidMount() {
    const { map, layer } = this.props;
    map.addLayer(layer.toJS());

    map.on('click', this._id, this._onClick);
    map.on('mousemove', this._id, this._onHover);
    map.on('mouseenter', this._id, this._onEnter);
    map.on('mouseleave', this._id, this._onLeave);
  }

  componentWillReceiveProps(newProps: Props) {
    const newLayer = newProps.layer;
    const prevLayer = this.props.layer;

    if (!is(newLayer, prevLayer)) {
      const { map } = newProps;

      const newPaint = newLayer.get('paint');
      const prevPaint = prevLayer.get('paint');
      if (!is(newPaint, prevPaint)) {
        diff(newPaint, prevPaint).forEach(([key, value]) =>
          map.setPaintProperty(this._id, key, value));
      }

      const newLayout = newLayer.get('layout');
      const prevLayout = prevLayer.get('layout');
      if (!is(newLayout, prevLayout)) {
        diff(newLayout, prevLayout).forEach(([key, value]) =>
          map.setLayoutProperty(this._id, key, value));
      }

      const newFilter = newLayer.get('filter');
      const prevFilter = prevLayer.get('filter');
      if (!newFilter) {
        map.setFilter(this._id, undefined);
      } else if (!is(newFilter, prevFilter)) {
        map.setFilter(this._id, newFilter.toArray());
      }
    }
  }

  componentWillUnmount() {
    const { map } = this.props;
    if (!map || !map.getStyle()) {
      return;
    }

    map.removeLayer(this._id);
  }

  _onClick(event: mapboxgl.MapEvent): void {
    if (this.props.onClick) {
      const { map, radius } = this.props;
      const position = [event.point.x, event.point.y];

      /* eslint-disable no-param-reassign */
      event.features = queryRenderedFeatures(map, this._id, position, radius);
      /* eslint-enable no-param-reassign */

      this.props.onClick(event);
    }
  }

  _onHover(event: mapboxgl.MapEvent): void {
    if (this.props.onHover) {
      const { map, radius } = this.props;
      const position = [event.point.x, event.point.y];

      /* eslint-disable no-param-reassign */
      event.features = queryRenderedFeatures(map, this._id, position, radius);
      /* eslint-enable no-param-reassign */

      this.props.onHover(event);
    }
  }

  _onEnter(event: mapboxgl.MapEvent): void {
    if (this.props.onEnter) {
      const { map, radius } = this.props;
      const position = [event.point.x, event.point.y];

      /* eslint-disable no-param-reassign */
      event.features = queryRenderedFeatures(map, this._id, position, radius);
      /* eslint-enable no-param-reassign */

      this.props.onEnter(event);
    }
  }

  _onLeave(event: mapboxgl.MapEvent): void {
    if (this.props.onLeave) {
      const { map, radius } = this.props;
      const position = [event.point.x, event.point.y];

      /* eslint-disable no-param-reassign */
      event.features = queryRenderedFeatures(map, this._id, position, radius);
      /* eslint-enable no-param-reassign */

      this.props.onLeave(event);
    }
  }

  render() {
    return null;
  }
}

export default Layer;
