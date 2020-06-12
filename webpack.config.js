const path = require("path");
const fixDefaultImportPlugin = require("webpack-fix-default-import-plugin");
const tsConfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

var babelOptions = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          esmodules: true
        }
      }
    ],
    "@babel/preset-typescript",
    "@babel/preset-react"
  ],
  plugins: [
    "@babel/proposal-class-properties"
  ]
};

module.exports = {
  context: __dirname,
  target: "electron-renderer",
  mode: "development",
  entry: {
    main: "./src/main/main.ts",
    renderer: "./src/renderer/briki.tsx"
  },
  output: {
    path: path.resolve('dist'),
    filename: "[name].js"
  },
  resolve: {
    modules: [
      path.resolve(__dirname, "src"),
      "node_modules"
    ],
    extensions: [".js", ".ts", ".tsx", "scss"],
    plugins: [
      new tsConfigPathsPlugin()
    ]
  },
  externals: {
    "sqlite3": "commonjs sqlite3"
  },
  devtool: 'source-maps',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelOptions
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        enforce: "pre",
        use: "source-map-loader"
      }
    ]
  },
  node: {
    fs: "empty",
    __dirname: false,
  },
  plugins: [
    new fixDefaultImportPlugin(),
  ]
};