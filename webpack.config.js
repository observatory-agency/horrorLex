const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    client: './src/scripts/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'public/scripts/'),
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
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    publicPath: '/public/scripts',
    liveReload: true,
  },
};
