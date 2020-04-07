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
  showTweet: false,
  replyTweet: true,
  followTweetOwner: false,
  muteAfterFollow: true
}

const GetKeys = () => {
  return process.argv[2] == "hyde" ?
    require("./twitter-config").hyde :
    require("./twitter-config").bot
}

const intervalMinutes = 5 // Dejar en 5 minutos o Twitter se cabrea
const twitter_keys = GetKeys()
let twitter: Twitter = new Twitter(twitter_keys)
const tweets_filter = "#HydeWick"
let counter_accounts = 0
let saved_accounts: Array<string> = []

twitter.stream("statuses/filter", { track: tweets_filter }, stream => {

  stream.on("data", tweet => {
    if (config.showTweet) console.log(tweet.text)
    if (config.followTweetOwner) saveAccount(tweet.user.screen_name)
    if (config.replyTweet) toReply(tweet.id_str, tweet.user.screen_name)
  })

  stream.on("error", error => {
    console.warn(error)
  })

})

const toGetLastFollowers = maxNumber => {
  twitter.get("followers/list", { count: maxNumber, skip_status: true }, (error, response) => {
    if (error) console.warn(error)
    else {
      console.log(response.users)
    }
  })
}

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

const toReply = (tweetID: string, tweetOwnerName: string) => {
  console.log("Tweet Id: " + tweetID)
  let replyText = `@${tweetOwnerName} Hello! Greetings from Node~`
  twitter.post("statuses/update", { status: replyText, in_reply_to_status_id: tweetID }, (error, response) => {
    if (!error) console.log("He respondido a " + tweetOwnerName)
    else console.warn(error)
  })
}

const saveAccount = accountScreenName => {
  saved_accounts.push(accountScreenName)
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