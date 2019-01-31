// @flow

import { PureComponent, createElement } from 'react';

import MapContext from '../MapContext';
import mapboxgl from '../../utils/mapbox-gl';

type Props = {
  /* The maximum length of the scale control in pixels. */
  maxWidth: number,

  /* Unit of the distance. */
  unit: 'imperial' | 'metric' | 'nautical',

  /* A string representing the position of the control on the map. */
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
};

/**
 * A `ScaleControl` control displays the ratio of a distance on the map
 * to the corresponding distance on the ground.
 */
class ScaleControl extends PureComponent<Props> {
  _map: MapboxMap;

  _control: MapboxScaleControl;

  static defaultProps = {
    position: 'bottom-right',
    unit: 'metric'
  };

  componentDidMount() {
    const map: MapboxMap = this._map;
    const { maxWidth, unit, position } = this.props;

    const control: MapboxScaleControl = new mapboxgl.ScaleControl({
      maxWidth,
      unit
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

  render() {
    return createElement(MapContext.Consumer, {}, (map) => {
      if (map) {
        this._map = map;
      }
      return null;
    });
  }
}

export default ScaleControl;
