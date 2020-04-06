import * as Twitter from "twitter"

const PORT = process.argv[3] ? process.argv[3] : 8080

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

for (var pinga of process.argv) {
  console.log(pinga)
}

//Twitter Bot
const config = {
  muteAfterFollow: true,
  lookForFollowers: true,
  showTweet: false
}

let GetKeys = () => {
  return process.argv[2] == "hyde" ?
    require("./twitter-config").hyde :
    require("./twitter-config").bot
}
const intervalMinutes = 5 //Dejar en 5 minutos o Twitter se cabrea
const twitter_keys = GetKeys()
let twitter: Twitter = new Twitter(twitter_keys)
const tweets_filter = "#sub4sub"
let counter_accounts = 0
let saved_accounts: Array<string> = []

let saveAccount = accountScreenName => {
  saved_accounts.push(accountScreenName)
}

twitter.stream("statuses/filter", { track: tweets_filter }, stream => {

  stream.on("data", tweet => {
    if (config.showTweet) console.log(tweet.text)
    if (config.lookForFollowers) saveAccount(tweet.user.screen_name)
  })

  stream.on("error", error => {
    console.warn(error)
  })

})

const toFollow = screenName => {
  twitter.post("friendships/create", { screen_name: screenName }, (error, response) => {
    if (error) console.warn(error)
    else if (config.muteAfterFollow) toMute(screenName)
  })
}

const toMute = screenName => {
  twitter.post("mutes/users/create", { screen_name: screenName }, (error, response) => {
    if (error) console.warn(error)
    else console.log(`Added & Muted: ${screenName}`)
  })
}

const toGetLastFollowers = maxNumber => {
  twitter.get("followers/list", { count: maxNumber, skip_status: true }, (error, response) => {
    if (error) console.warn(error)
    else {
      console.log(response.users)
    }
  })
}

app.listen(PORT, () => {
  console.log(`Ready on port ${PORT}!`)
  console.log(`Starting ${twitter_keys.consumer_key}. Fetching data now.`)
  setInterval(() => {
    followLastFollower()
  }, 60000 * intervalMinutes)
})

let followLastFollower = () => {
  if (saved_accounts.length > 0) {
    toFollow(saved_accounts.pop())
    counter_accounts++
  }
  console.log(`Saved: ${saved_accounts.length} | Followed: ${counter_accounts}`)
}