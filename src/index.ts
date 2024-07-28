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

/**
 * Serialize a form and return a plain object.
 * If a form control with the same name appears more than once, the
 * property will be converted to an array.
 */
export function parseForm (form:HTMLFormElement):Record<string, unknown> {
    const formData = new FormData(form)
    const object:Record<string, unknown> = {}

    formData.forEach((value, key) => {
        if (Reflect.has(object, key)) {
            const entry = object[key]
            if (Array.isArray(entry)) {
                entry.push(value)
            } else {
                object[key] = [object[key], value]
            }
        } else {
            object[key] = value
        }
    })

    return object
}

/**
 * Return a new object of key value pairs given an array of attributes.
 *
 * @param attrs An array of attributes
 * @returns {Record<string, string|true>} An object of key value pairs, or
 * key -> true for boolean attributes
 */
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
    attributesAsObject,
    setAttributes
}

export function setAttributes (el:HTMLElement, attrs:Record<string, string|boolean>) {
    for (const key in attrs) {
        const val = attrs[key]
        if (val === false) {
            el.removeAttribute(key)
        } else {
            el.setAttribute(key, (val === true ? '' : val))
        }
    }
}
