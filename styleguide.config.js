const path = require('path');
const webpack = require('webpack');

module.exports = {
  title: 'Urbica React Map GL',
  showCode: true,
  showUsage: true,
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
        'src/components/MapGL.js',
        'src/components/Source.js',
        'src/components/Layer.js'
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
          name: 'Using with Immutable.js',
          content: 'docs/immutable-map.md'
        },
        {
          name: 'Map Instance',
          content: 'docs/map-instance.md'
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
        }
      ]
    }
  ],
  dangerouslyUpdateWebpackConfig: (webpackConfig, env) => {
    if (env === 'production') {
      /* eslint-disable no-param-reassign */
      webpackConfig.plugins[3] = new webpack.optimize.UglifyJsPlugin({
        compress: {
          screw_ie8: true,
          warnings: false,
          comparisons: false
        },
        mangle: false,
        output: {
          comments: false,
          screw_ie8: true
        }
      });
    }

    webpackConfig.module.rules.push({
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    });

    webpackConfig.plugins.push(new webpack.EnvironmentPlugin(['MAPBOX_ACCESS_TOKEN']));

    return webpackConfig;
  }
};
