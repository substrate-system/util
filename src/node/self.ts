(function () {
    // @ts-expect-error -- dom vs node
    if (typeof self === 'undefined' && typeof global === 'object') {
        global.self = global
    }
})()
