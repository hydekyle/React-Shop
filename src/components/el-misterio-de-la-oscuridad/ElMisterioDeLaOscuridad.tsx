import React, { useState, useEffect } from 'react'
import './ElMisterioDeLaOscuridad.css'
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
        src: 'https://scontent-mad1-1.xx.fbcdn.net/v/t1.0-9/97970113_2957148577700336_8191186392265523200_n.png?_nc_cat=110&_nc_sid=730e14&_nc_ohc=LsqLXzbAWlwAX_118kf&_nc_ht=scontent-mad1-1.xx&oh=26e5e39250e591a3ec33577abc6d7ebd&oe=5F117D92',
        altText: 'Slide 1',
        caption: 'Slide 1'
    },
    {
        src: 'https://scontent-mad1-1.xx.fbcdn.net/v/t1.0-9/71335419_2443997762348756_5783135844445454336_n.png?_nc_cat=108&_nc_sid=730e14&_nc_ohc=rD4eF0S4h-4AX9Q5MbG&_nc_ht=scontent-mad1-1.xx&oh=1ac847e1a33e2dd596aae47e51c361a6&oe=5F115403',
        altText: 'Slide 1',
        caption: 'Slide 1'
    },
    {
        src: 'https://scontent-mad1-1.xx.fbcdn.net/v/t1.0-9/69870017_2424483704300162_1031134215120355328_n.png?_nc_cat=109&_nc_sid=730e14&_nc_ohc=fv5ZbAOPOF0AX9HfgKh&_nc_ht=scontent-mad1-1.xx&oh=c9d03d5efc827a17f7a0839eb1411678&oe=5F0F05BE',
        altText: 'Slide 1',
        caption: 'Slide 1'
    }

]

const Example = (props) => {
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
                    <h1>El Misterio de la Oscuridad</h1>
                </div>
                <div className="page-description">
                    <h2>Explora una misteriosa isla repleta de secretos y misterios.</h2>
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
                <div className="buttons">
                    <div className="btn-facebook">
                        <Button
                            color="primary"
                            size="lg"
                            onClick={() => window.location.href = 'https://www.facebook.com/elmisteriodelaoscuridad'}
                        >Facebook
                    </Button>
                    </div>
                    <div className="btn-descargar">
                        <Button
                            color="success"
                            size="lg"
                            onClick={() => window.location.href = 'https://www.mediafire.com/file/asewoixg030yv5a/El_Misterio_de_la_Oscuridad_Alfa_3.zip/file?fbclid=IwAR2FewApUSdsphV2qHwYRnZ3KEfubTvhEZitZEXeRFNN_Hd2GBfGOdRplb0'}
                        >Descargar
                    </Button>
                    </div>
                </div>
                <div className="page-details">

                </div>
            </div>
        </div>
    )
}

export default Example;
