import * as Twitter from "twitter"

const PORT = 8080

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
const config = {
  muteAfterFollow: true,
  lookForFollowers: true
}
const twitter_keys = require("./twitter-config")
let twitter: Twitter = new Twitter(twitter_keys)

twitter.stream("statuses/filter", { track: "#sub4sub" }, stream => {

  stream.on("data", tweet => {
    if (config.lookForFollowers) toFollow(tweet)
  })

  stream.on("error", error => {
    console.warn(error)
  })

})

app.listen(PORT, () => console.log(`Ready on port ${PORT}!`))

const toFollow = tweet => {
  twitter.post("friendships/create", { screen_name: tweet.user.screen_name }, (error, response) => {
    if (error) console.warn(error)
    else if (config.muteAfterFollow) toMute(tweet)
  })
}

const toMute = tweet => {
  twitter.post("mutes/users/create", { screen_name: tweet.user.screen_name }, (error, response) => {
    if (error) console.warn(error)
    else console.log(`Muted and Added: ${tweet.user.screen_name}`)
  })
}