/**
 * Get attributes from an HTMLElement, and return them as a string
 * like `key=val`.
 * @param {Attr[]} attrs An array of the attributes
 * @returns {string} The attributes as a string like `key=val`
 */
export function attributesToString (attrs:Attr[]):string {
    return attrs.map(attr => attr.name + (attr.value === '' ?
        '' :
        `="${attr.value}"`))
        .join(' ')
}

export function attributesAsObject (attrs:Attr[]):Record<string, string|true> {
    return attrs.reduce((acc, attr) => {
        acc[attr.name] = attr.value || true
        return acc
    }, {})
}

export function objectToString (obj:Record<string, string|true>):string {
    return Object.keys(obj).map(k => {
        return k + (obj[k] === true ? '' : `="${obj[k]}"`)
    }).join(' ')
}

export default {
    attributesToString,
    attributesAsObject
}
