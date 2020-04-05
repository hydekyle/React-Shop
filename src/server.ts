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
  lookForFollowers: true,
  showTweet: false
}
const twitter_keys = require("./twitter-config")
let twitter: Twitter = new Twitter(twitter_keys)
const tweets_filter = "#sub4sub"

twitter.stream("statuses/filter", { track: tweets_filter }, stream => {

  stream.on("data", tweet => {
    if (config.showTweet) console.log(tweet.text)
    if (config.lookForFollowers) toFollow(tweet)
  })

  stream.on("error", error => {
    console.warn(error)
  })

})

const toFollow = tweet => {
  twitter.post("friendships/create", { screen_name: tweet.user.screen_name }, (error, response) => {
    if (error) console.warn(error)
    else if (config.muteAfterFollow) toMute(tweet)
  })
}

const toMute = tweet => {
  twitter.post("mutes/users/create", { screen_name: tweet.user.screen_name }, (error, response) => {
    if (error) console.warn(error)
    else console.log(`Added & Muted: ${tweet.user.screen_name}`)
  })
}

const CheckFollowers = () => {
  twitter.get("followers/list", { count: 3, skip_status: true }, (error, response) => {
    if (error) console.warn(error)
    else {
      console.log(response.users)
    }
  })
}

app.listen(PORT, () => console.log(`Ready on port ${PORT}!`))