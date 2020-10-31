const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const HtmlWebPackPlugin = require("html-webpack-plugin");

let config = {
    devtool: 'inline-source-map',
    target: 'node',
    watch: true,
    externals: [nodeExternals()], // Need this to avoid error when working with Express
    mode: 'development',
    resolve: {
        alias: {
            http: path.resolve(__dirname, 'src/http'),
            models: path.resolve(__dirname, 'src/models'),
            lib: path.resolve(__dirname, 'src/lib'),
            core: path.resolve(__dirname, 'src/core'),
            sandbox: path.resolve(__dirname, 'src/tests/sandbox'),
            helpers: path.resolve(__dirname, 'src/core/helpers'),
            routes: path.resolve(__dirname, 'src/routes'),
            views: path.resolve(__dirname, 'src/views'),
            _http_: path.resolve(__dirname, 'src/core/@loaders/http'),
            _models_: path.resolve(__dirname, 'src/core/@loaders/models/index'),
            _helpers_: path.resolve(__dirname, 'src/core/@loaders/helpers/index'),
            _routes_: path.resolve(__dirname, 'src/core/@loaders/routes'),
        },
        extensions: ['.ts', '.js', '.tsx']
    },
    watchOptions: {
        aggregateTimeout: 600,
        ignored: /node_modules/
    },
    node: {
        // Need this when working with express, otherwise the build fails
        __dirname: false,   // if you don't put this is, __dirname
        __filename: false,  // and __filename return blank or /
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                // Transpiles ES6-8 into ES5
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                // Loads the javacript into html template provided.
                // Entry point is set below in HtmlWebPackPlugin in Plugins
                test: /\.html$/,
                use: [{loader: "html-loader"}]
            }
        ]
    }
};

let appConfig = Object.assign({}, config, {
    entry: {
        app:  './src/app.ts',
    },
    output: {
        path: path.join(__dirname, 'dist'),
            publicPath: '/',
            filename: 'app.js'
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/static/index.html",
            filename: "./src/static/index.html",
            excludeChunks: [ 'app' ]
        }),
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 5,
        }),
    ]
});

let highwayConfig = Object.assign({}, config, {
    entry: {
        highway:  './src/core/@highway/highway.ts',
    },
    plugins: [
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1,
        }),
    ],
    output: {
        path: path.join(__dirname, '/'),
        publicPath: '/',
        filename: 'highway.js'
    }
});

module.exports = [appConfig, highwayConfig];