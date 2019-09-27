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
          test: /\.(sa|sc|c)ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            { loader: 'css-loader' },
            { loader: 'postcss-loader', options: { sourceMap: false } },
            'resolve-url-loader',
            { loader: 'sass-loader', options: { sourceMap: false } }

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
                name: '../img/main/[name].[ext]',
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
      new MiniCssExtractPlugin({
        filename: 'assets/css/[name].css'
      }),
      new CopyWebpackPlugin([
        { from: './img/**/*', to: './assets', force: true }

      ], { copyUnmodified: true }),
      new BrowserSyncPlugin({
        host: 'localhost',
        port: 3000,
        server: { baseDir: ['dist'] }
      })
    ]
  };
};
