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
const config = {
  muteAfterFollow: true
}
const twitter_keys = require("./twitter-config")
let twitter: Twitter = new Twitter(twitter_keys)

twitter.stream("statuses/filter", { track: "#sub4sub" }, stream => {

  stream.on("data", tweet => {

    twitter.post("friendships/create", { screen_name: tweet.user.screen_name }, (error, response) => {
      if (error) console.log(error)
      if (!error && config.muteAfterFollow) { //Mute After Follow
        twitter.post("mutes/users/create", { screen_name: tweet.user.screen_name }, (error, response) => {
          if (error) console.log(error)
          else console.log(`Se ha agregado a ${tweet.user.screen_name}`)
        })
      }
    })

  })

  stream.on("error", error => {
    console.log(error)
  })

})

app.listen(8080, () => console.log("Ready on port 8080!"))