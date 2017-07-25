const path = require('path');

module.exports = {
  bail: true,
  devtool: 'source-map',
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    filename: 'bundle.js',
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
    'prop-types': 'prop-types',
    'react-dom': 'react-dom'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['es2015', { modules: false }],
              ['env', {
                targets: {
                  browsers: ['last 2 versions']
                }
              }],
              'react'
            ]
          }
        }
      }
    ]
  }
};
