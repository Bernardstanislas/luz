const exec = require('child_process').exec;

const server = exec('sh ./node_modules/.bin/nodemon ./build/server.js');
server.stdout.pipe(process.stdout);

const webpack = exec('node ./node_modules/webpack/bin/webpack.js --watch');
webpack.stdout.pipe(process.stdout);
