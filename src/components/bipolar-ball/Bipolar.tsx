import React, { useState, useEffect } from 'react'
import './Bipolar.css'
import {
    Button,
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption
} from 'reactstrap'

const items = [
    {
        src: 'https://i.ibb.co/3TfQ0hW/9.png',
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
        <div className="page">
            <div className="main-content">
                <div className="title">
                    <h1>Bipolar Ball</h1>
                </div>
                <div className="page-description">
                    <h2>Alterna el color de la bola para atravesar los obstáculos.</h2>
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
                        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
                        {slides}
                        <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
                        <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
                    </Carousel>
                </div>
                <div className="buttons-bipolar">
                    <div className="btn-facebook-bipolar">
                        <Button
                            color="primary"
                            size="lg"
                            onClick={() => window.location.href = 'https://www.facebook.com/elmisteriodelaoscuridad'}
                        >Facebook
                    </Button>
                    </div>
                    <div className="btn-descargar-bipolar">
                        <Button
                            color="success"
                            size="lg"
                            onClick={() => window.location.href = 'https://www.mediafire.com/file/asewoixg030yv5a/El_Misterio_de_la_Oscuridad_Alfa_3.zip/file?fbclid=IwAR2FewApUSdsphV2qHwYRnZ3KEfubTvhEZitZEXeRFNN_Hd2GBfGOdRplb0'}
                        >Descargar
                    </Button>
                    </div>
                </div>
                <div className="page-details-bipolar">

                </div>
            </div>
        </div>
    )
}

