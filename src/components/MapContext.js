// @flow

import createReactContext, { type Context } from 'create-react-context';
import type { MapboxMap } from '../types';

const MapContext: Context<?MapboxMap> = createReactContext(null);

export default MapContext;
