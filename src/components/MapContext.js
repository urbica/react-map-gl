// @flow

import createReactContext, { type Context } from 'create-react-context';
import mapboxgl from '../utils/mapbox-gl';

const MapContext: Context<mapboxgl.Map> = createReactContext(null);

export default MapContext;
