const simplify = string => {
    string = string.toLowerCase()
    string = string.replace(/\s/g, '')

    return string
}

export default simplify