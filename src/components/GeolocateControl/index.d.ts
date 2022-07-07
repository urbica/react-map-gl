import { PureComponent } from "react";
import type { GeolocateControl as MapboxGeolocateControl } from "mapbox-gl";

type Props = {
  /* A Geolocation API PositionOptions object. */
  positionOptions?: PositionOptions;

  /**
   * A `fitBounds` options object to use when the map is
   * panned and zoomed to the user's location.
   */
  fitBoundsOptions?: Object;

  /**
   * If `true` the Geolocate Control becomes a toggle button and when active
   * the map will receive updates to the user's location as it changes.
   */
  trackUserLocation?: boolean;

  /**
   * By default a dot will be shown on the map at the user's location.
   * Set to `false` to disable.
   */
  showUserLocation?: boolean;

  /* A string representing the position of the control on the map. */
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";

  /**
   * Fired when the Geolocate Control changes to the background state.
   */
  onTrackUserLocationEnd?: Function;

  /**
   * Fired when the Geolocate Control changes to the active lock state,
   */
  onTrackUserLocationStart?: Function;

  /**
   * Fired on each Geolocation API position update which returned as an error.
   */
  onError?: Function;

  /**
   * Fired on each Geolocation API position update which returned as success.
   */
  onGeolocate?: Function;
};

export default class GeolocateControl extends PureComponent<Props> {
  getControl(): MapboxGeolocateControl;
}
