export const isEmailValid = function isEmailValid (maybeEmail:string):boolean {
    return (
        maybeEmail.split('@').filter(Boolean).length > 1 &&
        maybeEmail.split('.').filter(Boolean).length > 1
    )
}
