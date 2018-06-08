// @flow

import { render } from 'react-dom';
import { PureComponent, createElement } from 'react';
import type { Element } from 'react';

import MapContext from '../MapContext';
import mapboxgl from '../../utils/mapbox-gl';

type Props = {
  /** ReactDOM element to use as a popup */
  element: Element<any>,

  /** The longitude of the center of the popup. */
  longitude: number,

  /** The latitude of the center of the popup. */
  latitude: number,

  /* If true, a close button will appear in the top right corner of the popup. */
  closeButton?: boolean,

  /* If true, the popup will closed when the map is clicked. */
  closeOnClick?: boolean,

  /** The onPopupClose callback is fired when the popup closed */
  onPopupClose?: Function,

  /*
   * A string indicating the part of the Popup that should be positioned closest to the coordinate
   * */
  anchor?:
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right',

  /**
   * The offset in pixels as a `PointLike` object to apply
   * relative to the element's center. Negatives indicate left and up.
   */
  offset: mapboxgl.LngLatLike
};

class Popup extends PureComponent<Props> {
  _map: MapboxMap;
  _popup: mapboxgl.Popup;

  static displayName = 'Popup';

  static defaultProps = {
    closeButton: true,
    closeOnClick: true,
    onPopupClose: null,
    anchor: null,
    offset: null
  };

  componentDidMount() {
    const { element, longitude, latitude, offset, closeButton, closeOnClick, onPopupClose, anchor } = this.props;

    const div = document.createElement('div');
    render(element, div);

    const popup = new mapboxgl.Popup({ offset, closeButton, closeOnClick, anchor });
    popup.setLngLat([longitude, latitude]).addTo(this._map);
    popup.setDOMContent(div);

    if (onPopupClose) {
      popup.on('close', onPopupClose);
    }

    this._popup = popup;
  }

  componentWillReceiveProps(newProps: Props) {
    const positionChanged =
      newProps.latitude !== this.props.latitude || newProps.longitude !== this.props.longitude;

    if (positionChanged) {
      this._popup.setLngLat([newProps.longitude, newProps.latitude]);
    }
  }

  componentWillUnmount() {
    if (!this._map || !this._map.getStyle()) {
      return;
    }

    this._popup.remove();
  }

  // External apps can access popup this way
  getPopup() {
    return this._popup;
  }

  render() {
    return createElement(MapContext.Consumer, {}, map => {
      if (map) {
        this._map = map;
      }
      return null;
    });
  }
}

export default Popup;
