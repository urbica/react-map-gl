// @flow

import { PureComponent, createElement } from 'react';
import type MapboxMap from 'mapbox-gl/src/ui/map';
import type MapboxAttributionControl from 'mapbox-gl/src/ui/control/attribution_control';

import MapContext from '../MapContext';
import mapboxgl from '../../utils/mapbox-gl';

type Props = {
  /**
   * If `true` force a compact attribution that shows the full
   * attribution on mouse hover, or if  false force the full attribution
   * control. The default is a responsive attribution that collapses when
   * the map is less than 640 pixels wide.
   */
  compact: boolean,

  /* String or strings to show in addition to any other attributions. */
  customAttribution: string | Array<string>,

  /* A string representing the position of the control on the map. */
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
};

/**
 * An `AttributionControl` control presents the map's attribution information.
 */
class AttributionControl extends PureComponent<Props> {
  _map: MapboxMap;

  _control: MapboxAttributionControl;

  static defaultProps = {
    position: 'bottom-right'
  };

  componentDidMount() {
    const map: MapboxMap = this._map;
    const { compact, customAttribution, position } = this.props;

    const control: MapboxAttributionControl = new mapboxgl.AttributionControl({
      compact,
      customAttribution
    });

    map.addControl(control, position);
    this._control = control;
  }

  componentWillUnmount() {
    if (!this._map) {
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

export default AttributionControl;
