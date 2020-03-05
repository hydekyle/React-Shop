const controller = require("./controller")
import * as express from 'express'
const router = express.Router()
const regOnlyCharsAndNumbers = new RegExp('[^A-z|0-9]')

router.get("/users", (req, res) => {
    const name = req.query["name"]
    if (name !== undefined && !regOnlyCharsAndNumbers.test(name)) {
        controller.get_user(name)
            .then(val => res.send(val))
    } else {
        res.send("Please, provide a valid username")
    }
})

router.get("/", (req, res) => {
    controller.get_my_advice()
        .then(val => res.send(val))
})

module.exports = router

export {}