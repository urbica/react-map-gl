/* eslint-disable react/prop-types */

import React, { Component } from 'react';
import Immutable from 'immutable';
import MapGL from '../src';

const accessToken = process.env.STORYBOOK_MAPBOX_ACCESS_TOKEN;

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapStyle: null,
      viewport: {
        latitude: 37.757,
        longitude: -122.427,
        zoom: 11
      }
    };

    this.onViewportChange = this.onViewportChange.bind(this);
  }

  componentDidMount() {
    const styleUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v9?access_token=${accessToken}`;
    fetch(styleUrl)
      .then(r => r.json())
      .then(mapStyle =>
        this.setState({ mapStyle: Immutable.fromJS(mapStyle) })
      );
  }

  onViewportChange(viewport) {
    this.setState({ viewport });
  }

  render() {
    const { mapStyle, viewport } = this.state;

    if (!mapStyle) {
      return <div>Loading</div>;
    }

    return (
      <MapGL
        style={this.props.style}
        mapStyle={mapStyle}
        accessToken={accessToken}
        onViewportChange={this.onViewportChange}
        {...viewport}
      />
    );
  }
}

export default Map;
