
### module.exports和exports
下面的代码是lib.js被webpack打包完成后生成的，可以看到webapck提供了一个__webpack_require__方法，这个方法里调用了lib.js这个模块同时传入了module，和exports，其实exports就是module.exports（module.exports === exports）,但是我们在lib.js末尾重新赋值了module.exports从而导致module.exports和最初传入的exports指向发生了变化
```javascript
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = (
{

"./lib.js": ((module, exports) => {
    exports.hello = 'hello';
    exports.add = function(a, b) {
        return a + b;
    }

    exports.geekbang = { hello: 'world' }

    module.exports = function() {
        return 'single';
    }
})

}
);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!******************!*\
  !*** ./index.js ***!
  \******************/
const lib = __webpack_require__("./lib.js");
console.log('index', lib);
})();

/******/ })()
;
```

### 什么是nodeJS
1. 包含chrome V8引擎的js运行环境
2. 