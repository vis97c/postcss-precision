const postcss = require('postcss');

module.exports = postcss.plugin('postcss-precision', options => {
    options = options || {}
    options.units = options.units || '%|em|px|rem'
    options.precision = options.precision || 3
    
    const isFloat = new RegExp(`([-+]?\\d*\\.\\d{${options.precision},})`, 'gi')
    const precision = Math.pow(10, options.precision)
    return function (css) {
        css.walkRules(function (rule) {
            rule.walkDecls(function (decl, i) {
                if (decl.value) {
                    let value = decl.value
                    let matches
                    while ((matches = isFloat.exec(decl.value)) !== null) {
                        const rounded = Math.round(parseFloat(matches[1]) * precision) / precision
                        value = value.replace(matches[1], rounded.toString())
                    }
                    decl.value = value
                }
            })
        })
    }
})