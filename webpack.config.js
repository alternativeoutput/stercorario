const HtmlWebPackPlugin = require("html-webpack-plugin");
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ManifestPlugin = require('webpack-manifest-plugin');

// const commonsPlugin = new webpack.optimize.CommonsChunkPlugin(
//     'commons',  // Just name it
//     'common.js' // Name of the output file
//                 // There are more options, but we don't need them yet.
// );

const path = require('path');

module.exports = (env, argv) => {
  var publicUrl = '';
  if (argv.mode === 'production') {
    var publicUrl = '/~nastasi/exspa';
  }

  return {
    entry: {
        demo01: './src/apps/demo01/indexMain.js',
        demo02: './src/apps/demo02/indexMain.js',
    },
    mode: 'production',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name]-bundle.js',
      // publicPath: publicUrl + '/',
    },
    resolve: {
      extensions: ['.js', '.jsx']
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.css$/,
          loader: [MiniCssExtractPlugin.loader, "css-loader"]
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif|ico|map)$/,
          exclude: /node_modules/,
          use: ['file-loader?name=[name].[ext]'] // ?name=[name].[ext] is only necessary to preserve the original file name
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader"
            }
          ]
        }
      ]
    },

    optimization: {
      splitChunks: {
        cacheGroups: {
          default: false,
          vendors: false,

          // vendor chunk
          vendor: {
            name: 'vendor',
            // sync + async chunks
            chunks: 'all',
            // import file path containing node_modules
            test: /node_modules/,
            // priority
            priority: 20
          },

          // common chunk
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'initial',
            priority: 10,
            reuseExistingChunk: true,
            enforce: true
          }
        }
      }
    },

    devServer: {
      publicPath: "/",
      contentBase: "./public",
      hot: true
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: "./public/demo.html",
        filename: "./demo02.html",
        favicon: "./public/favicon.ico",
        chunks: ['demo02']
      }),
      new HtmlWebPackPlugin({
        template: "./public/demo.html",
        filename: "./demo01.html",
        favicon: "./public/favicon.ico",
        chunks: ['demo01']
      }),
      new InterpolateHtmlPlugin(HtmlWebPackPlugin, {
        PUBLIC_URL: publicUrl
      }),
      new CopyPlugin([
        {from: "./public/logo192.png", to: "logo192.png"}
      ]),
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: '[name].css',
        chunkFilename: '[id].css',
      }),
      new ManifestPlugin()
    ]
  };
};
