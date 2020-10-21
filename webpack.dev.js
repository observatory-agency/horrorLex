const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/scripts/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
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
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    publicPath: '/public',
    liveReload: true,
    proxy: {
      '**': 'http://localhost:3000',
    },
  },
};
