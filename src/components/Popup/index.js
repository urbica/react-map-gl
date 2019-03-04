// @flow

import { createPortal } from 'react-dom';
import { PureComponent, createElement } from 'react';
import type MapboxMap from 'mapbox-gl/src/ui/map';
import type MapboxPopup from 'mapbox-gl/src/ui/popup';
import type MapboxLngLatBoundsLike from 'mapbox-gl/src/geo/lng_lat_bounds';

import MapContext from '../MapContext';
import mapboxgl from '../../utils/mapbox-gl';

type Props = {
  /** Popup content. */
  children: React$Node,

  /** The longitude of the center of the popup. */
  longitude: number,

  /** The latitude of the center of the popup. */
  latitude: number,

  /*
   * If true, a close button will appear
   * in the top right corner of the popup.
   */
  closeButton?: boolean,

  /** If true, the popup will closed when the map is clicked. */
  closeOnClick?: boolean,

  /** The onClose callback is fired when the popup closed. */
  onClose?: Function,

  /*
   * A string indicating the part of the Popup
   * that should be positioned closest to the coordinate.
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
  offset?: MapboxLngLatBoundsLike
};

class Popup extends PureComponent<Props> {
  _map: MapboxMap;

  _el: HTMLDivElement;

  _popup: MapboxPopup;

  static displayName = 'Popup';

  static defaultProps = {
    closeButton: true,
    closeOnClick: true,
    onClose: null,
    anchor: null,
    offset: null
  };

  constructor(props: Props) {
    super(props);
    this._el = document.createElement('div');
  }

  componentDidMount() {
    const {
      longitude,
      latitude,
      offset,
      closeButton,
      closeOnClick,
      onClose,
      anchor
    } = this.props;

    const popup: MapboxPopup = new mapboxgl.Popup({
      offset,
      closeButton,
      closeOnClick,
      anchor
    });

    popup.setDOMContent(this._el);
    popup.setLngLat([longitude, latitude]).addTo(this._map);

    if (onClose) {
      popup.on('close', onClose);
    }

    this._popup = popup;
  }

  componentDidUpdate(prevProps: Props) {
    const positionChanged =
      prevProps.latitude !== this.props.latitude ||
      prevProps.longitude !== this.props.longitude;

    if (positionChanged) {
      this._popup.setLngLat([this.props.longitude, this.props.latitude]);
    }
  }

  componentWillUnmount() {
    if (!this._map || !this._map.getStyle()) {
      return;
    }

    this._popup.remove();
  }

  getPopup() {
    return this._popup;
  }

  render() {
    return createElement(MapContext.Consumer, {}, (map) => {
      if (map) {
        this._map = map;
      }

      return createPortal(this.props.children, this._el);
    });
  }
}

export default Popup;
