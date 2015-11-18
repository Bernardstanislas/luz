const path = require('path');
const fs = require('fs');
const webpack = require('webpack');


const nodeModules = {};
fs.readdirSync('node_modules')
.filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
})
.forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
});

module.exports = {
    entry: './src/index.js',
    target: 'node',
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'server.js'
    },
    externals: nodeModules,
    plugins: [
        new webpack.IgnorePlugin(/renderkid/),
    ],
    module: {
        loaders: [
            {
                test: /.js$/,
                loaders: ['babel'],
                include: [
                    path.resolve(__dirname, './src')
                ]
            }
        ]
    }
};
