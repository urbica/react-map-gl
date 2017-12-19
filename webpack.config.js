const path = require('path');
const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  bail: true,
  stats: 'detailed',
  devtool: 'source-map',
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    filename: 'react-map-gl.js',
    path: path.resolve(__dirname, 'dist'),
    library: '@urbica/react-map-gl',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  externals: {
    react: 'react',
    immutable: 'immutable',
    'react-dom': 'react-dom',
    'mapbox-gl': {
      commonjs: 'mapbox-gl',
      commonjs2: 'mapbox-gl',
      amd: 'mapbox-gl',
      root: 'mapboxgl'
    },
    'prop-types': 'prop-types'
  },
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
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.EnvironmentPlugin(['MAPBOX_ACCESS_TOKEN']),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false
    })
  ]
};
