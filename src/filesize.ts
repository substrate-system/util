/**
 * Format bytes as human-readable text.
 *
 * @see {@link https://stackoverflow.com/questions/10420352/converting-file-size-in-bytes-to-human-readable-string#answer-14919494 stackoverflow}
 *
 * @param {number} bytes Number of bytes.
 * @param {boolean} si True to use metric (SI) units, aka powers of 1000. False
 *                     to use binary (IEC), aka powers of 1024.
 * @param {number} dp Number of decimal places to display.
 *
 * @return {string} Formatted string.
 */
export function humanFilesize (
    bytes:number,
    si:boolean = false,
    dp:number = 1
):string {
    const thresh = si ? 1000 : 1024

    if (Math.abs(bytes) < thresh) {
        return bytes + ' B'
    }

    const units = si
        ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']
    let u = -1
    const r = 10 ** dp

    while (
        Math.round(Math.abs(bytes) * r) / r >= thresh &&
        u < units.length - 1
    ) {
        bytes /= thresh
        ++u
    }

    return bytes.toFixed(dp) + ' ' + units[u]
}

export default humanFilesize
