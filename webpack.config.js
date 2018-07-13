const path = require("path");

module.exports = {
  entry: './demo/src/index.jsx',
  output: {
    path: path.resolve(__dirname, "./demo/"),
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
    contentBase: './demo/',
    port: 8000,
    stats: "minimal",
    hot: true
  }
};
