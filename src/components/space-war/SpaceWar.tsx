import React, { useState, useEffect } from 'react'

import './SpaceWar.css'
import {
    Button,
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption
} from 'reactstrap'

const title = "Space War Arcade"
const description = "Bullet Hell en el espacio"

const items = [
    {
        src: 'https://image.winudf.com/v2/image1/Y29tLkV0ZXJuYWxHYW1lcy5uYXZlc19zY3JlZW5femgtQ05fMF8xNTY3MDM5MjE0XzA5OQ/screen-0.jpg?h=355&fakeurl=1&type=.jpg',
        altText: '',
        caption: ''
    },
    {
        src: 'https://image.winudf.com/v2/image1/Y29tLkV0ZXJuYWxHYW1lcy5uYXZlc19zY3JlZW5femgtQ05fNV8xNTY3MDM5MjE3XzAwMA/screen-5.jpg?h=355&fakeurl=1&type=.jpg',
        altText: '',
        caption: ''
    },
    {
        src: 'https://image.winudf.com/v2/image1/Y29tLkV0ZXJuYWxHYW1lcy5uYXZlc19zY3JlZW5femgtQ05fMl8xNTY3MDM5MjE1XzAyMQ/screen-2.jpg?h=355&fakeurl=1&type=.jpg',
        altText: '',
        caption: ''
    }

]

export default (props) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    }

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    }

    const slides = items.map((item) => {
        return (
            <CarouselItem
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
                key={item.src}
            >
                <img src={item.src} alt={item.altText} />
                <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
            </CarouselItem>
        );
    });

    return (
        <div className="page-spacewar">
            <div className="main-content-spacewar">
                <div className="title-spacewar">
                    <h1>{title}</h1>
                </div>
                <div className="page-description-spacewar">
                    <h2>{description}</h2>
                </div>
                <div className="carousel-s">
                    <Carousel
                        activeIndex={activeIndex}
                        next={next}
                        previous={previous}
                        interval={false}
                        allowFullScreen={true}
                        allowTransparency={true}
                    >
                        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
                        {slides}
                        <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
                        <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
                    </Carousel>
                </div>
                <div className="buttons-spacewar">
                    <div className="btn-facebook-spacewar">
                        <Button
                            color="primary"
                            size="lg"
                            onClick={() => window.location.href = 'https://www.facebook.com/elmisteriodelaoscuridad'}
                        >Facebook
                    </Button>
                    </div>
                    <div className="btn-descargar-spacewar">
                        <Button
                            color="success"
                            size="lg"
                            onClick={() => window.location.href = 'https://www.mediafire.com/file/asewoixg030yv5a/El_Misterio_de_la_Oscuridad_Alfa_3.zip/file?fbclid=IwAR2FewApUSdsphV2qHwYRnZ3KEfubTvhEZitZEXeRFNN_Hd2GBfGOdRplb0'}
                        >Descargar
                    </Button>
                    </div>
                </div>
                <div className="page-details-spacewar">

                </div>
            </div>
        </div>
    )
}

