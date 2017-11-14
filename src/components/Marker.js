// @flow

import mapboxgl from 'mapbox-gl';
import ReactDOM from 'react-dom';
import { PureComponent } from 'react';
import type { Element } from 'react';

type Props = {
  /** Mapbox GL JS map instance */
  map: mapboxgl.Map,

  /** ReactDOM element to use as a marker */
  element: Element<any>,

  /** The longitude of the center of the marker. */
  longitude: number,

  /** The latitude of the center of the marker. */
  latitude: number,

  /**
   * The offset in pixels as a `PointLike` object to apply
   * relative to the element's center. Negatives indicate left and up.
   */
  offset: mapboxgl.PointLike
};

class Marker extends PureComponent<Props> {
  _marker: mapboxgl.Marker;

  static defaultProps = {
    offset: null
  };

  componentDidMount() {
    const {
      map, element, longitude, latitude, offset
    } = this.props;

    const div = document.createElement('div');
    ReactDOM.render(element, div);

    const marker = new mapboxgl.Marker(div, { offset });
    marker.setLngLat([longitude, latitude]).addTo(map);
    this._marker = marker;
  }

  componentWillReceiveProps(newProps: Props) {
    const positionChanged =
      newProps.latitude !== this.props.latitude ||
      newProps.longitude !== this.props.longitude;

    if (positionChanged) {
      this._marker.setLngLat([newProps.longitude, newProps.latitude]);
    }
  }

  componentWillUnmount() {
    const { map } = this.props;
    if (!map || !map.getStyle()) {
      return;
    }
    this._marker.remove();
  }

  // External apps can access marker this way
  getMarker() {
    return this._marker;
  }

  render() {
    return null;
  }
}

export default Marker;
