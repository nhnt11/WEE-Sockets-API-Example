/* global require, module, __dirname */

const path = require("path");

module.exports = {
  entry: {
    background: "./background.js/index.js",
  },
  output: {
    path: path.resolve(__dirname, "src"),
    filename: "[name].js",
    sourceMapFilename: "[name].js.map",
    pathinfo: true,
  },
  resolve: {
    extensions: [".js"],
  },
  mode: "development",
  devtool: "inline-source-map",
};
