const path = require('path');

// TODO we'll need to chunk the CSS to its own file for production
module.exports = {
  mode: 'development',
  entry: {
    bundle: './src/scripts/index.js',
    // styles: './src/styles/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: '/public',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      }, {
        test: /\.css$/,
        use: [
          'style-loader', {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.css', '.js', '.jsx'],
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    publicPath: '/public',
    liveReload: true,
    proxy: {
      '**': 'http://localhost:3000',
    },
  },
};
