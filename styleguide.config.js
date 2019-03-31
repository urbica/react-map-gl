const path = require('path');
const webpack = require('webpack');

module.exports = {
  title: 'Urbica React Map GL',
  usageMode: 'expand',
  exampleMode: 'expand',
  pagePerSection: true,
  require: [path.resolve(__dirname, 'styleguide.setup.js')],
  moduleAliases: {
    '@urbica/react-map-gl': path.resolve(__dirname, 'src')
  },
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
      name: 'Components',
      sectionDepth: 1,
      components: [
        'src/components/MapGL/index.js',
        'src/components/Source/index.js',
        'src/components/Layer/index.js',
        'src/components/CustomLayer/index.js',
        'src/components/Popup/index.js',
        'src/components/Marker/index.js',
        'src/components/FeatureState/index.js'
      ]
    },
    {
      name: 'Controls',
      sectionDepth: 1,
      components: [
        'src/components/AttributionControl/index.js',
        'src/components/FullscreenControl/index.js',
        'src/components/GeolocateControl/index.js',
        'src/components/NavigationControl/index.js',
        'src/components/ScaleControl/index.js',
        'src/components/LanguageControl/index.js'
      ]
    }
  ],
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        }
      ]
    }
  },
  dangerouslyUpdateWebpackConfig: (webpackConfig) => {
    const envPlugin = new webpack.EnvironmentPlugin(['MAPBOX_ACCESS_TOKEN']);
    webpackConfig.plugins.push(envPlugin);
    return webpackConfig;
  }
};
