require('dotenv').config();
const webpack = require('webpack');
const TerserPlugin = require("terser-webpack-plugin");

const path = require('path');

module.exports = {
  entry: path.join(__dirname, './client/src/index.js'),
  output: {
    path: path.join(__dirname, './client/dist'),
    filename: 'bundle.js',
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(
      {
        test: /\.js(\?.*)?$/i,
      },
    ),
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {},
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
