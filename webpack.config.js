const path = require('path');

module.exports = {
  entry: {
    client: './src/scripts/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'public/scripts/'),
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: '/public/scripts/',
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
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
};
