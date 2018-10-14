// @flow
import createContext, { type Context } from '../utils/context';

const MapContext: Context<?MapboxMap> = createContext(null);

export default MapContext;
