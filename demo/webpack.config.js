const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = (env, argv) => {
    return {
        entry: './demo/index.tsx',
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                // {
                //     test: /\.css$/i,
                //     use: ["style-loader", "css-loader", "postcss-loader"],
                // },
                {
                    test: /\.webp/,
                    type: 'asset/resource'
                }
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        devtool: 'inline-source-map',
        devServer: {
            static: './dist',
            port: 8084,
            open: true
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './demo/index.html',
            }),
        ],
        output: {
            filename: '[name].[contenthash].js',
            path: path.resolve(__dirname, 'dist'),
            clean: true,
        },
    };
};