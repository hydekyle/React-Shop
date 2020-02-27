const apiURL = "https://api.adviceslip.com/advice"
const fetch = require("node-fetch")

const get_advice = async function() {
    const response = await fetch(apiURL)
    const json = await response.json()
    return json
}

module.exports = {
    get_advice
}
