module.exports = function styleLoader(source, map) {
    const res = `
        var style = document.createElement('style');
        style.innerHTML = ${JSON.stringify(source)};
        document.head.appendChild(style);
    `;
    return res;
}