const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/ui/main.ts", // Your main entry point for client-side code

  output: {
    filename: "bundle.[contenthash].js", // Cache-busting
    path: path.resolve(__dirname, "dist"),
    clean: true, // Clears dist/ on each build
  },

  mode: "development", // Change to 'production' for prod builds

  devtool: "inline-source-map", // Great for debugging TypeScript

  devServer: {
    static: "./public", // Folder to serve static assets
    hot: true,
    port: 8080,
    open: true,
  },

  resolve: {
    extensions: [".ts", ".js"], // Allows imports without extensions
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i, // Asset handling
        type: "asset/resource",
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html", // Injects your JS bundle automatically
    }),
  ],
};
