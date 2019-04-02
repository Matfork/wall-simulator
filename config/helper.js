const AntdScssThemePlugin = require('antd-scss-theme-plugin');
const cssLoaderConfig = require('@zeit/next-css/css-loader-config');
const lessToJS = require('less-vars-to-js');
const path = require('path');
const fs = require('fs');

// Remeber to add ant.theme.less file if using root for theme properties
// 'none' | 'sass' | 'less'
const withAntTheme = 'sass';

const wrapperSass = (withAntTheme, content) => {
  if (withAntTheme === 'sass') {
    return AntdScssThemePlugin.themify(content);
  }
  return content;
};

const wrapperLess = (withAntTheme, content) => {
  if (withAntTheme === 'none') {
    return content;
  } else if (withAntTheme === 'sass') {
    return AntdScssThemePlugin.themify(content);
  }

  // Only needed if you decide not to use the sass plugin for custom theme, but less instead
  content.options = {
    ...content.options,
    modifyVars: lessToJS(
      fs.readFileSync(path.resolve('./ant.theme.less'), 'utf8')
    )
  };
  return content;
};

module.exports = (config, options) => {
  const { dev, isServer } = options;

  const css = cssLoaderConfig(config, {
    extensions: ['css'],
    cssModules: false,
    cssLoaderOptions: {
      importLoaders: 1,
      localIdentName: '[local]___[hash:base64:5]'
    },
    dev,
    isServer
  });

  const sass = cssLoaderConfig(config, {
    extensions: ['scss', 'sass'],
    cssModules: false,
    cssLoaderOptions: {
      importLoaders: 1,
      localIdentName: '[local]___[hash:base64:5]'
    },
    dev,
    isServer,
    loaders: [
      wrapperSass(withAntTheme, {
        loader: 'sass-loader'
      })
    ]
  });

  const less = cssLoaderConfig(config, {
    extensions: ['less'],
    // cssModules: true, //ant design styles got lost when activating css modules
    cssLoaderOptions: {
      importLoaders: 1,
      localIdentName: '[local]___[hash:base64:5]'
    },
    dev,
    isServer,
    loaders: [
      wrapperLess(withAntTheme, {
        loader: 'less-loader',
        options: {
          javascriptEnabled: true
        }
      })
    ]
  });

  return {
    css,
    sass,
    less,
    plugin: {
      'ant-theme':
        withAntTheme === 'sass'
          ? new AntdScssThemePlugin('./ant.theme.scss')
          : null
    }
  };
};
