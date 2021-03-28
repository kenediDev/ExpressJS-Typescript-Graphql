const htmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: path.join(__dirname, "../server/server.ts"),
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/",
  },
  target: "node",
  externals: [nodeExternals()],
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(ts|tsx)$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new htmlWebpackPlugin({
      filename: "index.html",
      template: path.join(__dirname, "../src/index.html"),
    }),
  ],
};
