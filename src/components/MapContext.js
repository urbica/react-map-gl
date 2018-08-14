// @flow

import React from 'react';
import type { Context } from 'react';

const MapContext: Context<?MapboxMap> = React.createContext(null);

export default MapContext;
