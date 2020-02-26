let apiURL : RequestInfo = "https://api.adviceslip.com/advice"

export class Apis {
    static fetchRandomAdvice() : Promise<String> {
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
}

export default Apis
