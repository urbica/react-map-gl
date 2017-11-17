// @flow

import mapboxgl from 'mapbox-gl';
import { Children, PureComponent, createElement } from 'react';
import { isImmutable } from 'immutable';
import type { Node } from 'react';
import type { MapStyle, Viewport } from '../types';

type ViewportChangeEvent = mapboxgl.MapMouseEvent | mapboxgl.MapTouchEvent;

type Props = {
  /** container className */
  className?: String,

  /** container style */
  style?: Object,

  /**
   * The Mapbox style. A string url or a MapboxGL style Immutable.Map object.
   */
  mapStyle: string | MapStyle,

  /** Sources and Layers */
  children?: Node,

  /**
   * Mapbox API access token for mapbox-gl-js.
   * Required when using Mapbox vector tiles/styles.
   */
  accessToken?: string,

  /** The longitude of the center of the map. */
  longitude: number,

  /** The latitude of the center of the map. */
  latitude: number,

  /** The tile zoom level of the map. */
  zoom: number,

  /** Specify the bearing of the viewport */
  bearing?: number,

  /** Specify the pitch of the viewport */
  pitch?: number,

  /** The minimum zoom level of the map (0-22). */
  minZoom?: number,

  /** The maximum zoom level of the map (0-22). */
  maxZoom?: number,

  /**
   * If `true`, the map's position (zoom, center latitude,
   * center longitude, bearing, and pitch) will be synced
   * with the hash fragment of the page's URL. For example,
   * http://path/to/my/page.html#2.59/39.26/53.07/-24.1/60.
   */
  hash?: boolean,

  /**
   * The threshold, measured in degrees, that determines when
   * the map's bearing (rotation) will snap to north. For
   * example, with a  bearingSnap of 7, if the user rotates the
   * map within 7 degrees of north, the map will automatically
   * snap to exact north.
   */
  bearingSnap?: number,

  /**
   * If `false`, the map's pitch (tilt) control with "drag to
   * rotate" interaction will be disabled.
   */
  pitchWithRotate?: boolean,

  /** If `true`, an AttributionControl will be added to the map. */
  attributionControl?: boolean,

  /* A string representing the position of the Mapbox wordmark on the map. */
  logoPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right',

  /**
   * If `true`, map creation will fail if the performance of Mapbox
   * GL JS would be dramatically worse than expected (i.e. a software
   * renderer would be used).
   */
  failIfMajorPerformanceCaveat?: boolean,

  /**
   * Mapbox WebGL context creation option.
   * Useful when you want to export the canvas as a PNG.
   */
  preserveDrawingBuffer?: boolean,

  /**
   * If `false`, the map won't attempt to re-request tiles once they
   * expire per their HTTP `cacheControl`/`expires` headers.
   */
  refreshExpiredTiles?: boolean,

  /** If set, the map will be constrained to the given bounds. */
  maxBounds?: mapboxgl.LngLatBoundsLike,

  /** If `true`, the "scroll to zoom" interaction is enabled. */
  scrollZoom?: boolean | Object,

  /** If `true`, the "box zoom" interaction is enabled */
  boxZoom?: boolean,

  /** If `true`, the "drag to rotate" interaction is enabled */
  dragRotate?: boolean,

  /** If `true`, the "drag to pan" interaction is enabled */
  dragPan?: boolean,

  /** If `true`, keyboard shortcuts are enabled */
  keyboard?: boolean,

  /** If `true`, the "double click to zoom" interaction is enabled */
  doubleClickZoom?: boolean,

  /**
   * If `true`, the map will automatically resize
   * when the browser window resizes.
   */
  trackResize?: boolean,

  /**
   * The maxiumum number of tiles stored in the tile cache for a given
   * source. If omitted, the cache will be dynamically sized based on
   * the current viewport.
   */
  maxTileCacheSize?: number,

  /**
   * If `true`, multiple copies of the world
   * will be rendered, when zoomed out
   */
  renderWorldCopies?: boolean,

  /**
   * `onViewportChange` callback is fired when the user interacted with the
   * map. The object passed to the callback contains viewport properties
   * such as `longitude`, `latitude`, `zoom` etc.
   */
  onViewportChange?: (viewport: Viewport) => void,

  /** The onLoad callback for the map */
  onLoad?: Function
};

type State = {
  loaded: boolean
};

class MapGL extends PureComponent<Props, State> {
  _map: mapboxgl.Map;
  _container: ?HTMLElement;
  _onViewportChange: (event: ViewportChangeEvent) => void;

  static displayName = 'MapGL';

  static defaultProps = {
    className: null,
    style: null,
    mapStyle: 'mapbox://styles/mapbox/light-v8',
    accessToken: null,
    bearing: 0,
    pitch: 0,
    minZoom: 0,
    maxZoom: 22,
    hash: false,
    bearingSnap: 7,
    pitchWithRotate: true,
    attributionControl: true,
    logoPosition: 'bottom-left',
    failIfMajorPerformanceCaveat: false,
    preserveDrawingBuffer: false,
    refreshExpiredTiles: true,
    boxZoom: true,
    scrollZoom: true,
    dragRotate: true,
    dragPan: true,
    keyboard: true,
    doubleClickZoom: true,
    trackResize: true,
    renderWorldCopies: true,
    maxTileCacheSize: null,
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
      ? this.props.mapStyle.toJS()
      : this.props.mapStyle;

    const map = new mapboxgl.Map({
      container: this._container,
      style: mapStyle,
      interactive: !!this.props.onViewportChange,
      center: [this.props.longitude, this.props.latitude],
      zoom: this.props.zoom,
      pitch: this.props.pitch,
      bearing: this.props.bearing,
      minZoom: this.props.minZoom,
      maxZoom: this.props.maxZoom,
      hash: this.props.hash,
      bearingSnap: this.props.bearingSnap,
      pitchWithRotate: this.props.pitchWithRotate,
      attributionControl: this.props.attributionControl,
      logoPosition: this.props.logoPosition,
      failIfMajorPerformanceCaveat: this.props.failIfMajorPerformanceCaveat,
      preserveDrawingBuffer: this.props.preserveDrawingBuffer,
      refreshExpiredTiles: this.props.refreshExpiredTiles,
      maxBounds: this.props.maxBounds,
      scrollZoom: this.props.scrollZoom,
      boxZoom: this.props.boxZoom,
      dragRotate: this.props.dragRotate,
      dragPan: this.props.dragPan,
      keyboard: this.props.keyboard,
      doubleClickZoom: this.props.doubleClickZoom,
      trackResize: this.props.trackResize,
      renderWorldCopies: this.props.renderWorldCopies,
      maxTileCacheSize: this.props.maxTileCacheSize
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

  // External apps can access map this way
  getMap() {
    return this._map;
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

    if (isImmutable(newMapStyle)) {
      if (!newMapStyle.equals(prevMapStyle)) {
        this._map.setStyle(newMapStyle.toJS());
      }
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
   * @param {ViewportChangeEvent} event
   */
  _onViewportChange(event: ViewportChangeEvent): void {
    if (!event.originalEvent) return;

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

    // $FlowFixMe
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
