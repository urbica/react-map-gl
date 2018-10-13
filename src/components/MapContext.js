// @flow

import React from 'react';
import createReactContext, { type Context } from 'create-react-context';

const reactVersion = parseInt(React.version, 10);
const MapContext: Context<?MapboxMap> =
  reactVersion < 16 ? createReactContext(null) : React.createContext(null);

export default MapContext;
