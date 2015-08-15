var argv = require('yargs').argv;
var path = require('path');
var webpack = require('webpack');
var Clean = require('clean-webpack-plugin');

var hotReloadConfig = {
    devtool: 'eval',
    entry: [
        'webpack-dev-server/client?http://10.1.1.6:8080', // WebpackDevServer host and port
        'webpack/hot/only-dev-server',
        './js/App.jsx'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/js/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
    ],
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                exclude: /(node_modules)/,
                loaders: ['react-hot-loader', 'babel-loader?optional=runtime']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ['babel-loader?optional=runtime']
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'file-loader?name=images/[name].[ext]'
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};

var nonHotReloadConfig = {
    devtool: 'eval',
    entry: [
        './js/App.jsx'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/js/'
    },
    plugins: [
        new Clean(['dist/*'], '.')
    ],
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                exclude: /(node_modules)/,
                loaders: ['babel-loader?optional=runtime']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ['babel-loader?optional=runtime']
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'file-loader?name=images/[name].[ext]'
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};

module.exports = argv.phonegap ? nonHotReloadConfig : hotReloadConfig;
