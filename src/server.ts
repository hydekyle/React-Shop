import * as Twitter from "twitter"
import * as _ from "lodash"

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
const tweets_filter = "dalasreview"
let filtered_users: Array<string> = []
let counter_accounts = 0
let saved_accounts: Array<TweetData> = []

interface TweetData {
  screen_name: string,
  tweetID: number
}
const config = {
  paid_link: "",
  countries_filter: ["us", "usa", "united states", "new york", "america"],
  countryFilter: false,
  dontRepeatSameUser: true,
  followTweetOwner: false,
  muteAfterFollow: false,
  showTweet: true,
  followIntervalMinutes: 1,
  replyIntervalMinutes: 0.66, //Perfect fit for 300 tweets/3h API LIMIT
  replyTweet: true, //Careful spam
}

const getKeys = () => {
  let result;
  switch (process.argv[2]) {
    case "hyde": result = require("./twitter-config").hyde; break
    case "bot": result = require("./twitter-config").bot; break
    default: result = require("./twitter-config").asko
  }
  return result
}

const twitter_keys = getKeys()
let twitter: Twitter = new Twitter(twitter_keys)

const getReplyText = receiverName => {
  return `@${receiverName} ${getRandomInsult()}`
}

const getRandomPambi = () => {
  let pambi: string = ""
  switch (_.random(0, 9)) {
    case 1: pambi = "pambisimio"; break
    case 2: pambi = "pambiretrasado"; break
    case 3: pambi = "pambidiota"; break
    case 4: pambi = "pambimierder"; break
    case 5: pambi = "pambiaskeroso"; break
    case 6: pambi = "pambisidoso"; break
    case 7: pambi = "pambicanceroso"; break
    default: pambi = "pambisito"
  }
  return pambi
}

const getRandomInsult = () => {
  let phrase: string = ""
  const pambiInsult = getRandomPambi()
  switch (_.random(0, 15)) {
    case 1: phrase = `Si te hacen bulling en el cole tienes más papeletas para ser ${pambiInsult}.`; break
    case 2: phrase = `¡Vamos ${pambiInsult}s, todos en manada a pagarle los juicios a Dalas para que tengáis más contenido tóxico!`; break
    case 3: phrase = `A Dalas solo le apoyan niños sin amigos y cuentas fan penosas, planteate tú por qué.`; break
    case 4: phrase = `Debe ser duro ser ${pambiInsult}. Bullying en el cole, bullying en Twitter...`; break
    case 5: phrase = `A los ${pambiInsult}s hay que echarles de comer a parte.`; break
    case 6: phrase = `Qué asko me dan los ${pambiInsult}s`; break
    case 7: phrase = `He llegado a la conclusión que a los ${pambiInsult}s les gusta que les insulten.`; break
    case 8: phrase = `Los ${pambiInsult}s me dan ganas de vomitar.`; break
    case 9: phrase = `Los ${pambiInsult}s me dan ganas de vomitar. MUCHAS ganas de vomitar.`; break
    case 10: phrase = `Los ${pambiInsult}s son muy tristes, me dan mucha penita.`; break
    case 11: phrase = `¿Cuán triste tiene que ser la vida de un ${pambiInsult} para ser ${pambiInsult}?`; break
    case 12: phrase = `Dalas recibe acoso porque lo único que ha hecho él en su vida es acosar. Seguid bailandole el agua, ${pambiInsult}s`; break
    case 13: phrase = `Los ${pambiInsult}s son peor que el coronavirus.`; break
    case 14: phrase = `Prefiero tener coronavirus a ser ${pambiInsult}`; break
    default: phrase = `Dalas da mucho asko, pero los ${pambiInsult}s dan aún más askete.`
  }
  return phrase
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
  for (let name of filtered_users) {
    if (name == tweetData.screen_name) {
      console.log("Evitando responder al mismo")
      replyLastSaved()
      return
    }
  }
  let replyText = getReplyText(tweetData.screen_name)
  twitter.post("statuses/update", { status: replyText, in_reply_to_status_id: tweetData.tweetID }, (error, response) => {
    if (!error) {
      if (filtered_users.length > 100) resetFilteredUsers()
      filtered_users.push(tweetData.screen_name)
      console.log("He respondido a " + tweetData.screen_name)
    }
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
    }, 60000 * config.replyIntervalMinutes)
  }
  if (config.followTweetOwner) {
    setInterval(() => {
      followLastSaved()
    }, 60000 * config.followIntervalMinutes)
  }
}

const resetFilteredUsers = () => {
  filtered_users = []
}

app.listen(PORT, () => {
  console.log(`Ready on port ${PORT}!`)
  console.log(`Starting ${twitter_keys.consumer_key}. Fetching data now.`)
  start()
})

