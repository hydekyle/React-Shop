const controller = require("./controller")
const express = require("express")
const router = express.Router()

router.get("/test", (req, res) => {
    controller.hydeTest()
        .then(val => res.send(val))
})

router.get("/", (req, res) => {
    controller.get_my_advice()
        .then(val => res.send(val))
})

module.exports = router

export {}