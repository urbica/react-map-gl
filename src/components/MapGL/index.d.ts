import { StyleSpecification } from "mapbox-gl/src/style-spec/types";
import type {
  Map,
  MapMouseEvent,
  MapTouchEvent,
  LngLatBoundsLike,
  AnimationOptions,
} from "mapbox-gl";
import type { PureComponent, ReactNode } from "react";
import { EventProps } from "./eventProps";

export type Viewport = {
  latitude: number;
  longitude: number;
  zoom: number;
  pitch?: number;
  bearing?: number;
};

export const jumpTo = "jumpTo";
export const easeTo = "easeTo";
export const flyTo = "flyTo";

export type ViewportChangeMethod = "jumpTo" | "easeTo" | "flyTo";
export type ViewportChangeEvent = MapMouseEvent | MapTouchEvent;

type Props = EventProps & {
  /** container className */
  className?: string;

  /** container style */
  style?: {
    [CSSProperty: string]: any;
  };

  /**
   * The Mapbox style. A string url or a Mapbox GL style object.
   */
  mapStyle: string | StyleSpecification;

  /** MapGL children as Sources, Layers, Controls, and custom Components */
  children?: ReactNode;

  /**
   * Mapbox API access token for mapbox-gl-js.
   * Required when using Mapbox vector tiles/styles.
   */
  accessToken?: string;

  /** The longitude of the center of the map. */
  longitude: number;

  /** The latitude of the center of the map. */
  latitude: number;

  /** The tile zoom level of the map. */
  zoom: number;

  /** Specify the bearing of the viewport */
  bearing?: number;

  /** Specify the pitch of the viewport */
  pitch?: number;

  /** The minimum zoom level of the map (0-22). */
  minZoom?: number;

  /** The maximum zoom level of the map (0-22). */
  maxZoom?: number;

  /**
   * If `true`, the map's position (zoom, center latitude,
   * center longitude, bearing, and pitch) will be synced
   * with the hash fragment of the page's URL. For example,
   * http://path/to/my/page.html#2.59/39.26/53.07/-24.1/60.
   */
  hash?: boolean;

  /**
   * The threshold, measured in degrees, that determines when
   * the map's bearing (rotation) will snap to north. For
   * example, with a  bearingSnap of 7, if the user rotates the
   * map within 7 degrees of north, the map will automatically
   * snap to exact north.
   */
  bearingSnap?: number;

  /**
   * If `false`, the map's pitch (tilt) control with "drag to
   * rotate" interaction will be disabled.
   */
  pitchWithRotate?: boolean;

  /** If `true`, an AttributionControl will be added to the map. */
  attributionControl?: boolean;

  /* A string representing the position of the Mapbox wordmark on the map. */
  logoPosition?: "top-left" | "top-right" | "bottom-left" | "bottom-right";

  /**
   * If `true`, map creation will fail if the performance of Mapbox
   * GL JS would be dramatically worse than expected (i.e. a software
   * renderer would be used).
   */
  failIfMajorPerformanceCaveat?: boolean;

  /**
   * Mapbox WebGL context creation option.
   * Useful when you want to export the canvas as a PNG.
   */
  preserveDrawingBuffer?: boolean;

  /**
   * If `true`, the gl context will be created with MSAA antialiasing,
   * which can be useful for antialiasing custom layers. this is `false`
   * by default as a performance optimization.
   */
  antialias?: boolean;

  /**
   * If `false`, the map won't attempt to re-request tiles once they
   * expire per their HTTP `cacheControl`/`expires` headers.
   */
  refreshExpiredTiles?: boolean;

  /** If set, the map will be constrained to the given bounds. */
  maxBounds?: LngLatBoundsLike;

  /**
   * The initial bounds of the map. If bounds is specified,
   * it overrides center and zoom constructor options.
   * */
  bounds?: LngLatBoundsLike;

  /** If `true`, the "scroll to zoom" interaction is enabled. */
  scrollZoom?: boolean | Object;

  /** If `true`, the "box zoom" interaction is enabled */
  boxZoom?: boolean;

  /** If `true`, the "drag to rotate" interaction is enabled */
  dragRotate?: boolean;

  /** If `true`, the "drag to pan" interaction is enabled */
  dragPan?: boolean;

  /** If `true`, keyboard shortcuts are enabled */
  keyboard?: boolean;

  /** If `true`, the "double click to zoom" interaction is enabled */
  doubleClickZoom?: boolean;

  /**
   * If `true`, the map will automatically resize
   * when the browser window resizes.
   */
  trackResize?: boolean;

  /**
   * The maximum number of tiles stored in the tile cache for a given
   * source. If omitted, the cache will be dynamically sized based on
   * the current viewport.
   */
  maxTileCacheSize?: number;

  /**
   * If `true`, multiple copies of the world
   * will be rendered, when zoomed out
   */
  renderWorldCopies?: boolean;

  /**
   * If specified, defines a CSS font-family for locally overriding
   * generation of glyphs in the 'CJK Unified Ideographs' and
   * 'Hangul Syllables' ranges. In these ranges, font settings from the
   * map's style will be ignored, except for font-weight keywords
   * (light/regular/medium/bold). The purpose of this option is to avoid
   * bandwidth-intensive glyph server requests.
   * (see https://www.mapbox.com/mapbox-gl-js/example/local-ideographs )
   */
  localIdeographFontFamily?: boolean;

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
  ) => { url: string; headers?: Object; credentials?: string };

  /**
   * If true, Resource Timing API information will be collected for
   * requests made by GeoJSON and Vector Tile web workers (this information
   * is normally inaccessible from the main Javascript thread). Information
   * will be returned in a resourceTiming property of relevant data events.
   */
  collectResourceTiming?: boolean;

  /**
   * Controls the duration of the fade-in/fade-out animation for label
   * collisions, in milliseconds. This setting affects all symbol layers.
   * This setting does not affect the duration of runtime styling transitions
   * or raster tile cross-fading.
   */
  fadeDuration?: number;

  /**
   * If `true`, symbols from multiple sources can collide with each
   * other during collision detection. If `false`, collision detection
   * is run separately for the symbols in each source.
   */
  crossSourceCollisions?: boolean;

  /**
   * A patch to apply to the default localization table for UI strings,
   * e.g. control tooltips. The `locale` object maps namespaced UI string IDs
   * to translated strings in the target language;
   * see `src/ui/default_locale.js` for an example with all supported
   * string IDs. The object may specify all UI strings (thereby adding support
   * for a new translation) or only a subset of strings (thereby patching
   * the default translation table).
   */
  locale?: string;

  /**
   * `onViewportChange` callback is fired when the user interacted with the
   * map. The object passed to the callback contains viewport properties
   * such as `longitude`, `latitude`, `zoom` etc.
   */
  onViewportChange?: (viewport: Viewport) => void;

  /**
   * Map method that will be called after new viewport props are received.
   */
  viewportChangeMethod?: ViewportChangeMethod;

  /**
   * Options common to map movement methods that involve animation,
   * controlling the duration and easing function of the animation.
   * This options will be passed to the `viewportChangeMethod` call.
   * (see https://docs.mapbox.com/mapbox-gl-js/api/#animationoptions)
   */
  viewportChangeOptions?: AnimationOptions;

  /** The onLoad callback for the map */
  onLoad?: Function;

  /** Map cursor style as CSS value */
  cursorStyle?: string;

  /**
   * Sets a Boolean indicating whether the map will render an outline around
   * each tile and the tile ID. These tile boundaries are useful for debugging.
   * */
  showTileBoundaries?: boolean;
};

type State = {
  loaded: boolean;
};

export default class MapGL extends PureComponent<Props, State> {
  constructor(props: Props);

  state: State;

  getMap(): Map;
}
