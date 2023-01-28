const fs = require('fs');
const path = require('path');
const { runLoaders } = require('loader-runner');

runLoaders({
    resource: path.join(__dirname, '../src/imgs/1.jpeg'),
    loaders: [
        {
            loader: path.join(__dirname, '../loaders/watermark.js'),
            options: {
                watermarkPath: path.join(__dirname, '../static/water.jpeg'),
            }
        }
    ],
    readResource: fs.readFile.bind(fs),
}, (err, result) => {
    err ? console.error(err): console.log(result);
});