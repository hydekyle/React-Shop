import React, { useState, useEffect } from 'react'
import db from "../../Firebase"
import {
    Carousel, CarouselItem, CarouselControl, CarouselIndicators,
    Button
} from 'reactstrap'
import GamesInfoJSON from '../../GamesInfo.json'
import 'bootstrap/dist/css/bootstrap.min.css'
import './GameDisplayer.css'

import SocketIO from "socket.io-client"
const ENDPOINT = "localhost:3000"

interface photo {
    src: string
    altText: string
}

interface GameInfo {
    photos: photo[]
    iconURL: string
    title: string
    description: string
    link: string
}

class SerializeHelper {

    static GetGameInfo(json: string): Array<GameInfo> {
        var info: Array<GameInfo> = JSON.parse(json)["games"]
        return info
    }
}

export default () => {
    var games = SerializeHelper.GetGameInfo(JSON.stringify(GamesInfoJSON))

    const [activeGameIndex, setActiveGameIndex] = useState(0)
    const [activeIndex, setActivePhotoIndex] = useState(0)
    const [animating, setAnimating] = useState(false)

    useEffect(() => {
        const socket = SocketIO(ENDPOINT)
        socket.on("FromAPI", data => {
            console.log(data)
        })
        socket.on("connect", () => {
            console.log("Socket connect")
        })
        socket.connect()

        db.collection("Users").onSnapshot(snapshot => {
            snapshot.docs.map(doc => console.log(doc.data()))
        })

        return () => {
            console.log("Unmount")
            socket.disconnect()
        }

    }, [])

    useEffect(() => {
        console.log("Nuevo index: " + activeGameIndex)
    }, [activeGameIndex])

    const previousGame = () => {
        setActivePhotoIndex(0)
        const nextIndex = activeGameIndex === 0 ? games.length - 1 : activeGameIndex - 1
        setActiveGame(nextIndex)
    }

    const nextGame = () => {
        setActivePhotoIndex(0)
        const nextIndex = activeGameIndex === games.length - 1 ? 0 : activeGameIndex + 1
        setActiveGame(nextIndex)
    }

    const setActiveGame = activeIndex => {
        var photoImage = new Image()
        photoImage.src = games[activeIndex].photos[0].src

        photoImage.onload = () => {

            var iconoImage = new Image()
            iconoImage.src = games[activeIndex].iconURL
            iconoImage.onload = () => {
                setActiveGameIndex(activeIndex)
            }

        }
    }

    const nextPhoto = () => {
        if (animating) return
        const nextIndex = activeIndex === games[activeGameIndex].photos.length - 1 ? 0 : activeIndex + 1
        setActivePhotoIndex(nextIndex)
    }

    const previousPhoto = () => {
        if (animating) return
        const nextIndex = activeIndex === 0 ? games[activeGameIndex].photos.length - 1 : activeIndex - 1
        setActivePhotoIndex(nextIndex)
    }

    const goToIndexPhoto = (newIndex) => {
        if (animating) return
        setActivePhotoIndex(newIndex)
    }

    const onIconClicked = () => {
        var win = window.open(games[activeGameIndex].link, "_blank")
        win?.focus()
    }

    const slides = games[activeGameIndex].photos.map((item) => {
        return (
            <CarouselItem
                className="carousel-item"
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
                key={item.src}
            >
                <img src={item.src} alt={item.altText} className="img-fluid"
                    onClick={() => {
                        let win = window.open(item.src)
                        win?.focus()
                    }}
                />
                {/* <CarouselCaption captionText={item.caption} captionHeader={item.caption} /> */}
            </CarouselItem>
        )
    })

    let gameSelected = games[activeGameIndex]

    return (
        <div className="main-content">
            <div className="head-info">
                <div className="btn-left">
                    <Button onClick={previousGame}>
                        <i className="fas fa-arrow-left"></i>
                    </Button>
                </div>
                <div>
                    <img src={gameSelected.iconURL} alt="" onClick={onIconClicked} className="icon" />
                </div>
                <div className="btn-right">
                    <Button onClick={nextGame}>
                        <i className="fas fa-arrow-right"></i>
                    </Button>
                </div>
            </div>
            <div className="title">
                <h1>{gameSelected.title}</h1>
            </div>
            <div className="page-description">
                <h2>{gameSelected.description}</h2>
            </div>
            <div className="carousel">
                <Carousel
                    activeIndex={activeIndex}
                    next={nextPhoto}
                    previous={previousPhoto}
                    pause={false}
                    ride="carousel"
                    interval="6660"
                    slide={false}
                    className="carousel-fade"
                >
                    <CarouselIndicators items={gameSelected.photos} activeIndex={activeIndex} onClickHandler={goToIndexPhoto} />
                    {slides}
                    <CarouselControl direction="prev" directionText="Previous" onClickHandler={previousPhoto} />
                    <CarouselControl direction="next" directionText="Next" onClickHandler={nextPhoto} />
                </Carousel>
            </div>
            <div className="page-details">
            </div>
        </div>
    )
}