/**
 * Format a number as an English string.
 *
 * @param n The number
 * @returns An English string, like "One Billion".
 */
export function numberToString (n:number|null):string {
    if (n === null) return 'null'
    const formatter = new Intl.NumberFormat('en-US', {
        notation: 'compact',
        compactDisplay: 'long'
    })

    return formatter.format(n)
}
