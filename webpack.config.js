const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = env => {
  return {
    mode: 'development',
    entry: {
      main: './src/index.js',
      presentation: './js/presentation.js'
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'assets/js/[name].js'
    },
    module: {
      rules: [
        {
          test: /\.(scss)$/,
          use: [
            {
              // Adds CSS to the DOM by injecting a `<style>` tag
              loader: 'style-loader'
            },
            {
              // Interprets `@import` and `url()` like `import/require()` and will resolve them
              loader: 'css-loader'
            },
            {
              // Loader for webpack to process CSS with PostCSS
              loader: 'postcss-loader',
              options: {
                plugins: function () {
                  return [
                    require('autoprefixer')
                  ];
                }
              }
            },
            {
              // Loads a SASS/SCSS file and compiles it to CSS
              loader: 'sass-loader'
            }
          ]
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          query: {
            presets: [
              '@babel/preset-env'
            ]
          }
        },
        {
          test: /\.(png|jpg|gif)$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                name: '../assets/img/main/[name].[ext]',
                limit: 8192
              }
            }
          ]
        }
      ]
    },
    stats: {
      colors: true
    },
    devtool: 'source-map',
    plugins: [
      new CopyWebpackPlugin([
        { from: './assets/**/*', to: './', force: true }

      ], { copyUnmodified: true }),
      new BrowserSyncPlugin({
        host: 'localhost',
        port: 3000,
        server: { baseDir: ['dist'] }
      })
    ]
  };
};
