const { colors } = require('./colors');

module.exports = function(source) {
    const regx = /\%antdTheme\%/;
    return source.replace(regx, colors.antdTheme);
}