import * as Twitter from "twitter"
import * as _ from "lodash"
import express = require('express')
const PORT = process.argv[3] ? process.argv[3] : 8080

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

//#region Twitter bot
let saved_accounts: Array<TweetData> = []

interface TweetData {
    userID: number,
    tweetID: number,
    followers: number,
    friends: number,
    favourites: number,
    tweetsCount: number,
    accountName: string,
    pictureURL: string,
    nickname: string,
    createdAt: string,
}

interface ServerResponse {
    statusCode: number,
    data: string
}

const config = {
    tweets_filter: "dalasreview",
    showTweet: true,
    dontRepeatSameUser: true,

    followIntervalMinutes: 2,
    replyIntervalMinutes: 1, //Askito: 1
}

const getKeys = () => {
    let result = require("./twitter-config").hyde;
    return result
}

const twitter_keys = getKeys()
let twitter: Twitter = new Twitter(twitter_keys)

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
    //if (!isNameWithPambi(tweet.user.name)) return
    saveLastTweet({
        userID: tweet.user.id,
        accountName: tweet.user.screen_name,
        tweetID: tweet.id_str,
        pictureURL: tweet.user.profile_image_url_https,
        friends: tweet.user.friends_count,
        followers: tweet.user.followers_count,
        favourites: tweet.user.favourites_count,
        createdAt: tweet.user.created_at,
        tweetsCount: tweet.user.statuses_count,
        nickname: tweet.user.name
    })
}

const showTweet = tweet => {
    console.log(tweet.text)
    if (tweet.user.location) console.log(`lang: ${tweet.lang} | county_code: ${tweet.user.location}`)
}

const isNameWithPambi = (name: string) => {
    return name.includes("🍞")
}

const saveLastTweet = (tweetData: TweetData) => {
    saved_accounts.push(tweetData)
}

//#endregion

app.get('/', (req, res) => {
    let response: ServerResponse = {
        statusCode: 0,
        data: JSON.stringify(saved_accounts[saved_accounts.length - 1])
    }
    res.send(JSON.stringify(response))
})

app.listen(PORT, () => {
    console.log(`Ready on port ${PORT}!`)
})