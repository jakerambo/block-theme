const fs = require('fs');
const RemoveFilesPlugin = require('remove-files-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const SassLintPlugin = require('sass-lint-webpack')
const ESLintPlugin = require('eslint-webpack-plugin')
const FileManagerPlugin = require('filemanager-webpack-plugin')

const package = JSON.parse(fs.readFileSync('./package.json'));
const src = `${__dirname}/src`;

module.exports = {
	mode: 'none',

	// Watch for changes.
	watch: true,

	// Where webpack looks to start building the bundle
	entry: [`${src}/js/main.js`, `${src}/sass/main.scss`],

	// Where webpack outputs the assets and bundles
	output: {
		path:  __dirname + '/build/js',
		filename: '[name].js',
	},

	devtool: 'source-map',

	// Customize the webpack build process
	plugins: [
		new RemoveFilesPlugin({
        watch: {
        	include: [
	          './build',
	        ],
        },
    }),

		// Copies files from target to destination folder
		new CopyWebpackPlugin({
			patterns: [
				{
					context: 'src',
					from: '**/*.*',
					to: '../',
					globOptions: {
	            ignore: [
	                '**/sass/**',
	                '**/js/**',
	            ]
	        }
				},
			],
		},
		),

		new MiniCssExtractPlugin({
			filename: '../css/[name].css',
			chunkFilename: '[id].css',
		}),

		new SassLintPlugin({
			files: `${src}/**/*.scss`,
		}),

		new ESLintPlugin({
			context: 'src',
		}),

		new BrowserSyncPlugin({
			proxy: {
				target: package.localURL,
			}
		}),

		new FileManagerPlugin({
      events: {
        onEnd: {
          archive: [
            { source: 'build', destination: `dist/${package.name}.zip` },
          ],
        },
      },
    }),
	],

	// Determine how modules within the project are treated
	module: {
		rules: [
			// JavaScript: Use Babel to transpile JavaScript files
			{ test: /\.js$/, use: ['babel-loader'] },

			{ 
				test: /\.(woff(2)?|eot|ttf|otf|)$/, 
				type: 'asset/resource',
				generator: {
					filename : '../css/fonts/[name][ext][query]',
				} 
			},

			{
				test: /\.(scss|css)$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							importLoaders: 2,
							sourceMap: true,
							modules: false,
						},
					},
          { 
          	loader: 'postcss-loader', 
          	options: { sourceMap: true } 
          },
					{
            loader: "sass-loader",
            options: {
              // Prefer `dart-sass`
              implementation: require.resolve("dart-sass"),
              sourceMap: true
            },
          },
				],
			},
		],
	},

	optimization: {
		minimize: true,
		minimizer: [new CssMinimizerPlugin(), '...'],
		runtimeChunk: {
			name: 'runtime',
		},
	},

}
