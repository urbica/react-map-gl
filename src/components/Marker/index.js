// @flow

import { render, unmountComponentAtNode } from 'react-dom';
import { PureComponent, createElement } from 'react';
import type { Element } from 'react';
import type { PointLike } from '@mapbox/point-geometry';

import MapContext from '../MapContext';
import mapboxgl from '../../utils/mapbox-gl';

type Props = {
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
  offset?: PointLike,

  /**
   * Boolean indicating whether or not a marker is able to be dragged
   * to a new position on the map.
   */
  draggable?: boolean,

  /** Fired when the marker is finished being dragged */
  onDragEnd?: (lngLat: LngLat) => any
};

class Marker extends PureComponent<Props> {
  _map: MapboxMap;

  _container: HTMLDivElement;

  _marker: MapboxMarker;

  _onDragEnd: () => void;

  static displayName = 'Marker';

  static defaultProps = {
    offset: null,
    draggable: false
  };

  componentDidMount() {
    const { element, longitude, latitude, offset, draggable, onDragEnd } = this.props;

    this._container = document.createElement('div');
    render(element, this._container);

    const marker: MapboxMarker = new mapboxgl.Marker(this._container, { draggable, offset });
    marker.setLngLat([longitude, latitude]).addTo(this._map);

    if (onDragEnd) {
      marker.on('dragend', this._onDragEnd);
    }

    this._marker = marker;
  }

  componentDidUpdate(prevProps: Props) {
    const positionChanged =
      prevProps.latitude !== this.props.latitude || prevProps.longitude !== this.props.longitude;

    if (positionChanged) {
      this._marker.setLngLat([this.props.longitude, this.props.latitude]);
      render(this.props.element, this._container);
    }
  }

  componentWillUnmount() {
    if (!this._map || !this._map.getStyle()) {
      return;
    }

    this._marker.remove();
    unmountComponentAtNode(this._container);
  }

  // External apps can access marker this way
  getMarker() {
    return this._marker;
  }

  _onDragEnd = (): void => {
    // $FlowFixMe
    this.props.onDragEnd(this._marker.getLngLat());
  };

  render() {
    return createElement(MapContext.Consumer, {}, (map) => {
      if (map) {
        this._map = map;
      }
      return null;
    });
  }
}

export default Marker;
