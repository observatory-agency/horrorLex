const path = require('path');
const WatchNonWebpackFiles = require('./lib/WatchNonWebpackFiles');

module.exports = {
  mode: 'development',
  entry: './src/scripts/index.js',
  output: {
    path: path.resolve(__dirname, 'public/assets'),
    filename: 'app.js',
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
            plugins: ['@babel/transform-runtime'],
          },
        },
      }, {
        test: /\.css$/i,
        include: path.resolve('src'),
        use: [
          'style-loader',
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
                plugins: ['tailwindcss'],
              },
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.css', '.js', '.jsx'],
  },
  plugins: [
    new WatchNonWebpackFiles(),
  ],
  devServer: {
    contentBase: path.join(__dirname),
    publicPath: '/public',
    liveReload: true,
    proxy: {
      '**': {
        target: 'http://localhost:3000',
        headers: {
          Connection: 'keep-alive',
        },
      },
    },
    watchContentBase: true,
  },
};
