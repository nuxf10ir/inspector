const webpack = require('webpack');

module.exports = {
    context: __dirname,
    devtool: "source-map",
    entry: "./js/script.js",
    output: {
        path: __dirname + "/dist",
        filename: "bundle.js"
    }
};
