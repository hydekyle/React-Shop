const userURL = "http://localhost:8080/users"

export const get_user = async user => {
    const data = await fetch(userURL)
    const json = await data.json()
    return json
}