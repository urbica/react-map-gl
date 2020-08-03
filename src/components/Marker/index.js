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

  /**
   * A string indicating the part of the Marker
   * that should be positioned closest to the coordinate
   */
  anchor:
    | 'center'
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right',

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

  /**
   * The rotation angle of the marker in degrees, relative to its
   * respective `rotationAlignment` setting. A positive value will
   * rotate the marker clockwise.
   */
  rotation: number,

  /**
   * map aligns the `Marker` to the plane of the map. `viewport`
   * aligns the  Marker to the plane of the viewport. `auto` automatically
   * matches the value of `rotationAlignment`.
   */
  pitchAlignment: string,

  /**
   * map aligns the `Marker`'s rotation relative to the map, maintaining
   * a bearing as the map rotates. `viewport` aligns the `Marker`'s rotation
   * relative to the viewport, agnostic to map rotations.
   * `auto` is equivalent to `viewport`.
   */
  rotationAlignment: string,

  /** Fired when the marker is clicked */
  onClick?: () => any,

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
    anchor: 'center',
    offset: null,
    draggable: false,
    rotation: 0,
    pitchAlignment: 'auto',
    rotationAlignment: 'auto'
  };

  constructor(props: Props) {
    super(props);
    this._el = document.createElement('div');
  }

  componentDidMount() {
    const {
      longitude,
      latitude,
      onClick,
      onDragEnd,
      onDragStart,
      onDrag
    } = this.props;

    this._marker = new mapboxgl.Marker({
      element: this._el,
      anchor: this.props.anchor,
      draggable: this.props.draggable,
      offset: this.props.offset,
      rotation: this.props.rotation,
      pitchAlignment: this.props.pitchAlignment,
      rotationAlignment: this.props.rotationAlignment
    });

    this._marker.setLngLat([longitude, latitude]).addTo(this._map);

    if (onClick) {
      this._el.addEventListener('click', onClick);
    }

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

    if (this.props.onClick) {
      this._el.removeEventListener('click', this.props.onClick);
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
