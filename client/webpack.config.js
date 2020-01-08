module.exports = {
  mode: 'development',
  entry: { app: './src/index.js' },
  output: {
	filename: '../public/dist/bundle.js',
	sourceMapFilename: '../public/dist/bundle.map'
  },
  devtool: '#source-map',
  module: {
	rules: [
	  {
		test: /\.m?js$/,
		loader: 'babel-loader',
		exclude: '/(node_modules)/',
		query: {
		  presets: [ '@babel/preset-react', '@babel/preset-env' ]
		}
	  }
	]
  }
}

