const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const SassLintPlugin = require('sass-lint-webpack')
const ESLintPlugin = require('eslint-webpack-plugin')
const FileManagerPlugin = require('filemanager-webpack-plugin')

const src = `${__dirname}/src`;

module.exports = {
	mode: 'none',

	// Watch for changes.
	watch: true,

	// Where webpack looks to start building the bundle
	entry: [`${src}/js/main.js`, `${src}/sass/main.scss`],

	// Where webpack outputs the assets and bundles
	output: {
		path:  __dirname + '/build/enqueue',
		filename: '[name].js',
	},

	// Customize the webpack build process
	plugins: [
		// Removes/cleans build folders and unused assets when rebuilding
		new CleanWebpackPlugin(),

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
			filename: 'css/[name].css',
			chunkFilename: '[id].css',
		}),

		new SassLintPlugin(),

		new ESLintPlugin({
			context: 'src',
		}),

		new BrowserSyncPlugin({
			proxy: {
				target: "https://block-theme.local",
			}
		}),

		new FileManagerPlugin({
      events: {
        onEnd: {
          archive: [
            { source: 'build', destination: 'dist/block-theme.zip' },
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
				test: /\.(scss|css)$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							importLoaders: 2,
							sourceMap: false,
							modules: false,
						},
					},
					'postcss-loader',
					{
            loader: "sass-loader",
            options: {
              // Prefer `dart-sass`
              implementation: require.resolve("dart-sass"),
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
