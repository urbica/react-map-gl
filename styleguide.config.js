const path = require('path');
const webpack = require('webpack');

module.exports = {
  title: 'Urbica React Map GL',
  exampleMode: 'expand',
  usageMode: 'expand',
  require: [path.resolve(__dirname, 'styleguide.setup.js')],
  sections: [
    {
      name: 'Introduction',
      content: 'docs/introduction.md'
    },
    {
      name: 'Installation',
      content: 'docs/installation.md'
    },
    {
      name: 'Props',
      components: () => [
        'src/components/MapGL/index.js',
        'src/components/Source/index.js',
        'src/components/Layer/index.js',
        'src/components/Popup/index.js',
        'src/components/Marker/index.js',
        'src/components/Cluster/index.js',
        'src/components/AttributionControl/index.js',
        'src/components/FullscreenControl/index.js',
        'src/components/GeolocateControl/index.js',
        'src/components/NavigationControl/index.js',
        'src/components/ScaleControl/index.js'
      ]
    },
    {
      name: 'Examples',
      sections: [
        {
          name: 'Static Map',
          content: 'docs/static-map.md'
        },
        {
          name: 'Interactive Map',
          content: 'docs/interactive-map.md'
        },
        {
          name: 'Events',
          content: 'docs/events.md'
        },
        {
          name: 'Using with Immutable.js',
          content: 'docs/immutable-map.md'
        },
        {
          name: 'Map Instance',
          content: 'docs/map-instance.md'
        },
        {
          name: 'Popups',
          content: 'docs/popup.md'
        },
        {
          name: 'Markers',
          content: 'docs/marker.md'
        },
        {
          name: 'Marker Clustering',
          content: 'docs/cluster.md'
        },
        {
          name: 'Cluster Instance',
          content: 'docs/cluster-instance.md'
        },
        {
          name: 'onClick',
          content: 'docs/clickable-map.md'
        },
        {
          name: 'onHover',
          content: 'docs/hoverable-map.md'
        },
        {
          name: 'onEnter and onLeave',
          content: 'docs/another-hoverable-map.md'
        },
        {
          name: 'Change Map style',
          content: 'docs/change-map-style.md'
        },
        // {
        //   name: 'Attribution Control',
        //   content: 'docs/attribution-control.md'
        // },
        // {
        //   name: 'Fullscreen Control',
        //   content: 'docs/fullscreen-control.md'
        // },
        // {
        //   name: 'Geolocate Control',
        //   content: 'docs/geolocate-control.md'
        // },
        // {
        //   name: 'Navigation Control',
        //   content: 'docs/navigation-control.md'
        // }
        // {
        //   name: 'Scale Control',
        //   content: 'docs/scale-control.md'
        // },
        {
          name: 'Controls',
          content: 'docs/controls.md'
        }
      ]
    }
  ],
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        }
      ]
    }
  },
  dangerouslyUpdateWebpackConfig: (webpackConfig, env) => {
    if (env === 'production') {
      // remove UglifyJs plugin
      const UglifyJsPluginIndex = 3;
      webpackConfig.plugins.splice(UglifyJsPluginIndex, 1);
    }

    webpackConfig.module.rules.push({
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    });

    const envPlugin = new webpack.EnvironmentPlugin(['MAPBOX_ACCESS_TOKEN']);
    webpackConfig.plugins.push(envPlugin);

    return webpackConfig;
  }
};
