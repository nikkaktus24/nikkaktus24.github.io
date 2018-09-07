module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist/build'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.scss$/,
        use: [ 'style-loader', 'css-loader', 'sass-loader' ]
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader'
      },
      {
          test: /\.(js|jsx)$/,
          loader: 'babel-loader',
          query: {
              presets: ['es2015', 'react', 'stage-2']
          }
      }
    ]
  }
};
