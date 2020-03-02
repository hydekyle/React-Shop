const myApi = require("../apis")

export const get_my_advice = async function() {
    const data = await myApi.get_advice()
    return data
}

export const get_db_test = async (name : String) => {
    const data = await myApi.get_mongo(name)
    return data
}
