/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react'
import ButtonMulti from '../button-multi/ButtonMulti'
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption,
    Button,
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle,
} from 'reactstrap'
import GamesInfoJSON from '../../GamesInfo.json'
import 'bootstrap/dist/css/bootstrap.min.css';
import './GameDisplayer.css'

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
        var info: Array<GameInfo> = JSON.parse(json)["games"];
        return info
    }
}

export default () => {
    var games = SerializeHelper.GetGameInfo(JSON.stringify(GamesInfoJSON));

    const [activeGameIndex, setActiveGameIndex] = useState(0)
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    useEffect(() => {
        console.log("Nuevo index: " + activeGameIndex)
    }, [activeGameIndex])

    const previousGame = () => {
        const nextIndex = activeGameIndex === 0 ? games.length - 1 : activeGameIndex - 1;
        setActiveIndex(0);
        setActiveGameIndex(nextIndex);
    }

    const nextGame = () => {
        setActiveIndex(0);
        const nextIndex = activeGameIndex === games.length - 1 ? 0 : activeGameIndex + 1
        setActiveGameIndex(nextIndex)
    }

    const nextPhoto = () => {
        if (animating) return;
        const nextIndex = activeIndex === games[activeGameIndex].photos.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }

    const previousPhoto = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? games[activeGameIndex].photos.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    }

    const goToIndexPhoto = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
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
                <img src={item.src} alt={item.altText} className="img-fluid" />
                {/* <CarouselCaption captionText={item.caption} captionHeader={item.caption} /> */}
            </CarouselItem>
        );
    });

    return (
        <div className="main-content">
            <div className="head-info">
                <div className="btn-left">
                    <Button onClick={previousGame}>
                        <i className="fas fa-arrow-left"></i>
                    </Button>
                </div>
                <div>
                    <img src={games[activeGameIndex].iconURL} alt="" onClick={onIconClicked} className="icon" />
                </div>
                <div className="btn-right">
                    <Button onClick={nextGame}>
                        <i className="fas fa-arrow-right"></i>
                    </Button>
                </div>
            </div>
            <div className="title">
                <h1>{games[activeGameIndex].title}</h1>
            </div>
            <div className="page-description">
                <h2>{games[activeGameIndex].description}</h2>
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
                    <CarouselIndicators items={games[activeGameIndex].photos} activeIndex={activeIndex} onClickHandler={goToIndexPhoto} />
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