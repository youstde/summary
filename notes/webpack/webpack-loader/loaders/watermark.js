const path = require('path');
const loaderUtils = require('loader-utils');
const images = require('images');

module.exports = function(content) {
    const { watermarkPath = '' } = loaderUtils.getOptions(this);
    const context = this.context || this.rootContext;
    const url = loaderUtils.interpolateName(this, "[path][name].[ext]", {
        content,
        context
    });
    console.log('this.rootContext', this.rootContext);
    const file = images(path.join(this.context, url))
        .draw(images(watermarkPath, 10, 10))
        .encode(path.extname(url) || 'png');
    this.emitFile(url, file);
    console.log('111', this.context);
    const publicPath = `__webpack_public_path__ + ${JSON.stringify(url)}`;
    return `module.exports = ${publicPath};`;
}