const myApi = require("../apis")

export const get_my_advice = async function() {
    const data = await myApi.get_advice()
    return data
}

export const get_user = async (name : String) => {
    let data = await myApi.get_user(name)
    if (!data) data = "Usuario no encontrado"
    return data
}
