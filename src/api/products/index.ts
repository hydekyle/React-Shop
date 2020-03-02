const controller = require("./controller")
import * as express from 'express'
const router = express.Router()

router.get("/test", (req, res) => {
    const name = req.query["name"]
    controller.get_db_test(name)
        .then(val => res.send(val))
})

router.get("/", (req, res) => {
    controller.get_my_advice()
        .then(val => res.send(val))
})

module.exports = router

export {}