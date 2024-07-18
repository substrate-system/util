/**
 * Get attributes from an HTMLElement, and return them as a string
 * like `key=val`.
 * @param {HTMLElement} el The element to get attributes from
 * @returns {string} The attributes as a string of `key=val`
 */
export function attributesToString (el:HTMLElement):string {
    return Array.from(el.attributes)
        .filter(attr => !attr.name.includes('display-name'))
        .map(attr => attr.name + (attr.value === '' ? '' : '=' +
            `"${attr.value}"`))
        .join(' ')
}

export default {
    attributesToString
}
