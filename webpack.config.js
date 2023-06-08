const path = require('path');

module.exports = {
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react'],
        },
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      'react-slick': path.resolve(__dirname, 'node_modules/react-slick'),
    },
  },
};







// module.exports = {
// 	devtool: 'source-map',
// 	module: {
// 		rules: [
// 			{
// 				test: /\.js$/,
// 				exclude: /node_modules/,
// 				loader: 'babel-loader',
// 				options: {
// 					presets: ['@babel/preset-react'],
// 				},
// 			},
// 		],
// 	},
// };
