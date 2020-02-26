const apiURL = "https://api.adviceslip.com/advice"
const fetch = require("node-fetch");

function test() {
    return "test"
}

const get_data = async apiURL => {
    try{
        const response = await fetch(apiURL)
        const json = await response.json()
        return json
    } catch (error) {
        return error
    }
}

function getRandomAdvice() {
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
    getRandomAdvice,
    test,
    get_data
}
