const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const ExtractTextSass = new ExtractTextPlugin("index.one.[contenthash].css");
const ExtractTextLess = new ExtractTextPlugin("index.two.[contenthash].css");

const webpackConfig = {
  entry: {
    app: './src/entry',
  },
  output: {
    filename: '[name].[chunkhash].js',
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
    ExtractTextSass,
    ExtractTextLess,
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.[chunkhash].js',
      minChunks: function (module) {
        return module.context && module.context.indexOf('node_modules') !== -1;
      }
    }),
    new webpack.optimize.UglifyJsPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(tsx|ts)$/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            options:  {
              silent: true,
              compilerOptions: { sourceMap: false },
              useCache: true,
              useBabel: true,
              babelOptions: {
                "presets": [
                  "react",
                  [ "es2015", { "modules": false } ],
                ],
                "plugins": [
                  [ 
                    "import", [
                      { "libraryName": "antd", "libraryDirectory": "lib", "style": true },
                      { "libraryName": "lodash" },
                    ]
                  ],
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.(css|scss)$/,
        loader: ExtractTextSass.extract({
          use: ['css-loader', 'sass-loader'],
          fallback:'style-loader',
        })
      },
      {
        test: /\.(less)$/,
        loader: ExtractTextLess.extract({
          use: ['css-loader', 'less-loader'],
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

module.exports = webpackConfig;
