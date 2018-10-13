// @flow
import React from 'react';
import type { Context } from 'react';
import createReactContext, { type Context as ContextPolyfill } from 'create-react-context';

const reactVersion = parseInt(React.version, 10);

const MapContext: Context<?MapboxMap> = React.createContext && React.createContext(null);
const MapContextPolyfill: ContextPolyfill<?MapboxMap> = createReactContext(null);

export default (reactVersion < 16 ? MapContextPolyfill : MapContext);
