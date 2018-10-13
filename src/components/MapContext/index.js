import React from 'react';
import MapContext from './MapContext';
import MapContextPolyfill from './MapContextPolyfill';

const reactVersion = parseInt(React.version, 10);

export default (reactVersion < 16 ? MapContextPolyfill : MapContext);
