const path = require('path');
const slsw = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  entry: slsw.lib.entries,
  target: 'node',
  devtool: slsw.lib.webpack.isLocal
    ? 'eval-cheap-module-source-map'
    : 'source-map',
  resolve: {
    extensions: ['.js', '.json', '.ts'],
    plugins: [new TsconfigPathsPlugin()]
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js'
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          keep_classnames: true,
          keep_fnames: true
        },
        parallel: true
      })
    ]
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: [
          [
            path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname, '.serverless'),
            path.resolve(__dirname, '.webpack')
          ]
        ],
        options: {
          compilerOptions: {
            module: 'es6',
            target: 'es2017'
          },
          transpileOnly: true
        }
      }
    ]
  },
  plugins: []
};
