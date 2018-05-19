const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server', //HRM更新时刷新整个页面，如果是only-dev-server是手动刷新
    `${__dirname}/app/main.js`,
    ],
  output: {
    filename: '[name].bundle.js',
    path: `${__dirname}/build`,
    publicPath: '/build/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // 启用 HMR
    new webpack.NamedModulesPlugin(),
  ],
  resolve: {
    // 定义了解析模块路径时的配置，常用的就是extensions，可以用来指定模块的后缀，这样在引入模块时就不需要写后缀了，会自动补全
    extensions: ['.js', '.jsx'],
    alias: {
      less: path.resolve(__dirname, 'public/less/')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react', 'es2015']
          }
        }
      }, {
        test: /\.less$/,
        exclude: /(node_modules)/,
        use: [
          // MiniCssExtractPlugin.loader,
          "style-loader",
          "css-loader",
          "less-loader"
        ]
      }
    ]
  },
  devServer: {
    hot: true,
    host: 'localhost',
    port: 3000,
    contentBase: path.resolve(__dirname, 'build')
  }
}