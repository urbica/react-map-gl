// @flow

import { createPortal } from 'react-dom';
import { PureComponent, createElement } from 'react';
import type MapboxMap from 'mapbox-gl/src/ui/map';
import type MapboxMarker from 'mapbox-gl/src/ui/marker';
import type LngLat from 'mapbox-gl/src/geo/lng_lat';
import type { PointLike } from '@mapbox/point-geometry';

import MapContext from '../MapContext';
import mapboxgl from '../../utils/mapbox-gl';

type Props = {
  /** Marker content */
  children: React$Node,

  /** The longitude of the center of the marker. */
  longitude: number,

  /** The latitude of the center of the marker. */
  latitude: number,

  /**
   * The offset in pixels as a `PointLike` object to apply
   * relative to the element's center. Negatives indicate left and up.
   */
  offset?: PointLike,

  /**
   * Boolean indicating whether or not a marker is able to be dragged
   * to a new position on the map.
   */
  draggable?: boolean,

  /** Fired when the marker is finished being dragged */
  onDragEnd?: (lngLat: LngLat) => any,

  /** Fired when the marker is finished being dragged */
  onDragStart?: (lngLat: LngLat) => any,

  /** Fired when the marker is dragged */
  onDrag?: (lngLat: LngLat) => any
};

class Marker extends PureComponent<Props> {
  _map: MapboxMap;

  _el: HTMLDivElement;

  _marker: MapboxMarker;

  static displayName = 'Marker';

  static defaultProps = {
    offset: null,
    draggable: false
  };

  constructor(props: Props) {
    super(props);
    this._el = document.createElement('div');
  }

  componentDidMount() {
    const {
      longitude,
      latitude,
      offset,
      draggable,
      onDragEnd,
      onDragStart,
      onDrag
    } = this.props;

    this._marker = new mapboxgl.Marker(this._el, {
      draggable,
      offset
    });

    this._marker.setLngLat([longitude, latitude]).addTo(this._map);

    if (onDragEnd) {
      this._marker.on('dragend', this._onDragEnd);
    }

    if (onDragStart) {
      this._marker.on('dragstart', this._onDragStart);
    }

    if (onDrag) {
      this._marker.on('drag', this._onDrag);
    }
  }

  componentDidUpdate(prevProps: Props) {
    const positionChanged =
      prevProps.latitude !== this.props.latitude ||
      prevProps.longitude !== this.props.longitude;

    if (positionChanged) {
      this._marker.setLngLat([this.props.longitude, this.props.latitude]);
    }
  }

  componentWillUnmount() {
    if (!this._map || !this._map.getStyle()) {
      return;
    }

    this._marker.remove();
  }

  getMarker() {
    return this._marker;
  }

  _onDragEnd = (): void => {
    // $FlowFixMe
    this.props.onDragEnd(this._marker.getLngLat());
  };

  _onDragStart = (): void => {
    // $FlowFixMe
    this.props.onDragStart(this._marker.getLngLat());
  };

  _onDrag = (): void => {
    // $FlowFixMe
    this.props.onDrag(this._marker.getLngLat());
  };

  render() {
    return createElement(MapContext.Consumer, {}, (map) => {
      if (map) {
        this._map = map;
      }

      return createPortal(this.props.children, this._el);
    });
  }
}

export default Marker;
