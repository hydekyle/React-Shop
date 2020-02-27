const fetch = require("node-fetch")
const apiURL = "https://api.adviceslip.com/advice"

export const get_advice = async function() {
    const response = await fetch(apiURL)
    const json = await response.json()
    return json
}

export const get_user = async (user: string) => {
    return `Hola ${user}` 
}

