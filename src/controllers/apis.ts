let apiURL : RequestInfo = "https://api.adviceslip.com/advice"


export class MyApi {
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

export default MyApi

// fetch("https://api.adviceslip.com/advice")
//             .then(res => res.json())
//             .catch(err => console.log(err))
//             .then(
//                 (result) => {
//                     console.log(result)
//                     this.setState({
//                         description: result.slip.advice
//                     })
//                 },
//                 (err) => {
//                     console.log(`¡¡Error: ${err} !!`)
//                 }
//             )
