const path = require("path");

module.exports = {
  entry: "./src/index.jsx",
  output: {
    path: path.resolve(__dirname, "./"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/,
      }
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  devServer: {
    contentBase: "./",
    port: 8000,
    stats: "minimal",
    hot: true,
  },
};
