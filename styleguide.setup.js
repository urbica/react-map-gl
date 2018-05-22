import 'mapbox-gl/dist/mapbox-gl.css';
import MapGL, { Layer, Source, Popup, Marker } from './src/';

global.MapGL = MapGL;
global.Layer = Layer;
global.Source = Source;
global.Popup = Popup;
global.Marker = Marker;
global.MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_ACCESS_TOKEN;
