// @flow
import { PureComponent, createElement } from 'react';
import type MapboxMap from 'mapbox-gl/src/ui/map';
import type MapboxTrafficControl from '@mapbox/mapbox-gl-traffic';

import MapboxTraffic from '@mapbox/mapbox-gl-traffic';
import MapContext from '../MapContext';

type Props = {
  /** Show or hide traffic overlay by default. */
  showTraffic?: Boolean,

  /** Show a toggle button to turn traffic on and off. */
  showTrafficButton?: Boolean,

  /**
   * The traffic source regex used to determine whether a layer displays
   * traffic or not
   * */
  trafficSource?: RegExp
};

/** Add a traffic toggle control. */
class TrafficControl extends PureComponent<Props> {
  _map: MapboxMap;

  _control: MapboxTrafficControl;

  static defaultProps = {
    showTraffic: false,
    showTrafficButton: true,
    trafficSource: /mapbox-traffic-v\d/
  };

  componentDidMount() {
    const map: MapboxMap = this._map;

    const { showTraffic, showTrafficButton, trafficSource } = this.props;

    const control = new MapboxTraffic({
      showTraffic,
      showTrafficButton,
      trafficSource
    });

    map.addControl(control);
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

export default TrafficControl;
