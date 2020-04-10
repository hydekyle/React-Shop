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

//Twitter Bot
const config = {
  countries_filter: ["us", "usa", "united states", "new york", "america"],
  countryFilter: false,
  paid_link: "https://youtu.be/Rd2m3-gJ1zU",
  replyTweet: true, //Careful spam
  followTweetOwner: false,
  muteAfterFollow: false,
  showTweet: true,
  followIntervalMinutes: 1,
  replyIntervalMinutes: 1
}

const tweets_filter = "#sub4sub"
const getReplyText = receiverName => {
  return `@${receiverName} Free and fast! ${config.paid_link}`
}

const GetKeys = () => {
  let result;
  switch (process.argv[2]) {
    case "hyde": result = require("./twitter-config").hyde; break
    case "asko": result = require("./twitter-config").asko; break
    default: result = require("./twitter-config").bot
  }
  return result
}

const twitter_keys = GetKeys()
let twitter: Twitter = new Twitter(twitter_keys)
let counter_accounts = 0
let saved_accounts: Array<TweetData> = []

interface TweetData {
  screen_name: string,
  tweetID: number
}

twitter.stream("statuses/filter", { track: tweets_filter }, stream => {

  stream.on("data", tweet => {
    if (checkCountry(tweet)) handleIncomingTweet(tweet)
  })

  stream.on("error", error => {
    console.warn(error)
  })

})

const handleIncomingTweet = tweet => {
  if (config.showTweet) showTweet(tweet)
  saveLastTweet({
    screen_name: tweet.user.screen_name,
    tweetID: tweet.id_str
  })
}

const checkCountry = tweet => {
  if (!config.countryFilter) return true
  if (!!!tweet.user.location) {
    //console.log("Skipping tweet with unspecified location")
    return false
  }
  let countries = tweet.user.location.split(",")
  for (let country of countries)
    for (let filter of config.countries_filter)
      if (filter == country.trim().toLowerCase()) return true
  return false
}

const showTweet = tweet => {
  console.log(tweet.text)
  if (tweet.user.location) console.log(`lang: ${tweet.lang} | county_code: ${tweet.user.location}`)
}

const toMute = screenName => {
  twitter.post("mutes/users/create", { screen_name: screenName }, (error, response) => {
    if (error) console.warn(error)
    else console.log(`Added & Muted: ${screenName}`)
  })
}

const toReply = (tweetData: TweetData) => {
  let replyText = getReplyText(tweetData.screen_name)
  twitter.post("statuses/update", { status: replyText, in_reply_to_status_id: tweetData.tweetID }, (error, response) => {
    if (!error) console.log("He respondido a " + tweetData.screen_name)
    else console.warn(error)
  })
}

const toFollow = (tweetData: TweetData) => {
  twitter.post("friendships/create", { screen_name: tweetData.screen_name }, (error, response) => {
    if (error) console.warn(error)
    else if (config.muteAfterFollow) toMute(tweetData.screen_name)
  })
}

const saveLastTweet = (tweetData: TweetData) => {
  saved_accounts.push(tweetData)
}

let followLastSaved = () => {
  if (saved_accounts.length > 0) {
    toFollow(saved_accounts.pop())
    counter_accounts++
    console.log(`Saved: ${saved_accounts.length} | Followed: ${counter_accounts}`)
  }
}

let replyLastSaved = () => {
  if (saved_accounts.length > 0) {
    toReply(saved_accounts.pop())
    counter_accounts++
    console.log(`Replies: ${saved_accounts.length}`)
  }
}

const start = () => {
  if (config.replyTweet) {
    setInterval(() => {
      replyLastSaved()
    }, 60000 * config.followIntervalMinutes)
  }
  if (config.followTweetOwner) {
    setInterval(() => {
      followLastSaved()
    }, 60000 * config.followIntervalMinutes)
  }
}

app.listen(PORT, () => {
  console.log(`Ready on port ${PORT}!`)
  console.log(`Starting ${twitter_keys.consumer_key}. Fetching data now.`)
  start()
})

