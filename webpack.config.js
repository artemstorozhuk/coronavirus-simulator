"use strict";

const PnpWebpackPlugin = require(`pnp-webpack-plugin`);

module.exports = {
  devtool: "inline-source-map",
  entry: "./src/app.ts",
  watch: true,
  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: require.resolve("ts-loader"),
        options: PnpWebpackPlugin.tsLoaderOptions()
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"],
    plugins: [PnpWebpackPlugin]
  },
  resolveLoader: {
    plugins: [PnpWebpackPlugin.moduleLoader(module)]
  }
};
