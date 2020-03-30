import * as Twitter from "twitter"

const products_router = require("./api/products/index")
const express = require("express")
const morgan = require("morgan")
const compression = require("compression")
const cors = require("cors")

const app = express()
const corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions))
app.use(express.json())
app.use(morgan("combined"))
app.use(compression())

app.use("/db", products_router)

//Twitter Bot
const config = require("./twitter-config")
let twitter: Twitter = new Twitter(config)

app.get("/twita", (req, res) => {
  console.log("Working " + twitter.VERSION)
  twitter.post("statuses/update", { status: "Im not a bot" }, (error, tweet, response) => {
    if (error) res.send(error)
    console.log(tweet)
    console.log(response)
  })
})

app.listen(8080, () => console.log("Ready on port 8080!"))