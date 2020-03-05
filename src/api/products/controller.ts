const myApi = require("../apis")
const regOnlyCharsAndNumbers = new RegExp('[^A-z|0-9]')

export const get_my_advice = async function() {
    const data = await myApi.get_advice()
    return data
}

export const get_user = async (name : string) => {
    if (isValidName(name)) {
        let data = await myApi.get_user(name)
        if (!data) data = "Usuario no encontrado"
        return data
    } else {
        return "Please, provide a valid username"
    }
}

const isValidName = (name : string) => {
    return !regOnlyCharsAndNumbers.test(name)
}