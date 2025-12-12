/* eslint-disable import/prefer-default-export */
// Mock for @deck.gl/mapbox
export class MapboxLayer {
  constructor(props) {
    this.id = props.id;
    this.type = props.type;
    this.props = props;
  }
}
