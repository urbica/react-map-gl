// @flow
import type { Props } from '../components/Source';

export default (props: Props) => {
  switch (props.type) {
    case 'vector':
      return { type: 'vector', ...props };
    case 'raster':
      return { type: 'raster', ...props };
    case 'raster-dem':
      return { type: 'raster-dem', ...props };
    case 'geojson':
      return { type: 'geojson', ...props };
    case 'video':
      return { type: 'video', ...props };
    case 'image':
      return { type: 'image', ...props };
    default:
      throw new Error(`Unknown type for '${props.id}' Source`);
  }
};
