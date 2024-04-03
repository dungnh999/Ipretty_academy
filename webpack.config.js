const path = require("path");
const webpack = require('webpack');
const Dotenv = require("dotenv-webpack");
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
require("dotenv").config();
const version = new Date().getTime();
module.exports = {
    entry: './src/index.js',
    output: {
        filename: '[name].[contenthash].ipretty.js?v=' + version,
        // chunkFilename: '[name].[hash].ipretty.js',
        globalObject: 'this',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        clean: true
    },
    target: 'web',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: path.resolve(__dirname, 'src'),
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: { minimize: true }
                    }
                ],
                exclude: /\.html$/
            },
            {
                test: /\.css$/i,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
              loader: "file-loader",
              test: /\.(eot|otf|png|svg|jpg|ttf|woff|woff2)(\?v=[0-9.]+)?$/
            },
            {
                test: /\.md$/i,
                use: 'raw-loader'
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.less$/,
                use: [{
                    loader: 'style-loader' // creates style nodes from JS strings
                }, {
                    loader: 'css-loader' // translates CSS into CommonJS
                }, {
                    loader: 'less-loader' // compiles Less to CSS
                }]
            },
        ],
    },
    optimization: {
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: false,
        minimizer: [
            new TerserPlugin({
                parallel: false,
                terserOptions: {
                    ecma: 6,
                },
            }),
        ],
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        historyApiFallback: true,
        compress: true,
        open: true,
        hot: true,
        port: 9002
    },
    // node: { fs: 'empty' },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.svg' , '.jpg'],
        fallback: {
            fs: false,
        },
        alias: {
            'ipretty': path.resolve(__dirname, 'src/ipretty/'),
            'public': path.resolve(__dirname, 'src/public/'),
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            hash: true,
            template: "./src/public/index.html",
            inject: true,
            favicon: './src/public/icon_svg/iPretty_icon.svg'
        }),
        new CleanWebpackPlugin(),
        new Dotenv({
            path: './.env',
            safe: true,
        }),
        new webpack.DefinePlugin({
            "socket_host_name": JSON.stringify(process.env.SOCKET_HOSTNAME),
            "socket_port": JSON.stringify(process.env.SOCKET_PORT)
        }),
    ],
};
// console.log(process.env);
