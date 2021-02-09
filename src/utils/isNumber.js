export const isInteger = (variable) => {
    let num = typeof variable === 'string' ? +variable : variable
    if (isFinite(num) && !isNaN(num) && (num ^ 0) === num) {
        return true
    }
    return false
}
