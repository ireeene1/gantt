const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        index: './src/index.ts'
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
        library: "Gantt", // 导出到全局对象上的名称
        libraryTarget: "umd" // 兼容多种模块格式（UMD格式适用于浏览器）
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            'utils': path.resolve(__dirname, 'src/utils'),
            'modules': path.resolve(__dirname, 'src/class/modules'),
            'types:': path.resolve(__dirname, 'src/types')
        },
        extensions: [ ".ts", ".js", ".scss" ],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },{
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2
                        }
                    },
                    'sass-loader',
                    'postcss-loader'
                ]
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'index.css'
        })
    ],
    mode: "development",
    watch: true
};