const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'production',
  target: 'web',
  devtool: 'source-map',
  entry: './src/scripts/index.js',
  output: {
    path: path.resolve(__dirname, 'public/assets'),
    filename: 'app.js',
  },
  plugins: [
    new CleanWebpackPlugin({
      protectWebpackAssets: false,
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
  ],
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: ['@babel/transform-runtime'],
        },
      },
    }, {
      test: /\.css$/i,
      include: path.resolve('src'),
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: ['tailwindcss', 'autoprefixer', 'cssnano'],
            },
          },
        },
      ],
    }],
  },
  resolve: {
    extensions: ['*', '.css', '.js', '.jsx'],
  },
  // TODO: if we need to split any chunks to import dynamically, do it here
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       default: false,
  //       commons: {
  //         test: /[\\/]node_modules[\\/]/,
  //         // name: 'vendors',
  //         chunks: 'all',
  //       },
  //     },
  //   },
  // },
};
