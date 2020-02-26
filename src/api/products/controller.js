const apis = require("../apis")

const get_data = async _ => {
    const data = await apis.get_advice()
    console.log(data)
    return data
}

module.exports = {
    get_data
}
