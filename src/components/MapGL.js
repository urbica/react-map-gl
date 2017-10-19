// @flow

import mapboxgl from 'mapbox-gl';
import { Children, PureComponent, createElement } from 'react';
import { isImmutable } from 'immutable';
import type { Node } from 'react';

import type { MapStyle, Viewport } from '../types';

type Props = {
  /** container className */
  className: String,

  /** container style */
  style: Object,

  /** The Mapbox style. A string url or a MapboxGL style Immutable.Map object. */
  mapStyle: string | MapStyle,

  /** Sources and Layers */
  children?: Node,

  /** Mapbox API access token for mapbox-gl-js. Required when using Mapbox vector tiles/styles. */
  accessToken: string,

  /** Mapbox WebGL context creation option. Useful when you want to export the canvas as a PNG. */
  preserveDrawingBuffer: boolean,

  /** The longitude of the center of the map. */
  longitude: number,

  /** The latitude of the center of the map. */
  latitude: number,

  /** The tile zoom level of the map. */
  zoom: number,

  /** Specify the bearing of the viewport */
  bearing: number,

  /** Specify the pitch of the viewport */
  pitch: number,

  /**
   * `onViewportChange` callback is fired when the user interacted with the
   * map. The object passed to the callback contains viewport properties
   * such as `longitude`, `latitude`, `zoom` etc.
   */
  onViewportChange: (viewport: Viewport) => void,

  /** The onLoad callback for the map */
  onLoad: Function
};

type State = {
  loaded: boolean
};

class MapGL extends PureComponent<Props, State> {
  _map: mapboxgl.Map;
  _container: ?HTMLElement;
  _onViewportChange: (event: mapboxgl.MapMouseEvent | mapboxgl.MapTouchEvent) => void;

  static defaultProps = {
    className: null,
    style: null,
    mapStyle: 'mapbox://styles/mapbox/light-v8',
    accessToken: null,
    preserveDrawingBuffer: false,
    bearing: 0,
    pitch: 0,
    onViewportChange: null,
    onLoad: null
  };

  constructor(props: Props) {
    super(props);

    if (mapboxgl) {
      mapboxgl.accessToken = props.accessToken;
    }

    this._onViewportChange = this._onViewportChange.bind(this);
  }

  state = {
    loaded: false
  };

  componentDidMount() {
    if (!mapboxgl) {
      return;
    }

    const mapStyle = isImmutable(this.props.mapStyle)
      ? (this.props.mapStyle: MapStyle).toJS()
      : this.props.mapStyle;

    const map = new mapboxgl.Map({
      container: this._container,
      style: mapStyle,
      center: [this.props.longitude, this.props.latitude],
      zoom: this.props.zoom,
      pitch: this.props.pitch,
      bearing: this.props.bearing,
      interactive: !!this.props.onViewportChange,
      preserveDrawingBuffer: this.props.preserveDrawingBuffer
    });

    map.once('load', () => {
      this.setState({ loaded: true }, this.props.onLoad);
    });

    if (this.props.onViewportChange) {
      map.on('dragend', this._onViewportChange);
      map.on('zoomend', this._onViewportChange);
      map.on('rotateend', this._onViewportChange);
      map.on('pitchend', this._onViewportChange);
      map.on('boxzoomend', this._onViewportChange);
    }

    this._map = map;
    this._updateMapViewport(this.props);
  }

  componentWillReceiveProps(newProps: Props) {
    this._updateMapViewport(newProps);
    this._updateMapStyle(this.props, newProps);
  }

  componentWillUnmount() {
    if (this._map) {
      this._map.remove();
    }
  }

  /**
   * Update Map style from newProps
   *
   * @private
   * @param {Props} prevProps
   * @param {Props} newProps
   */
  _updateMapStyle(prevProps: Props, newProps: Props): void {
    const newMapStyle = newProps.mapStyle;
    const prevMapStyle = prevProps.mapStyle;

    if (isImmutable(newMapStyle) && !(newMapStyle: MapStyle).equals(prevMapStyle)) {
      this._map.setStyle((newMapStyle: MapStyle).toJS());
    } else if (newMapStyle !== prevMapStyle) {
      this._map.setStyle(newMapStyle);
    }
  }

  /**
   * Update Map viewport from newProps
   *
   * @private
   * @param {Props} newProps
   */
  _updateMapViewport(newProps: Props): void {
    const map: mapboxgl.Map = this._map;
    const center: mapboxgl.LngLat = map.getCenter();

    const viewportChanged =
      newProps.latitude !== center.lat ||
      newProps.longitude !== center.lng ||
      newProps.zoom !== map.getZoom() ||
      newProps.pitch !== map.getPitch() ||
      newProps.bearing !== map.getBearing();

    if (viewportChanged) {
      map.flyTo({
        center: [newProps.longitude, newProps.latitude],
        zoom: newProps.zoom,
        pitch: newProps.pitch,
        bearing: newProps.bearing
      });
    }
  }

  /**
   * fires `onViewportChange` callback when the user interacted with the map.
   *
   * @private
   * @param {(mapboxgl.MapMouseEvent | mapboxgl.MapTouchEvent)} event
   */
  _onViewportChange(event: mapboxgl.MapMouseEvent | mapboxgl.MapTouchEvent): void {
    const map: mapboxgl.Map = event.target;
    const { lng, lat } = map.getCenter();
    const zoom = map.getZoom();
    const pitch = map.getPitch();
    const bearing = map.getBearing();

    const viewport: Viewport = {
      latitude: lat,
      longitude: lng,
      zoom,
      pitch,
      bearing
    };

    this.props.onViewportChange(viewport);
  }

  render() {
    const { loaded } = this.state;
    const { children, className, style } = this.props;

    return createElement(
      'div',
      {
        ref: ref => (this._container = ref),
        style,
        className
      },
      loaded &&
        Children.map(children, ({ type, props }) =>
          createElement(type, { map: this._map, ...props }))
    );
  }
}

export default MapGL;
