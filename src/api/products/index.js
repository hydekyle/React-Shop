const controller = require("./controller")
const express = require("express")
const router = express.Router()

router.get("/test", (req, res) => {
    res.send(controller.test())
})

router.get("/", (req, res) => {
    controller.getRandomAdvice()
        .then(val => res.send(val))
        .catch(err => res.send(err))
})

module.exports = router