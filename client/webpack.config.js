module.exports = {
  entry: { app: './src/index.js' },
  output: {
	filename: '../public/dist/bundle.js',
	sourceMapFilename: '../public/dist/bundle.map'
  },
  devtool: '#source-map',
  mode: 'development',
  module: {
	rules: [
	  {
		test: /\.m?js$/,
		loader: 'babel-loader',
		exclude: '/(node_modules)/',
		query: {
		  presets: [ '@babel/preset-react', '@babel/preset-env' ]
		}
	  },
	  {
		test: /\.css$/i,
		use: ['style-loader', 'css-loader'],
	  },
	  {
		test: /\.(png|jpe?g|gif)$/i,
		use: 'file-loader'
	  }
	]
  }
}

