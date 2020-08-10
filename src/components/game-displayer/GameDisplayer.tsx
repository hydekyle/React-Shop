/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react'
import './GameDisplayer.css'
import ButtonMulti from '../button-multi/ButtonMulti'
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption
} from 'reactstrap'
import GamesInfoJSON from '../../GamesInfo.json'

interface photo {
    src: string
    altText: string
}

interface Props {
    photos: photo[]
    title: string
    description: string
    link: string
}

interface GameInfo {
    photos: photo[]
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
    var foo = SerializeHelper.GetGameInfo(JSON.stringify(GamesInfoJSON));
    console.warn(foo[0].title);

    const [props, setProps] = useState<Props>({
        photos: [
            {
                src: "https://i.ibb.co/2tMbWBC/15732668-1216018278480050-1964737736489139844-o.png",
                altText: ""
            },
            {
                src: "https://i.ibb.co/2tMbWBC/15732668-1216018278480050-1964737736489139844-o.png",
                altText: ""
            }
        ],
        title: "El MO",
        description: "Juegazo",
        link: "conchatumadre.com"
    })

    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === props.photos.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? props.photos.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    }

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    }

    const slides = props.photos.map((item) => {
        return (
            <CarouselItem
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
                key={item.src}
            >
                <img src={item.src} alt={item.altText} />
                {/* <CarouselCaption captionText={item.caption} captionHeader={item.caption} /> */}
            </CarouselItem>
        );
    });

    return (
        <div className="page">
            <div className="main-content">
                <div className="title">
                    <h1>{props.title}</h1>
                </div>
                <div className="page-description">
                    <h2>{props.description}</h2>
                </div>
                <div className="carousel">
                    <Carousel
                        activeIndex={activeIndex}
                        next={next}
                        previous={previous}
                        interval={false}
                        allowFullScreen={true}
                        allowTransparency={true}
                    >
                        <CarouselIndicators items={props.photos} activeIndex={activeIndex} onClickHandler={goToIndex} />
                        {slides}
                        <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
                        <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
                    </Carousel>
                </div>
                <div className="buttons">
                    <div className="btn-descargar">
                        <ButtonMulti
                            color="primary"
                            label="Download"
                            link={props.link}
                        ></ButtonMulti>
                    </div>
                </div>
                <div className="page-details">

                </div>
            </div>
        </div>
    )
}