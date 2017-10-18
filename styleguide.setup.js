import 'mapbox-gl/dist/mapbox-gl.css';
import MapGL, { Layer, Source } from './src/';

global.MapGL = MapGL;
global.Layer = Layer;
global.Source = Source;
global.MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_ACCESS_TOKEN;
