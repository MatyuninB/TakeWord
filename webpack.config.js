const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpuckPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const {HtmlWebpackSkipAssetsPlugin} = require('html-webpack-skip-assets-plugin');

const isDev = process.env.MODE === 'development';

function filterByEntryPoint(entry){
	return function(module, chunks){
		for (let i=0;i<chunks.length;i++) {
			const chunk = chunks[i];
			if (chunk.groupsIterable) {
				for (const group of chunk.groupsIterable) {
					if (group.getParents()[0] && group.getParents()[0].name === entry) {
						return true;
					}
				}
			}
		}
		return false;
	}
}

const optimizationSetup = () => {
  const config = {
    splitChunks: {
      cacheGroups: {
				default: false,
				vendors: false,
				desktop: {
					name: "desktop-common",
					minChunks: 3,
					chunks: "async",
					test: filterByEntryPoint("index")
				},
				mobile: {
					name: "m-common",
					minChunks: 3,
					chunks: "async",
					test: filterByEntryPoint("background")
				}
			}
    }
  }

  if (isDev) {
    config.minimize = true;
    config.minimizer = [
      new TerserWebpuckPlugin(),
    ];
  }

  return config;
};

const bableOptions = (extention) => {
  const options = {
    presets: [
      "@babel/preset-env",
    ],
    plugins: []
  }

  if (extention === 'jsx') {
    options.presets.push("@babel/preset-react");
  }

  return options;
}

const filename = (type) => `[name].${type}`;

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    main: './index.jsx',
    background: './background.js'
  },
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: optimizationSetup(),
  devtool: isDev? 'source-map' : false,
  watch: isDev,
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'manifest.json'),
          to: path.resolve(__dirname, 'dist', 'manifest.json')
        } 
      ],
      options: {
        concurrency: 100,
      },
    }),
    new HTMLWebpackPlugin({
      template: './public/popup.html',
      filename: 'popup.html',
      excludeAssets: [/background.*.js/],
      minify: {
        collapseWhitespace: !isDev,
      }
    }),
    new HtmlWebpackSkipAssetsPlugin(),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: filename('css'),
      chunkFilename: "[id].css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test:  /\.(png|jpe?g|gif)$/i,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.svg$/,
        use: [
          'svg-inline-loader'
        ]
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: bableOptions(),
        }
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: bableOptions('jsx'),
        }
      }
    ],
  }
}