// @flow

import { PureComponent, createElement } from 'react';
import type MapboxMap from 'mapbox-gl/src/ui/map';
import type MapboxGeolocateControl from 'mapbox-gl/src/ui/control/geolocate_control';

import MapContext from '../MapContext';
import mapboxgl from '../../utils/mapbox-gl';

type Props = {
  /* A Geolocation API PositionOptions object. */
  positionOptions: PositionOptions,

  /**
   * A `fitBounds` options object to use when the map is
   * panned and zoomed to the user's location.
   */
  fitBoundsOptions: Object,

  /**
   * If `true` the Geolocate Control becomes a toggle button and when active
   * the map will receive updates to the user's location as it changes.
   */
  trackUserLocation: boolean,

  /**
   * By default a dot will be shown on the map at the user's location.
   * Set to `false` to disable.
   */
  showUserLocation: boolean,

  /* A string representing the position of the control on the map. */
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right',

  /**
   * Fired when the Geolocate Control changes to the background state.
   */
  onTrackUserLocationEnd?: Function,

  /**
   * Fired when the Geolocate Control changes to the active lock state,
   */
  onTrackUserLocationStart?: Function,

  /**
   * Fired on each Geolocation API position update which returned as an error.
   */
  onError?: Function,

  /**
   * Fired on each Geolocation API position update which returned as success.
   */
  onGeolocate?: Function
};

/**
 * A `GeolocateControl` control provides a button that uses the browser's
 * geolocation API to locate the user on the map.
 */
class GeolocateControl extends PureComponent<Props> {
  _map: MapboxMap;

  _control: MapboxGeolocateControl;

  static defaultProps = {
    positionOptions: { enableHighAccuracy: false, timeout: 6000 },
    fitBoundsOptions: { maxZoom: 15 },
    trackUserLocation: false,
    showUserLocation: true
  };

  getControl() {
    return this._control;
  }

  componentDidMount() {
    const map: MapboxMap = this._map;
    const {
      positionOptions,
      fitBoundsOptions,
      trackUserLocation,
      showUserLocation,
      position,
      onTrackUserLocationEnd,
      onTrackUserLocationStart,
      onError,
      onGeolocate
    } = this.props;

    const control: MapboxGeolocateControl = new mapboxgl.GeolocateControl({
      positionOptions,
      fitBoundsOptions,
      trackUserLocation,
      showUserLocation
    });

    if (onTrackUserLocationEnd) {
      control.on('trackuserlocationend', onTrackUserLocationEnd);
    }

    if (onTrackUserLocationStart) {
      control.on('trackuserlocationstart', onTrackUserLocationStart);
    }

    if (onError) {
      control.on('error', onError);
    }

    if (onGeolocate) {
      control.on('geolocate', onGeolocate);
    }

    map.addControl(control, position);
    this._control = control;
  }

  componentWillUnmount() {
    if (!this._map) {
      return;
    }

    this._map.removeControl(this._control);
  }

  render() {
    return createElement(MapContext.Consumer, {}, (map) => {
      if (map) {
        this._map = map;
      }
      return null;
    });
  }
}

export default GeolocateControl;
