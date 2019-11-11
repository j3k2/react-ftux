const path = require("path");

module.exports = {
  entry: './docs/src/index.jsx',
  output: {
    path: path.resolve(__dirname, "./docs/"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  devServer: {
    contentBase: './docs/',
    port: 8000,
    stats: "minimal",
    hot: true
  }
};
