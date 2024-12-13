(function () {
    if (typeof self === 'undefined' && typeof global === 'object') {
        // @ts-expect-error node vs browser
        global.self = global
    }
})()
