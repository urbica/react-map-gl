// @flow

import createReactContext, { type Context } from 'create-react-context';

const MapContext: Context<?MapboxMap> = createReactContext(null);

export default MapContext;
