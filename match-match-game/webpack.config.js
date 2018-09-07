module.exports = {
  entry: './src/index.jsx',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist/build',
    publicPath: '/'
  },
  resolve: {
    extensions: [
        '.js', '.jsx',
        '.css', '.scss',
    ]
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
          test: /\.(jsx)$/,
          loader: 'babel-loader',
          query: {
              presets: ['es2015', 'react', 'stage-2']
          }
      }
    ]
  }
};
