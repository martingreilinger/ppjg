const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  target: 'node',
  entry: {
    cli: './src/cli.ts',
    index: './src/index.ts',
  },
  devtool: 'inline-source-map',
  optimization: {
    splitChunks: {
      cacheGroups: {
        core: {
          name: 'core',
          chunks: 'all',
          test: /[\\/]src[\\/](.*)/,
          enforce: true,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [{ loader: 'ts-loader' }],
        exclude: /(node_modules|.*mock.*)/,
      },
    ],
    noParse: /\/es-import.ts$/,
  },
  resolve: {
    extensions: ['.ts'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'out'),
    chunkFilename: '[name].chunk.js',
    library: 'ppjg',
    libraryTarget: 'umd',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({ patterns: ['LICENSE', 'README.md'] }),
    new webpack.BannerPlugin({
      banner: '#!/usr/bin/env node',
      raw: true,
      test: 'cli.js',
    }),
  ],
};
