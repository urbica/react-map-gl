// @flow

import { createContext } from 'react';
import type { Context } from 'react';
import type MapboxMap from 'mapbox-gl/src/ui/map';

const MapContext: Context<?MapboxMap> = createContext(null);

export default MapContext;
