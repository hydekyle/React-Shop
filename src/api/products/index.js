const controller = require("./controller")
const express = require("express")
const router = express.Router()

router.get("/test", (req, res) => {
    res.send(controller.test())
})

router.get("/", (req, res) => {
    controller.get_data()
        .then(val => res.send(val))
})

module.exports = router