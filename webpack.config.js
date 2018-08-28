module.exports = {
  entry: {
    taskcontainer: './public/js/taskcontainer.js',
    listcontainer: './public/js/listcontainer.js'
  },
  output: {
    filename: './public/dist/[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"
      }
    ]
  }
}
