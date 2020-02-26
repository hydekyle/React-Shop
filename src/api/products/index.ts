const express = require("express")
const router = express.Router()

router.get("/test", (req, res) => {
    res.send("Hola test")
})

router.get("/", (req, res) => {
    res.send("Omg")
})

module.exports = router