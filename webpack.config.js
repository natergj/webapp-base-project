const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const ExtractTextSass = new ExtractTextPlugin("index.one.[contenthash].css");
const ExtractTextLess = new ExtractTextPlugin("index.two.[contenthash].css");

const getConfig = (env) => {
  let config = {
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
    ],
    module: {
      rules: [
        {
          test: /\.(jsx|js)$/,
          use: [{ loader: 'babel-loader' }],
        },
        {
          test: /\.(tsx|ts)$/,
          use: [
            {
              loader: 'awesome-typescript-loader',
              options:  {
                silent: true,
                useCache: true,
                useBabel: true,
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
  };

  if (env === 'dev') {
    config.devServer = {
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
    };
    config.devtool = 'source-map';
  }

  if (env === 'prod') {
    config.plugins.push(
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: 'vendor.[chunkhash].js',
        minChunks: function (module) {
          return module.context && module.context.indexOf('node_modules') !== -1;
        }
      })
    );
    config.plugins.push(
      new webpack.optimize.UglifyJsPlugin({
          beautify: false,
          mangle: {
              screw_ie8: true,
              keep_fnames: true
          },
          compress: {
              screw_ie8: true
          },
          comments: false
      })
    )
  }

  return config;
};

module.exports = getConfig;
