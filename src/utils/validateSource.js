// @flow
import type {
  SourceSpecification,
  RasterSourceSpecification,
  RasterDEMSourceSpecification,
  VectorSourceSpecification,
  GeoJSONSourceSpecification,
  ImageSourceSpecification,
  VideoSourceSpecification
} from 'mapbox-gl/src/style-spec/types';

export default (props: SourceSpecification): SourceSpecification => {
  switch (props.type) {
    case 'vector': {
      const source: VectorSourceSpecification = { type: 'vector', ...props };
      return source;
    }
    case 'raster': {
      const source: RasterSourceSpecification = { type: 'raster', ...props };
      return source;
    }
    case 'raster-dem': {
      const source: RasterDEMSourceSpecification = {
        type: 'raster-dem',
        ...props
      };
      return source;
    }
    case 'geojson': {
      const source: GeoJSONSourceSpecification = { type: 'geojson', ...props };
      return source;
    }
    case 'video': {
      const source: VideoSourceSpecification = { type: 'video', ...props };
      return source;
    }
    case 'image': {
      const source: ImageSourceSpecification = { type: 'image', ...props };
      return source;
    }
    default:
      throw new Error(`Unknown type for '${props.id}' Source`);
  }
};
