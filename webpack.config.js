const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const threadLoader = require('thread-loader');

threadLoader.warmup(
    {},
    [
        'babel-loader',
    ]
);

module.exports = {
    entry: {
        index: './src/index.tsx',
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Learn React: Expandable List - Lewin",
            template: "./src/index.html"
        }),
    ],
    mode: "production",
    // devtool: "inline-source-map",
    module: {
        rules: [
            // {
            //     test: /\.css$/,
            //     use: ['style-loader', 'css-loader']
            // },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource",
            },
            {
                test: /\.(js|jsx|ts|tsx)$/,
                include: path.resolve('src'),
                use: [
                    'thread-loader',
                    {
                        loader: "babel-loader",
                        options: {presets: ["@babel/env", "@babel/preset-react", "@babel/preset-typescript"]}
                    }
                ],
            },
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    optimization: {
        runtimeChunk: "single",
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                },
            },
        },
    },
    performance: {
        maxEntrypointSize: 1024 * 1024,
        maxAssetSize: 1021 * 1024,
    },
    externals: {
        "axios": "axios",
        "react": "React",
        "react-dom": "ReactDOM",
    }
};
