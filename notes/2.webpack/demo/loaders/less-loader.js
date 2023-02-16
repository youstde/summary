const less = require('less');

module.exports = function lessLoader(source) {
    // 异步loader
    const callback = this.async();
    less.render(source, { sourceMap: {} }, function(err, res){
        const { css, map } = res;
        // console.log('css', css);
        callback(null, css, map);
    });
}