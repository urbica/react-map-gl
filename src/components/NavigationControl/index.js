// @flow

import { PureComponent, createElement } from 'react';
import type MapboxMap from 'mapbox-gl/src/ui/map';
import type MapboxNavigationControl from 'mapbox-gl/src/ui/control/navigation_control';

import MapContext from '../MapContext';
import mapboxgl from '../../utils/mapbox-gl';

type Props = {
  /** If true the compass button is included. */
  showCompass: boolean,

  /** If true the zoom-in and zoom-out buttons are included. */
  showZoom: boolean,

  /**
   * If true the pitch is visualized by rotating X-axis of compass
   * and pitch will reset by clicking on the compass.
   */
  visualizePitch: boolean,

  /** A string representing the position of the control on the map. */
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
};

/**
 * A `NavigationControl` control contains zoom buttons and a compass.
 */
class NavigationControl extends PureComponent<Props> {
  _map: MapboxMap;

  _control: MapboxNavigationControl;

  static defaultProps = {
    showCompass: true,
    showZoom: true,
    visualizePitch: false,
    position: 'top-right'
  };

  componentDidMount() {
    const map: MapboxMap = this._map;
    const { showCompass, showZoom, visualizePitch, position } = this.props;

    const control: MapboxNavigationControl = new mapboxgl.NavigationControl({
      showCompass,
      showZoom,
      visualizePitch
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

export default NavigationControl;
