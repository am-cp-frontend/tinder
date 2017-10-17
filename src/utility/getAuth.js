const getCookie = name => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
    if (match) return match[2]
}

const getAuth = () => {
    const userCookie = getCookie('user')
    const error = getCookie('authError')
    const userData = userCookie ? JSON.parse(userCookie) : {}

    if(error || Object.keys(userData).length === 0) {
        return {
            ok: false,
            data: error
        }
    } else {
        return {
            ok: true,
            data: userData
        }
    }
}

module.exports = getAuth