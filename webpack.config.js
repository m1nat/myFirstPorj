const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.[chunkhash].js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HTMLWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
    }),
    new HTMLWebpackPlugin({
      filename: "sign-in.html",
      template: "./src/templates/sign-in.html",
    }),
    new HTMLWebpackPlugin({
      filename: "sign-up.html",
      template: "./src/templates/sign-up.html",
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(jpg|png|svg|gif)/,
        use: ["file-loader"],
      },
      {
        test: /\.html/i,
        use: "html-loader",
      },
    ],
  },
  devServer: {
    port: 4200,
  },
};
