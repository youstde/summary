const postcss = require('postcss');

const defaultOptions = {
    funcName: 'luyi',
    groups: {},
    colors: {},
    darkThemeSelector: 'html[data-theme="dark"]'
}

const resolveColor = (options, theme, group, match) => {
    const [lightColor, darkColor] = options.groups[group] || [];
    const color = theme === 'dark'? darkColor: lightColor;
    if(!color) {
        return match
    }
    return color || match;
}

// module.exports = postcss.plugin('postcss-theme-plugin', (options) => {
//     options = Object.assign({}, defaultOptions, options);
//     const testGroup = new RegExp(`\\b${options.funcName}\\(([^)]+)\\)`, 'g');

//     const getValue = (value, theme) => {
//         // luyi(cb)  cb
//         return value.replace(testGroup, (match, group) => {
//             return resolveColor(options, theme, group, match)
//         })
//     }

//     return (style, result) => {
//         style.walkDecls(decl => {
//             console.log('decl', decl.prop, decl.value)
//             const value = decl.value;
//             if (!value || !testGroup.test(value)) {
//                 // 没有色值，直接退出。
//                 return;
//             };

//             const lightValue = getValue(value, 'light'); // #000
//             const darkValue = getValue(value, 'dark');// #FFF
//             console.log('======>', value);
//             const lightDecl = decl.clone({ value: lightValue });
//             decl.replaceWith(lightDecl);
//         });
//     }
// });


module.exports = (options = {}) => {
    options = Object.assign({}, defaultOptions, options);
    const testGroup = new RegExp(`\\b${options.funcName}\\(([^)]+)\\)`, 'g');
    const getValue = (value, theme) => {
        // luyi(cb)  cb
        return value.replace(testGroup, (match, group) => {
            return resolveColor(options, theme, group, match)
        })
    }
    return {
        postcssPlugin: 'postcss-theme-plugin',
        Declaration(decl) {
            const value = decl.value;
            console.log('decl', decl.prop, decl.value);
            if (!value || !testGroup.test(value)) {
                // 没有色值，直接退出。
                return;
            };
            const lightValue = getValue(value, 'light'); // #000
            decl.value = lightValue;
        }
    }
}

// module.exports.postcss = true;