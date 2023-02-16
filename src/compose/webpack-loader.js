// webpack loader
function loaderA(source) {
    console.log('loaderA');
    return `module.exports=function() {${source}}`;
}

function loaderB(source) {
    console.log('loaderB');
    return `use strict; ${source}`;
}

const webpackLoaders = [loaderA, loaderB];
function webpackCompose(loaders) {
    return loaders.reduce((a, b) => (args) => a(b(args)));
}

function runLoader(loader) {
    return loader('hellow');
}

console.log(runLoader(webpackCompose(webpackLoaders)));
