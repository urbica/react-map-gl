// @flow

import { PureComponent, createElement } from 'react';
import type MapboxMap from 'mapbox-gl/src/ui/map';
import type MapboxFullscreenControl from 'mapbox-gl/src/ui/control/fullscreen_control';

import MapContext from '../MapContext';
import mapboxgl from '../../utils/mapbox-gl';

type Props = {
  /**
   * container is the compatible DOM element which should be
   * made full screen. By default, the map container element
   * will be made full screen.
   */
  container: string,

  /* A string representing the position of the control on the map. */
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
};

/**
 * A `FullscreenControl` control contains a button for toggling the map in
 * and out of fullscreen mode.
 */
class FullscreenControl extends PureComponent<Props> {
  _map: MapboxMap;

  _control: MapboxFullscreenControl;

  static defaultProps = {
    position: 'top-right'
  };

  componentDidMount() {
    const map: MapboxMap = this._map;
    const { container, position } = this.props;

    const control: MapboxFullscreenControl = new mapboxgl.FullscreenControl({
      container
    });

    map.addControl(control, position);
    this._control = control;
  }

  componentWillUnmount() {
    if (!this._map || !this._map.getStyle()) {
      return;
    }

    this._map.removeControl(this._control);
  }

  getControl() {
    return this._control;
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

export default FullscreenControl;
