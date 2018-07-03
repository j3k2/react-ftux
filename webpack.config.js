const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

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
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "./demo/index.html")
    })
  ],
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
