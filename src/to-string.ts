/**
 * Transform an object into an HTML attributes string. The object should be
 * like `{ attributeName: value }`.
 *
 * @param attrs An object for the attributes.
 * @returns {string} A string suitable for use as HTML attributes.
 */
export function attributes (
    attrs:Record<string, string|(boolean|string|number)[]>
):string {
    return Object.keys(attrs).reduce((acc, k) => {
        const value = attrs[k]
        if (typeof value === 'boolean') {
            if (value) return (acc + ` ${k}`).trim()
            return acc
        }

        if (Array.isArray(value)) {
            return (acc + ` ${k}="${value.join(' ')}"`)
        }

        return (acc + ` ${k}="${value}"`).trim()
    }, '')
}
