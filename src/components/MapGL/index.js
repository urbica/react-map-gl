// @flow

import { PureComponent, createElement, createRef } from 'react';
import type { ChildrenArray, Element, ElementRef } from 'react';
import type MapboxMap from 'mapbox-gl/src/ui/map';
import type MapboxLngLatBoundsLike from 'mapbox-gl/src/geo/lng_lat_bounds';
import type { AnimationOptions } from 'mapbox-gl/src/ui/camera';
import type { StyleSpecification } from 'mapbox-gl/src/style-spec/types';
import type { MapMouseEvent, MapTouchEvent } from 'mapbox-gl/src/ui/events';

import MapContext from '../MapContext';
import mapboxgl from '../../utils/mapbox-gl';
import events from './events';
import capitalizeFirstLetter from '../../utils/capitalizeFirstLetter';

/* eslint-disable import/no-cycle */
import normalizeChildren from '../../utils/normalizeChildren';

import type { EventProps } from './eventProps';

export type Viewport = {|
  latitude: number,
  longitude: number,
  zoom: number,
  pitch?: number,
  bearing?: number
|};

export const jumpTo = 'jumpTo';
export const easeTo = 'easeTo';
export const flyTo = 'flyTo';

export type ViewportChangeMethod = 'jumpTo' | 'easeTo' | 'flyTo';
export type ViewportChangeEvent = MapMouseEvent | MapTouchEvent;

export type Children = ChildrenArray<Element<any>>;

type Props = EventProps & {
  /** container className */
  className?: string,

  /** container style */
  style?: {
    [CSSProperty: string]: any
  },

  /**
   * The Mapbox style. A string url or a Mapbox GL style object.
   */
  mapStyle: string | StyleSpecification,

  /** MapGL children as Sources, Layers, Controls, and custom Components */
  children?: Children,

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
   * If `true`, the gl context will be created with MSAA antialiasing,
   * which can be useful for antialiasing custom layers. this is `false`
   * by default as a performance optimization.
   */
  antialias?: boolean,

  /**
   * If `false`, the map won't attempt to re-request tiles once they
   * expire per their HTTP `cacheControl`/`expires` headers.
   */
  refreshExpiredTiles?: boolean,

  /** If set, the map will be constrained to the given bounds. */
  maxBounds?: MapboxLngLatBoundsLike,

  /**
   * The initial bounds of the map. If bounds is specified,
   * it overrides center and zoom constructor options.
   * */
  bounds?: MapboxLngLatBoundsLike,

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
   * The maximum number of tiles stored in the tile cache for a given
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
   * If specified, defines a CSS font-family for locally overriding
   * generation of glyphs in the 'CJK Unified Ideographs' and
   * 'Hangul Syllables' ranges. In these ranges, font settings from the
   * map's style will be ignored, except for font-weight keywords
   * (light/regular/medium/bold). The purpose of this option is to avoid
   * bandwidth-intensive glyph server requests.
   * (see https://www.mapbox.com/mapbox-gl-js/example/local-ideographs )
   */
  localIdeographFontFamily?: boolean,

  /**
   * A callback run before the Map makes a request for an external URL.
   * The callback can be used to modify the url, set headers, or set the
   * credentials property for cross-origin requests. Expected to return
   * an object with a  url property and optionally  headers and
   * credentials properties.
   */
  transformRequest?: (
    url: string,
    resourceType: string
  ) => { url: string, headers?: Object, credentials?: string },

  /**
   * If true, Resource Timing API information will be collected for
   * requests made by GeoJSON and Vector Tile web workers (this information
   * is normally inaccessible from the main Javascript thread). Information
   * will be returned in a resourceTiming property of relevant data events.
   */
  collectResourceTiming?: boolean,

  /**
   * Controls the duration of the fade-in/fade-out animation for label
   * collisions, in milliseconds. This setting affects all symbol layers.
   * This setting does not affect the duration of runtime styling transitions
   * or raster tile cross-fading.
   */
  fadeDuration?: number,

  /**
   * If `true`, symbols from multiple sources can collide with each
   * other during collision detection. If `false`, collision detection
   * is run separately for the symbols in each source.
   */
  crossSourceCollisions?: boolean,

  /**
   * A patch to apply to the default localization table for UI strings,
   * e.g. control tooltips. The `locale` object maps namespaced UI string IDs
   * to translated strings in the target language;
   * see `src/ui/default_locale.js` for an example with all supported
   * string IDs. The object may specify all UI strings (thereby adding support
   * for a new translation) or only a subset of strings (thereby patching
   * the default translation table).
   */
  locale?: string,

  /**
   * `onViewportChange` callback is fired when the user interacted with the
   * map. The object passed to the callback contains viewport properties
   * such as `longitude`, `latitude`, `zoom` etc.
   */
  onViewportChange?: (viewport: Viewport) => void,

  /**
   * Map method that will be called after new viewport props are received.
   */
  viewportChangeMethod?: ViewportChangeMethod,

  /**
   * Options common to map movement methods that involve animation,
   * controlling the duration and easing function of the animation.
   * This options will be passed to the `viewportChangeMethod` call.
   * (see https://docs.mapbox.com/mapbox-gl-js/api/#animationoptions)
   */
  viewportChangeOptions?: AnimationOptions,

  /** The onLoad callback for the map */
  onLoad?: Function,

  /** Map cursor style as CSS value */
  cursorStyle?: string,

  /**
   * Sets a Boolean indicating whether the map will render an outline around
   * each tile and the tile ID. These tile boundaries are useful for debugging.
   * */
  showTileBoundaries?: boolean
};

type State = {
  loaded: boolean
};

class MapGL extends PureComponent<Props, State> {
  _map: MapboxMap;

  _container: { current: null | ElementRef<'div'> };

  static displayName = 'MapGL';

  static defaultProps = {
    children: null,
    className: null,
    style: null,
    mapStyle: 'mapbox://styles/mapbox/light-v8',
    accessToken: null,
    bearing: 0,
    pitch: 0,
    minZoom: 0,
    maxZoom: 22,
    maxBounds: null,
    bounds: null,
    hash: false,
    bearingSnap: 7,
    pitchWithRotate: true,
    attributionControl: true,
    logoPosition: 'bottom-left',
    failIfMajorPerformanceCaveat: false,
    preserveDrawingBuffer: false,
    antialias: false,
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
    onLoad: null,
    localIdeographFontFamily: null,
    transformRequest: null,
    collectResourceTiming: false,
    fadeDuration: 300,
    crossSourceCollisions: true,
    locale: null,
    cursorStyle: null,
    viewportChangeMethod: jumpTo,
    viewportChangeOptions: null
  };

  constructor(props: Props) {
    super(props);

    if (mapboxgl) {
      mapboxgl.accessToken = props.accessToken;
    }

    this._container = createRef();
  }

  state = {
    loaded: false
  };

  componentDidMount() {
    if (!mapboxgl) {
      return;
    }

    const container = this._container.current;

    const map: MapboxMap = new mapboxgl.Map({
      container,
      style: this.props.mapStyle,
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
      antialias: this.props.antialias,
      refreshExpiredTiles: this.props.refreshExpiredTiles,
      maxBounds: this.props.maxBounds,
      bounds: this.props.bounds,
      scrollZoom: this.props.scrollZoom,
      boxZoom: this.props.boxZoom,
      dragRotate: this.props.dragRotate,
      dragPan: this.props.dragPan,
      keyboard: this.props.keyboard,
      doubleClickZoom: this.props.doubleClickZoom,
      trackResize: this.props.trackResize,
      renderWorldCopies: this.props.renderWorldCopies,
      maxTileCacheSize: this.props.maxTileCacheSize,
      localIdeographFontFamily: this.props.localIdeographFontFamily,
      transformRequest: this.props.transformRequest,
      collectResourceTiming: this.props.collectResourceTiming,
      fadeDuration: this.props.fadeDuration,
      crossSourceCollisions: this.props.crossSourceCollisions,
      locale: this.props.locale
    });

    this._map = map;

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

    events.forEach((event) => {
      const propName = `on${capitalizeFirstLetter(event)}`;
      const prop = this.props[propName];
      if (prop) {
        if (Array.isArray(prop)) {
          map.on(event, ...prop);
        } else {
          map.on(event, prop);
        }
      }
    });

    if (this.props.cursorStyle) {
      map.getCanvas().style.cursor = this.props.cursorStyle;
    }

    if (this.props.showTileBoundaries) {
      this._map.showTileBoundaries = this.props.showTileBoundaries;
    }
  }

  componentDidUpdate(prevProps: Props) {
    this._updateMapViewport(prevProps, this.props);
    this._updateMapStyle(prevProps, this.props);
    this._updateMapSize(prevProps, this.props);

    if (!prevProps.cursorStyle !== this.props.cursorStyle) {
      this._map.getCanvas().style.cursor = this.props.cursorStyle;
    }

    if (prevProps.showTileBoundaries !== this.props.showTileBoundaries) {
      this._map.showTileBoundaries = !!this.props.showTileBoundaries;
    }
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

    if (newMapStyle !== prevMapStyle) {
      this.setState({ loaded: false }, () => {
        this._map.setStyle(newMapStyle);
        this._map.once('style.load', () => this.setState({ loaded: true }));
      });
    }
  }

  /**
   * Update Map viewport from newProps
   *
   * @private
   * @param {Props} prevProps
   * @param {Props} newProps
   */
  _updateMapViewport(prevProps: Props, newProps: Props): void {
    const map: MapboxMap = this._map;
    const center = map.getCenter();

    const viewportChanged =
      (newProps.latitude !== prevProps.latitude &&
        newProps.latitude !== center.lat) ||
      (newProps.longitude !== prevProps.longitude &&
        newProps.longitude !== center.lng) ||
      (newProps.zoom !== prevProps.zoom && newProps.zoom !== map.getZoom()) ||
      (newProps.pitch !== prevProps.pitch &&
        newProps.pitch !== map.getPitch()) ||
      (newProps.bearing !== prevProps.bearing &&
        newProps.bearing !== map.getBearing());

    if (!viewportChanged) {
      return;
    }

    const viewport = {
      center: [newProps.longitude, newProps.latitude],
      zoom: newProps.zoom,
      pitch: newProps.pitch,
      bearing: newProps.bearing
    };

    const { viewportChangeMethod, viewportChangeOptions } = this.props;
    const options = { ...viewportChangeOptions, ...viewport };

    switch (viewportChangeMethod) {
      case flyTo:
        map.flyTo(options);
        break;
      case jumpTo:
        map.jumpTo(options);
        break;
      case easeTo:
        map.easeTo(options);
        break;
      default:
        throw new Error('Unknown viewport change method');
    }
  }

  /**
   * Update Map size from newProps
   *
   * @private
   * @param {Props} prevProps
   * @param {Props} newProps
   */
  _updateMapSize(prevProps: Props, newProps: Props): void {
    const sizeChanged =
      (prevProps.style && prevProps.style.height) !==
        (newProps.style && newProps.style.height) ||
      (prevProps.style && prevProps.style.width) !==
        (newProps.style && newProps.style.width);

    if (!sizeChanged) {
      return;
    }

    this._map.resize();
  }

  /**
   * fires `onViewportChange` callback when the user interacted with the map.
   *
   * @private
   * @param {ViewportChangeEvent} event
   */
  _onViewportChange = (event: ViewportChangeEvent): void => {
    if (!event.originalEvent) {
      return;
    }

    const map = this._map;

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
  };

  render() {
    const { loaded } = this.state;
    const { className, style } = this.props;

    const children = this.props.children
      ? normalizeChildren(this.props.children)
      : null;

    return createElement(
      MapContext.Provider,
      { value: this._map },
      createElement(
        'div',
        {
          ref: this._container,
          style,
          className
        },
        loaded && children
      )
    );
  }
}

export default MapGL;
