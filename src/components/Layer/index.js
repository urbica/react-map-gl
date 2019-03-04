// @flow

import { PureComponent, createElement } from 'react';
import type MapboxMap from 'mapbox-gl/src/ui/map';
import type { LayerSpecification } from 'mapbox-gl/src/style-spec/types';
import type { MapMouseEvent, MapTouchEvent } from 'mapbox-gl/src/ui/events';

import MapContext from '../MapContext';
import diff from '../../utils/diff';
import queryRenderedFeatures from '../../utils/queryRenderedFeatures';

const eventListeners = [
  ['onClick', 'click'],
  ['onHover', 'mousemove'],
  ['onEnter', 'mouseenter'],
  ['onLeave', 'mouseleave']
];

type Props = {|
  /** Mapbox GL Layer id */
  id: string,

  /** The id of an existing layer to insert the new layer before. */
  before?: string,

  /**
   * Called when the layer is clicked.
   * @callback
   * @param {Object} event - The mouse event.
   * @param {[Number, Number]} event.lngLat - The coordinates of the pointer
   * @param {Array} event.features - The features under the pointer,
   * using Mapbox's queryRenderedFeatures API:
   * https://www.mapbox.com/mapbox-gl-js/api/#Map#queryRenderedFeatures
   */
  onClick?: (event: { features?: [], ...MapMouseEvent }) => any,

  /**
   * Called when the layer is hovered over.
   * @callback
   * @param {Object} event - The mouse event.
   * @param {[Number, Number]} event.lngLat - The coordinates of the pointer
   * @param {Array} event.features - The features under the pointer,
   * using Mapbox's queryRenderedFeatures API:
   * https://www.mapbox.com/mapbox-gl-js/api/#Map#queryRenderedFeatures
   */
  onHover?: (event: { features?: [], ...MapMouseEvent }) => any,

  /**
   * Called when the layer feature is entered.
   * @callback
   * @param {Object} event - The mouse event.
   * @param {[Number, Number]} event.lngLat - The coordinates of the pointer
   * @param {Array} event.features - The features under the pointer,
   * using Mapbox's queryRenderedFeatures API:
   * https://www.mapbox.com/mapbox-gl-js/api/#Map#queryRenderedFeatures
   */
  onEnter?: (event: { features?: [], ...MapMouseEvent }) => any,

  /**
   * Called when the layer feature is leaved.
   * @callback
   * @param {Object} event - The mouse event.
   * @param {[Number, Number]} event.lngLat - The coordinates of the pointer
   * @param {Array} event.features - The features under the pointer,
   * using Mapbox's queryRenderedFeatures API:
   * https://www.mapbox.com/mapbox-gl-js/api/#Map#queryRenderedFeatures
   */
  onLeave?: (event: { features?: [], ...MapMouseEvent }) => any,

  /**
   * Radius to detect features around a clicked/hovered point
   */
  radius: number,

  ...LayerSpecification
|};

class Layer extends PureComponent<Props> {
  $key: string;

  $value: any;

  _id: string;

  _map: MapboxMap;

  _onClick: (event: MapMouseEvent | MapTouchEvent) => void;

  _onHover: (event: MapMouseEvent) => void;

  _onEnter: (event: MapMouseEvent) => void;

  _onLeave: (event: MapMouseEvent) => void;

  static displayName = 'Layer';

  static defaultProps = {
    radius: 0
  };

  constructor(props: Props) {
    super(props);
    this._id = props.id;
  }

  componentDidMount() {
    const map = this._map;
    const {
      before,
      radius,
      onClick,
      onHover,
      onEnter,
      onLeave,
      ...layer
    } = this.props;

    if (before && map.getLayer(before)) {
      map.addLayer(layer, before);
    } else {
      map.addLayer(layer);
    }

    if (onClick) {
      map.on('click', this._id, this._onClick);
    }

    if (onHover) {
      map.on('mousemove', this._id, this._onHover);
    }

    if (onEnter) {
      map.on('mouseenter', this._id, this._onEnter);
    }

    if (onLeave) {
      map.on('mouseleave', this._id, this._onLeave);
    }
  }

  componentDidUpdate(prevProps: Props) {
    const map = this._map;
    const { before, onClick, ...layer } = this.props;

    if (before !== prevProps.before) {
      map.moveLayer(layer.id, before);
    }

    if (layer.paint !== prevProps.paint) {
      diff(layer.paint, prevProps.paint).forEach(([key, value]) => {
        map.setPaintProperty(this._id, key, value);
      });
    }

    if (layer.layout !== prevProps.layout) {
      diff(layer.layout, prevProps.layout).forEach(([key, value]) => {
        map.setLayoutProperty(this._id, key, value);
      });
    }

    // $FlowFixMe
    if (layer.filter !== prevProps.filter) {
      if (!layer.filter) {
        map.setFilter(this._id, undefined);
      } else {
        map.setFilter(this._id, layer.filter);
      }
    }

    eventListeners.forEach(([propName, eventName]) => {
      const handlerName = `_${propName}`;

      if (!this.props[propName] && prevProps[propName]) {
        map.off(eventName, this._id, this[handlerName]);
      }

      if (this.props[propName] && !prevProps[propName]) {
        map.on(eventName, this._id, this[handlerName]);
      }
    });
  }

  componentWillUnmount() {
    if (!this._map || !this._map.getStyle() || !this._map.getLayer(this._id)) {
      return;
    }

    eventListeners.forEach(([propName, eventName]) => {
      const handlerName = `_${propName}`;
      if (this.props[propName]) {
        this._map.off(eventName, this._id, this[handlerName]);
      }
    });
  }

  _onClick = (event: MapMouseEvent): void => {
    const position = [event.point.x, event.point.y];
    const features = queryRenderedFeatures(
      this._map,
      this._id,
      position,
      this.props.radius
    );

    // $FlowFixMe
    this.props.onClick({ ...event, features });
  };

  _onHover = (event: MapMouseEvent): void => {
    const position = [event.point.x, event.point.y];
    const features = queryRenderedFeatures(
      this._map,
      this._id,
      position,
      this.props.radius
    );

    // $FlowFixMe
    this.props.onHover({ ...event, features });
  };

  _onEnter = (event: MapMouseEvent): void => {
    const position = [event.point.x, event.point.y];
    const features = queryRenderedFeatures(
      this._map,
      this._id,
      position,
      this.props.radius
    );

    // $FlowFixMe
    this.props.onEnter({ ...event, features });
  };

  _onLeave = (event: MapMouseEvent) => {
    const position: [number, number] = [event.point.x, event.point.y];
    const features = queryRenderedFeatures(
      this._map,
      this._id,
      position,
      this.props.radius
    );

    // $FlowFixMe
    this.props.onLeave({ ...event, features });
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

export default Layer;
