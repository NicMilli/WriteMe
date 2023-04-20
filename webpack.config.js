require('dotenv').config();
const webpack = require('webpack');
// const TerserPlugin = require("terser-webpack-plugin");

const path = require('path');

module.exports = {
  entry: path.join(__dirname, './client/src/index.jsx'),
  output: {
    path: path.join(__dirname, './client/dist'),
    filename: 'bundle.js',
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: '../fonts',
        },
      },
    ],
  },
  // optimization: {
  //   minimize: true,
  //   minimizer: [new TerserPlugin(
  //     {
  //       test: /\.js(\?.*)?$/i,
  //     },
  //   ),
  //   ],
  // },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {},
    }),
  ],
};
