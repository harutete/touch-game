module.exports = {
  mode: 'development',
  entry: './src/js/app.ts', //ファイルをまとめる際のエントリーポイント
  output: {
    path: __dirname,
    filename: './dist/master.js' //まとめた結果出力されるファイル名
  },
  resolve: {
    extensions: ['.ts', '.js'] //拡張子がtsだったらTypescirptでコンパイルする
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: false,
              importLoaders: 2  // 2 => postcss-loader, sass-loader
            }
          },
          {
            loader: 'sass-loader',
          }
        ]
      }
    ]
  }
}