const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const tsLoaderOptions = process.env.NODE_ENV === 'production' ? { compilerOptions: { sourceMap: false } } : {};

const prodWebpackConfig = {
  entry: {
    vendor: [
      "antd",
      "immutable",
      "react",
      "react-dom",
      "react-redux",
      "react-router",
      "react-router-redux",
      "redux",
      "redux-immutable",
      "redux-thunk"
    ],
    app: './src/entry'
  },
  output: {
    filename: '[name].[hash].js',
    path: __dirname + '/dist',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.scss'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'React-Redux-Weback-Typescript-AntDesign',
      template: 'src/index.ejs'
    }),
    new ExtractTextPlugin("index.[hash].css"),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.[hash].js'
    }),
    new webpack.optimize.UglifyJsPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(tsx|ts)$/,
        loader: 'ts-loader',
        options: tsLoaderOptions,
      },
      {
        test: /\.(scss|css)$/,
        loader: ExtractTextPlugin.extract({
          use: 'css-loader!sass-loader',
          fallback:'style-loader',
        })
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader?name=fonts/[name].[hash].[ext]'
      }
    ],
  },
  devServer: {
    proxy: {
      '/api': {
        target: {
          host: 'localhost',
          protocol: 'http',
          port: 3000,
        },
        changeOrigin: true,
        secure: false,
      },
    },
  },
};

const devWebpackConfig = {
  entry: {
    vendor: [
      "antd",
      "immutable",
      "react",
      "react-dom",
      "react-redux",
      "react-router",
      "react-router-redux",
      "redux",
      "redux-immutable"
    ],
    app: './src/entry'
  },
  output: {
    filename: 'app.js',
    path: __dirname + '/dist',
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.scss'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'React-Redux-Weback-Typescript-AntDesign',
      template: 'src/index.ejs'
    }),
    new ExtractTextPlugin("index.css"),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js'
    })
  ],
  module: {
    rules: [
      {
        test: /\.(tsx|ts)$/,
        loader: 'ts-loader',
        options: tsLoaderOptions,
      },
      {
        test: /\.(scss|css)$/,
        loader: ExtractTextPlugin.extract({
          use: 'css-loader!sass-loader',
          fallback:'style-loader',
        })
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      },
      {
        test: /\.(tsx|ts)$/,
        loader: 'source-map-loader',
        enforce: 'pre'
      }
    ],
  },
  devServer: {
    proxy: {
      '/api': {
        target: {
          host: 'localhost',
          protocol: 'http',
          port: 3000,
        },
        changeOrigin: true,
        secure: false,
      },
    },
  },
};

module.exports = process.env.NODE_ENV === 'development' ? devWebpackConfig : prodWebpackConfig;
