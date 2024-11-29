module.exports = {
    plugins: [
        require('autoprefixer')({
            overrideBrowserslist: '> 1%, last 3 versions, not ie <= 9, chrome >= 14, safari >= 3, ios >= 8, android >= 4.0',
        }),
    ]
};