const myApi = require("../apis")

const get_my_advice = async function() {
    const data = await myApi.get_advice()
    return data
}

const hydeTest = async function() {
    const data = await myApi.get_user("HydeTest")
    return data
}

module.exports = {
    get_my_advice,
    hydeTest
}

export {}
