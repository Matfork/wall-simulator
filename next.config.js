require('dotenv').config();

const path = require('path');
const Dotenv = require('dotenv-webpack');
const withTypescript = require('@zeit/next-typescript');
const nextCssLoaders = require('./config/helper');

// fix: prevents error when .css|.less files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.css'] = file => {};
  require.extensions['.less'] = file => {};
}

module.exports = withTypescript({
  publicRuntimeConfig: {
    localeSubpaths:
      typeof process.env.LOCALE_SUBPATHS === 'string'
        ? process.env.LOCALE_SUBPATHS
        : 'none'
  },
  exportPathMap: function() {
    return {
      '/': { page: '/' }
    };
  },
  webpack: (config, options) => {
    const cssLoaders = nextCssLoaders(config, options);

    config.module.rules.push(
      {
        test: /\.css$/,
        use: cssLoaders.css
      },
      {
        test: /\.scss$/,
        use: cssLoaders.sass
      },
      {
        test: /\.sass$/,
        use: cssLoaders.sass
      },
      {
        test: /\.less$/,
        use: cssLoaders.less
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000
          }
        }
      }
    );

    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty'
    };

    if (cssLoaders.plugin['ant-theme']) {
      config.plugins.push(cssLoaders.plugin['ant-theme']);
    }

    config.plugins.push(
      // Read the .env file
      new Dotenv({
        path: path.join(__dirname, '.env'),
        systemvars: true
      })
    );

    return config;
  }
});
