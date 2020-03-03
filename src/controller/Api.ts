const userURL = "http://localhost:8080/db"

export const get_advice = async user => {
    const data = await fetch(userURL)
    const json = await data.json()
    return json
}