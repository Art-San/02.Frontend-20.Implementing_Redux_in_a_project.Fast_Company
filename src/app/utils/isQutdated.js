// создали professions slice
function isDutdated(date) {
    if (Date.now() - date > 10 * 60 * 1000) {
        return true
    }
    return false
}

export default isDutdated
