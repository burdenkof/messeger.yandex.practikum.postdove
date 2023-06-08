const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].[contenthash].js',
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.json'],
        alias: {
            handlebars: 'handlebars/dist/handlebars.min.js',
        },
    },
    devServer: {
        compress: true,
        port: 3000,
        historyApiFallback: true,
        open: true,
        hot: true,
    },
    module: {
        rules: [
            
            {
                test: /\.([cm]?ts|tsx)$/,
                use: [
                    {
                      loader: 'ts-loader',
                      options: {
                        compilerOptions: {noEmit: false},
                      }
                    }
                  ],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
            { test: /\.png$/, type: 'asset' },
        ],
    },
    plugins: [
        require('autoprefixer'),
        new HtmlWebpackPlugin({
            template: './static/index.html',
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
    ],
    stats: {
        children: true,
    },
};