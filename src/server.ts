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
  setInterval(() => {
    checkInterval()
  }, 60000)
})

let checkInterval = () => {
  console.log(`Lets go im check ${saved_accounts.length}`)
  if (saved_accounts.length > counter_accounts) toFollow(saved_accounts[counter_accounts++])
}