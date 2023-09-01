const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, "build")
    },
    port: 3000
  },
  entry: "./src/index.tsx",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(s(a|c)ss)$/,
        use: ['style-loader','css-loader', 'sass-loader']
      },
      { 
        test: /\.(ts|tsx)$/, 
        loader: "ts-loader" 
      }
    ]
  },
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "build")
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html")
    })
  ],
  resolve: {
    extensions: [".*", ".js", ".jsx", ".ts", ".tsx"]
  }
};
