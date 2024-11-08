const path = require("path");

module.exports = {
    entry: "./src/index.ts",
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, "dist"),
        library: "Gantt", // 导出到全局对象上的名称
        libraryTarget: "umd" // 兼容多种模块格式（UMD格式适用于浏览器）
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    mode: "development",
    watch: true
};