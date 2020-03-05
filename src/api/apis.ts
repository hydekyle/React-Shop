import * as mongoose from 'mongoose'
const fetch = require("node-fetch")
const api_url = "https://api.adviceslip.com/advice"
const mongo_url = "mongodb+srv://hydekyle:!234@cluster0-ukib1.mongodb.net/test?retryWrites=true&w=majority"
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    name: {type: String, required: true, max: 100},
    price: {type: Number, required: true}
})

export const get_advice = async function() {
    const response = await fetch(api_url)
    const json = await response.json()
    return json
}

export const get_user = async (name : String) => {
    console.log(`Hola ${name}`)
    await mongoose.connect(
        mongo_url, 
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    const result = await mongoose.connection
        .collection('products')
        .findOne({name: name})
    return result
}

