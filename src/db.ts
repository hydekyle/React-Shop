import express = require("express")
const PORT = process.argv[3] ? process.argv[3] : 8080

const path = require("path")
const morgan = require("morgan")
const compression = require("compression")

const app = express()
const php = require("php")

app.use(express.json())
app.use(morgan("combined"))
app.use(compression())

app.set("views", path.join(__dirname, "templates"))
app.set("view engine", "php")
app.engine("php", php.__express)

// app.get('/:id', (req, res) => {
//     let params = req.params
//     console.log(`Hola ${params.id}`)
//     res.send("Soy tus datos papi ")
// })

app.get("/data", (req, res) => {
    res.render('testing.php', {
        hello: 'pinga'
    })
})

app.listen(PORT, () => {
    console.log(`Ready on port ${PORT}!`)
})