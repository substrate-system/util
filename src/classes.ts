export const classes = function (...classNames:string[]) {
    return classNames.filter(Boolean).join(' ')
}
