const apiURL = "https://api.adviceslip.com/advice"
const fetch = require("node-fetch")

const get_advice = async function() {
    const response = await fetch(apiURL)
    const json = await response.json()
    return json
}

function fetchRandomAdvice() {
    return new Promise(
        (resolve, reject) => {
            fetch(apiURL)
                .then(res => res.json())
                    .then(
                        (result) => {
                            resolve(result.slip.advice)
                        },
                        (error) => {
                            reject(`¡ApiError ${error}!`)
                        }
                    )
        }
    )
}

module.exports = {
    fetchRandomAdvice,
    get_advice
}
