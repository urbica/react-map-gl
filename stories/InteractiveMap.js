/* eslint-disable react/prop-types */

import React, { Component } from 'react';
import MapGL from '../src';

const accessToken = process.env.STORYBOOK_MAPBOX_ACCESS_TOKEN;

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 37.757,
        longitude: -122.427,
        zoom: 11
      }
    };

    this.onViewportChange = this.onViewportChange.bind(this);
  }

  onViewportChange(viewport) {
    this.setState({ viewport });
    this.props.onViewportChange(viewport);
  }

  render() {
    const { viewport } = this.state;

    return (
      <MapGL
        style={this.props.style}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        accessToken={accessToken}
        onViewportChange={this.onViewportChange}
        {...viewport}
      />
    );
  }
}

export default Map;
