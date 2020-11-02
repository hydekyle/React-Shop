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

//#region Twitter bot
let filtered_users: Array<string> = []
let saved_accounts: Array<TweetData> = []
let followers_ids: Array<number> = []

interface TweetData {
  userID: number
  screen_name: string,
  tweetID: number
}

const config = {
  tweets_filter: "follow4follow",

  paid_link: "https://mistery.games/free-spotify-US",

  showTweet: false,

  countries_filter: ["us", "usa", "united states", "new york", "america"],
  countryFilter: false,

  replyTweet: false, //Careful spam

  dontRepeatSameUser: true,

  followTweetOwner: true,
  muteAfterFollow: true,

  followIntervalMinutes: 4,
  replyIntervalMinutes: 1, //Askito: 1
}

let bot_name = "hyde"
const getKeys = () => {
  let result;
  switch (process.argv[2]) {
    case "hyde": result = require("./twitter-config").hyde; bot_name = "hyde"; break
    case "asko": result = require("./twitter-config").asko; bot_name = "asko"; break
    default: result = require("./twitter-config").hyde
  }
  return result
}

const twitter_keys = getKeys()
let twitter: Twitter = new Twitter(twitter_keys)

const getReplyText = (tweetData: TweetData) => {
  let tweet_text = bot_name === "hyde" ? getRandomInsult(tweetData.userID) : getRandomOffer()
  return `@${tweetData.screen_name} ${tweet_text}`
}

const getRandomOffer = () => {
  let phrase: string = "";
  switch (_.random(0, 5)) {
    case 1: phrase = `You can have Spotify Premium for free for one year just taking this survey!`; break
    case 2: phrase = `Hey! We are giving Spotify Premium for free by just taking a survey.`; break
    case 3: phrase = `We are giving Spotify Premium!`; break
    default: phrase = `Hey! We are giving Spotify Premium for free by just taking a survey.`; break
  }
  return phrase + ` ${config.paid_link}`
}

const getRandomPambi = () => {
  let pambi: string = ""
  switch (_.random(8, 14)) {
    case 1: pambi = "pambisimio"; break
    case 2: pambi = "pambiretrasado"; break
    case 3: pambi = "pambidiota"; break
    case 4: pambi = "pambishit"; break
    case 5: pambi = "pambipenoso"; break
    case 6: pambi = "pambisidoso"; break
    case 7: pambi = "pambicanceroso"; break
    case 8: pambi = "pambibasura"; break
    case 9: pambi = "pambiaskeroso"; break
    case 10: pambi = "pambitotufo"; break
    case 11: pambi = "pambitotufo"; break
    case 12: pambi = "pambiculiao"; break
    case 13: pambi = "pambiputoso"; break
    default: pambi = "pambisito"
  }
  return pambi
}

const getRandomInsult = (userID: number) => {
  if (checkIfFollower(userID)) return "Mis pambifollowers tienen mis respetos."
  let phrase: string = ""
  const pambiInsult = getRandomPambi()
  switch (_.random(18, 25)) {
    case 1: phrase = `Si te hacen bullying en el cole tienes más papeletas para ser ${pambiInsult}.`; break
    case 2: phrase = `He llegado a la conclusión que a los ${pambiInsult}s les gusta que les insulten.`; break
    case 3: phrase = `A Dalas solo le apoyan niños sin amigos y cuentas fan penosas, planteate tú por qué.`; break
    case 4: phrase = `Ser o no ser ${pambiInsult}, he ahí la cuestión.`; break
    case 5: phrase = `Los ${pambiInsult}s me dan un poquito de askito.`; break
    case 6: phrase = `A los ${pambiInsult}s hay que echarles de comer a parte.`; break
    case 7: phrase = `¡Vamos ${pambiInsult}s, todos en manada a pagarle los juicios a Dalas para que tengáis más contenido tóxico!`; break
    case 8: phrase = `Los ${pambiInsult}s a veces me dan ganas de vomitar.`; break
    case 9: phrase = `Los ${pambiInsult}s me dan ganas de vomitar. MUUUUCHAS ganas de vomitar.`; break
    case 10: phrase = `Los ${pambiInsult}s son muy tristes, me dan un poquito de penita.`; break
    case 11: phrase = `¿Cuán triste tiene que ser la vida de un ${pambiInsult} para ser ${pambiInsult}?`; break
    case 12: phrase = `Dalas recibe acosito porque lo único que ha hecho él en su vida es acosar. Seguid bailandole el agüita, ${pambiInsult}s`; break
    case 13: phrase = `Los ${pambiInsult}s son casi peor que el coronavirus.`; break
    case 14: phrase = `Realmente prefiero tener coronavirus a ser ${pambiInsult}`; break
    case 15: phrase = `Dalas da asko, pero los ${pambiInsult}s dan x2 asko`; break
    case 16: phrase = `Dalas es basura tóxica y los ${pambiInsult}s han demostrado ser más de lo mismo.`; break
    case 17: phrase = `Los ${pambiInsult}s son pura eskoria tóxica. Lo he comprobado de primera mano.`; break
    case 18: phrase = `Los ${pambiInsult}s dan ganas de vomitar.`; break
    case 19: phrase = `A los ${pambiInsult}s habría que escupirles en un ojo. EN UN PUTO OJO.`; break
    case 20: phrase = `A los ${pambiInsult}s habría que mearles en la boca.`; break
    case 21: phrase = `Los ${pambiInsult}s le dan asko al cáncer.`; break
    case 22: phrase = `Los ${pambiInsult}s le dan asko al coronavirus.`; break
    default: phrase = `Los ${pambiInsult}s son basura y hay que recordarlo todos los días.`
  }
  return phrase
}

twitter.stream("statuses/filter", { track: config.tweets_filter }, stream => {

  stream.on("data", tweet => {
    handleIncomingTweet(tweet)
  })

  stream.on("error", error => {
    console.warn(error)
  })

})

const handleIncomingTweet = tweet => {
  if (config.showTweet) showTweet(tweet)
  if (!config.followTweetOwner) {
    if (!isNameWithPambi(tweet.user.name)) return
    if (!checkCountry(tweet)) return
  }
  saveLastTweet({
    userID: tweet.user.id,
    screen_name: tweet.user.screen_name,
    tweetID: tweet.id_str
  })
}

const isNameWithPambi = (name: string) => {
  return name.includes("🍞")
}

const checkCountry = tweet => {
  if (!config.countryFilter) return true
  if (!!!tweet.user.location) return false
  let countries = tweet.user.location.split(",")
  for (let country of countries)
    for (let filter of config.countries_filter)
      if (filter === country.trim().toLowerCase()) return true
  return false
}

const showTweet = tweet => {
  console.log(tweet.text)
  if (tweet.user.location) console.log(`lang: ${tweet.lang} | county_code: ${tweet.user.location}`)
}

const toMute = (screenName: String) => {
  twitter.post("mutes/users/create", { screen_name: screenName }, (error, response) => {
    if (error) console.warn(error)
    else console.log(`Added & Muted: ${screenName}`)
  })
}

let replyLastSaved = () => {
  if (saved_accounts.length > 0) {
    toReply(saved_accounts.pop())
    if (saved_accounts.length > 100) sliceSavedAccounts()
    console.log(`Replies awaiting: ${saved_accounts.length}`)
  }
}

const sliceSavedAccounts = () => {
  saved_accounts = saved_accounts.slice(saved_accounts.length / 2, saved_accounts.length)
  console.warn("Accounts sliced!")
}

const toReply = (tweetData: TweetData) => {
  for (let name of filtered_users) {
    if (name === tweetData.screen_name) {
      console.log("Evitando responder al mismo")
      replyLastSaved()
      return
    }
  }
  let replyText = getReplyText(tweetData)
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
    else {
      setTimeout(() => {
        checkForFollowBack(tweetData.userID)
      }, 60000 * 20);
      if (config.muteAfterFollow) toMute(tweetData.screen_name)
    }
  })
}

const checkForFollowBack = (followerID: number) => {
  twitter.get("followers/ids", {}, (error, response) => {
    if (error) {
      console.warn(error)
      return
    }
    followers_ids = response.ids

    if (!checkIfFollower(followerID)) {
      twitter.post("friendships/destroy", { user_id: followerID }, (errorF, responseF) => {
        if (errorF) {
          console.warn(errorF)
        } else {
          console.log("Waneado por no seguirme " + responseF.screen_name)
        }
      })
    }

  })
}

const saveLastTweet = (tweetData: TweetData) => {
  saved_accounts.push(tweetData)
}

let followLastSaved = () => {
  if (saved_accounts.length > 0) {
    toFollow(saved_accounts.pop())
    console.log(`${saved_accounts.length} accounts left.`)
  }
}

const saveMyFollowers = () => {
  twitter.get("followers/ids", {}, (error, response) => {
    if (error) {
      console.warn(error)
      return
    }
    followers_ids = response.ids
  })
}

const checkIfFollower = (id: number) => {
  for (let followerID of followers_ids)
    if (followerID === id) return true
  return false
}

const start = () => {
  saveMyFollowers()
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

//#endregion

app.listen(PORT, () => {
  console.log(`Ready on port ${PORT}!`)
  console.log(`Starting ${twitter_keys.consumer_key} (${bot_name}). Listening for tweets...`)
  start()
})

