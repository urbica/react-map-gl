/* global mapboxgl */

import Immutable from 'immutable';
import PropTypes from 'prop-types';
import { PureComponent, createElement } from 'react';

import diffStyles from './utils/diff-styles';
import getInteractiveLayerIds from './utils/style-utils';

function noop() {}

const propTypes = {
  /** Map container className */
  className: PropTypes.string,
  /** Map container style */
  style: PropTypes.object.isRequired,

  /** Mapbox API access token for mapbox-gl-js. Required when using Mapbox vector tiles/styles. */
  accessToken: PropTypes.string,
  /** Mapbox WebGL context creation option. Useful when you want to export the canvas as a PNG. */
  preserveDrawingBuffer: PropTypes.bool,
  /** Show attribution control or not. */
  attributionControl: PropTypes.bool,

  /** The Mapbox style. A string url or a MapboxGL style Immutable.Map object. */
  mapStyle: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Immutable.Map)
  ]),
  /** There are known issues with style diffing. As stopgap, add option to prevent style diffing. */
  preventStyleDiffing: PropTypes.bool,
  /**
   * `onViewportChange` callback is fired when the user interacted with the
   * map. The object passed to the callback contains viewport properties
   * such as `longitude`, `latitude`, `zoom` etc.
   */
  onViewportChange: PropTypes.func,

  /** The longitude of the center of the map. */
  longitude: PropTypes.number.isRequired,
  /** The latitude of the center of the map. */
  latitude: PropTypes.number.isRequired,
  /** The tile zoom level of the map. */
  zoom: PropTypes.number.isRequired,
  /** Specify the bearing of the viewport */
  bearing: PropTypes.number,
  /** Specify the pitch of the viewport */
  pitch: PropTypes.number,
  /** The onLoad callback for the map */
  onLoad: PropTypes.func
};

const defaultProps = {
  className: null,
  mapStyle: 'mapbox://styles/mapbox/light-v8',
  accessToken: null,
  preserveDrawingBuffer: false,
  onViewportChange: null,
  attributionControl: true,
  preventStyleDiffing: false,
  visible: true,
  bearing: 0,
  pitch: 0,
  onLoad: noop
};

class MapGL extends PureComponent {
  static supported() {
    return mapboxgl && mapboxgl.supported();
  }

  constructor(props) {
    super(props);
    this._queryParams = {};

    if (mapboxgl) {
      mapboxgl.accessToken = props.accessToken;
    }

    if (!MapGL.supported()) {
      this.componentDidMount = noop;
      this.componentWillReceiveProps = noop;
      this.componentDidUpdate = noop;
    }

    this._onViewportChange = this._onViewportChange.bind(this);
  }

  componentDidMount() {
    if (!mapboxgl) {
      return;
    }

    const mapStyle = Immutable.Map.isMap(this.props.mapStyle)
      ? this.props.mapStyle.toJS()
      : this.props.mapStyle;

    const map = new mapboxgl.Map({
      container: this.container,
      style: mapStyle,
      center: [this.props.longitude, this.props.latitude],
      zoom: this.props.zoom,
      pitch: this.props.pitch,
      bearing: this.props.bearing,
      interactive: !!this.props.onViewportChange,
      attributionControl: this.props.attributionControl,
      preserveDrawingBuffer: this.props.preserveDrawingBuffer
    });

    // Disable outline style
    const canvas = map.getCanvas();
    if (canvas) {
      canvas.style.outline = 'none';
    }

    // Attach optional onLoad function
    map.once('load', this.props.onLoad);

    map.on('drag', this._onViewportChange);
    map.on('zoom', this._onViewportChange);

    this._map = map;
    this._updateMapViewport({}, this.props);
    this._updateQueryParams(mapStyle);
  }

  componentWillReceiveProps(newProps) {
    if (!mapboxgl) {
      return;
    }
    this._updateMapViewport(this.props, newProps);
    this._updateMapStyle(this.props, newProps);
  }

  componentWillUnmount() {
    if (!mapboxgl) {
      return;
    }

    if (this._map) {
      this._map.remove();
    }
  }

  // External apps can access map this way
  getMap() {
    return this._map;
  }

  /** Uses Mapbox's
    * queryRenderedFeatures API to find features at point or in a bounding box.
    * https://www.mapbox.com/mapbox-gl-js/api/#Map#queryRenderedFeatures
    * To query only some of the layers, set the `interactive` property in the
    * layer style to `true`.
    * @param {[Number, Number]|[[Number, Number], [Number, Number]]} geometry -
    *   Point or an array of two points defining the bounding box
    * @param {Object} parameters - query options
    */
  queryRenderedFeatures(geometry, parameters) {
    const queryParams = parameters || this._queryParams;
    if (queryParams.layers && queryParams.layers.length === 0) {
      return [];
    }
    return this._map.queryRenderedFeatures(geometry, queryParams);
  }

  // Hover and click only query layers whose interactive property is true
  _updateQueryParams(mapStyle) {
    const interactiveLayerIds = getInteractiveLayerIds(mapStyle);
    this._queryParams = { layers: interactiveLayerIds };
  }

  // Update a source in the map style
  _updateSource(update) {
    const map = this._map;
    const newSource = update.source.toJS();
    if (newSource.type === 'geojson') {
      const oldSource = map.getSource(update.id);
      if (oldSource.type === 'geojson') {
        // update data if no other GeoJSONSource options were changed
        const oldOpts = oldSource.workerOptions;
        if (
          (newSource.maxzoom === undefined ||
            newSource.maxzoom === oldOpts.geojsonVtOptions.maxZoom) &&
          (newSource.buffer === undefined ||
            newSource.buffer === oldOpts.geojsonVtOptions.buffer) &&
          (newSource.tolerance === undefined ||
            newSource.tolerance === oldOpts.geojsonVtOptions.tolerance) &&
          (newSource.cluster === undefined ||
            newSource.cluster === oldOpts.cluster) &&
          (newSource.clusterRadius === undefined ||
            newSource.clusterRadius === oldOpts.superclusterOptions.radius) &&
          (newSource.clusterMaxZoom === undefined ||
            newSource.clusterMaxZoom === oldOpts.superclusterOptions.maxZoom)
        ) {
          oldSource.setData(newSource.data);
          return;
        }
      }
    }

    map.removeSource(update.id);
    map.addSource(update.id, newSource);
  }

  // Individually update the maps source and layers that have changed if all
  // other style props haven't changed. This prevents flicking of the map when
  // styles only change sources or layers.
  /* eslint-disable max-statements, complexity */
  _setDiffStyle(prevStyle, nextStyle) {
    function styleKeysMap(style) {
      return style.map(() => true).delete('layers').delete('sources').toJS();
    }

    const prevKeysMap = prevStyle && (styleKeysMap(prevStyle) || {});
    const nextKeysMap = styleKeysMap(nextStyle);
    function propsOtherThanLayersOrSourcesDiffer() {
      const prevKeysList = Object.keys(prevKeysMap);
      const nextKeysList = Object.keys(nextKeysMap);
      if (prevKeysList.length !== nextKeysList.length) {
        return true;
      }
      // `nextStyle` and `prevStyle` should not have the same set of props.
      if (
        nextKeysList.some(
          key => prevStyle.get(key) !== nextStyle.get(key)
          // But the value of one of those props is different.
        )
      ) {
        return true;
      }
      return false;
    }

    const map = this._map;

    if (!prevStyle || propsOtherThanLayersOrSourcesDiffer()) {
      map.setStyle(nextStyle.toJS());
      return;
    }

    const { sourcesDiff, layersDiff } = diffStyles(prevStyle, nextStyle);

    // TODO: It's rather difficult to determine style diffing in the presence
    // of refs. For now, if any style update has a ref, fallback to no diffing.
    // We can come back to this case if there's a solid usecase.
    if (layersDiff.updates.some(node => node.layer.get('ref'))) {
      map.setStyle(nextStyle.toJS());
      return;
    }

    sourcesDiff.enter.forEach(enter =>
      map.addSource(enter.id, enter.source.toJS())
    );

    sourcesDiff.update.forEach(update => this._updateSource(update));

    sourcesDiff.exit.forEach(exit => map.removeSource(exit.id));

    layersDiff.exiting.forEach((exit) => {
      if (map.style.getLayer(exit.id)) {
        map.removeLayer(exit.id);
      }
    });

    layersDiff.updates.forEach((update) => {
      if (!update.enter) {
        // This is an old layer that needs to be updated. Remove the old layer
        // with the same id and add it back again.
        map.removeLayer(update.id);
      }
      map.addLayer(update.layer.toJS(), update.before);
    });
  }

  _updateMapStyle(oldProps, newProps) {
    const mapStyle = newProps.mapStyle;
    const oldMapStyle = oldProps.mapStyle;
    if (mapStyle !== oldMapStyle) {
      if (Immutable.Map.isMap(mapStyle)) {
        if (this.props.preventStyleDiffing) {
          this._map.setStyle(mapStyle.toJS());
        } else {
          this._setDiffStyle(oldMapStyle, mapStyle);
        }
      } else {
        this._map.setStyle(mapStyle);
      }
      this._updateQueryParams(mapStyle);
    }
  }

  _updateMapViewport(oldProps, newProps) {
    const map = this._map;
    const center = map.getCenter();

    const viewportChanged =
      newProps.latitude !== center.lat ||
      newProps.longitude !== center.lng ||
      newProps.zoom !== map.getZoom() ||
      newProps.pitch !== map.getPitch() ||
      newProps.bearing !== map.getBearing();

    if (viewportChanged) {
      map.flyTo({
        center: [newProps.longitude, newProps.latitude],
        zoom: newProps.zoom,
        pitch: newProps.pitch,
        bearing: newProps.bearing
      });
    }
  }

  _onViewportChange(event) {
    const map = event.target;
    const { lng, lat } = map.getCenter();
    const zoom = map.getZoom();
    const pitch = map.getPitch();
    const bearing = map.getBearing();

    const viewport = {
      latitude: lat,
      longitude: lng,
      zoom,
      pitch,
      bearing
    };

    this.props.onViewportChange(viewport);
  }

  render() {
    const { className, style } = this.props;

    return createElement('div', {
      ref: ref => (this.container = ref),
      style,
      className
    });
  }
}

MapGL.displayName = 'MapGL';
MapGL.propTypes = propTypes;
MapGL.defaultProps = defaultProps;

export default MapGL;
