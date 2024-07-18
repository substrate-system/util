/**
 * Get attributes from an HTMLElement, and return them as a string
 * like `key=val`.
 * @param {Attr[]} attrs An array of the attributes
 * @returns {string} The attributes as a string like `key=val`
 */
export function attributesToString (attrs:Attr[]):string {
    return attrs.map(attr => attr.name + (attr.value === '' ? '' : '=' +
        `"${attr.value}"`))
        .join(' ')
}

export default {
    attributesToString
}
