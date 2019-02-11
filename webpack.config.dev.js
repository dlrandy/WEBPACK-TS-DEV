const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const StyleLintPlugin = require('stylelint-webpack-plugin');

const ReplaceTextWebpackPlugin = require('./lib/webpack-replace-text-plugin');
const { getEntryJsHtmlPrj } = require("./utils/helpers");
const [entryJsPath, htmlTemplatePath] = getEntryJsHtmlPrj();
module.exports = {
  mode: "development",
  target: "web",
  entry: [entryJsPath],
  devtool: "cheap-module-source-map",
  output: {
    path: path.resolve(__dirname, "./"),
    publicPath: "/",
    pathinfo: true,
    filename: "[name].js",
    chunkFilename: "[id].[name].js"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              experimentalWatchApi: true
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader", options: { importLoaders: 1 } },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: () => [
                require("postcss-flexbugs-fixes"),
                require("postcss-preset-env")({
                  autoprefixer: {
                    flexbox: "no-2009",
                    grid: "autoplace"
                  },
                  stage: 0
                })
              ]
            }
          }
        ]
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: "url-loader",
        options: {
          limit: 10000
        }
      },
      {
        test: /\.(ttf|eot|woff|woff2|svg)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[path][name].[ext]"
          }
        }
      }
    ]
  },
  devServer: {
    contentBase: "./",
    historyApiFallback: true,
    hot: true,
    inline: true,
    open: "chrome",
    port: 9000,
    proxy: {
      "/cvms/marketbuzz-survey-service": {
        target: "http://localhost:3000",
        pathRewrite: { "^/cvms/marketbuzz-survey-service": "" }
      }
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development")
    }),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en|zh/),
    new StyleLintPlugin({
      configFile: './stylelint.config.js',
      files: './src/**/*.css'
    }),
    new HtmlWebpackPlugin({
      template: htmlTemplatePath,
      title: "developing",
      inject: true
    }),
    new ReplaceTextWebpackPlugin({ title: 'JJJ' }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false
  },
  node: {
    dgram: "empty",
    fs: "empty",
    net: "empty",
    tls: "empty",
    child_process: "empty"
  },
  performance: false
};
