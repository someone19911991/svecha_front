import React, { useEffect, useState } from 'react';
import spark_plugs from '../../imgs/spark_plugs.jpg'
import airbag_cables from '../../imgs/airbag_cables.jpeg'
import crankshaft_sensors from '../../imgs/crankshaft_sensors.jpeg'
import camshaft_sensors from '../../imgs/camshaft_sensors.jpeg'
import ignition_coils from '../../imgs/ignition_coils.jpg'
import ignition_coil_mouthpieces from '../../imgs/ignition_coil_mouthpieces.jpeg'

const Slideshow = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const images = [
        spark_plugs,
        airbag_cables,
        crankshaft_sensors,
        camshaft_sensors,
        ignition_coils,
        ignition_coil_mouthpieces
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
        }, 2000);

        return () => {
            clearInterval(interval);
        };
    }, [images.length]);

    return (
        <div className="slideshow">
            {images.map((image, index) => (
                <img
                    key={index}
                    src={image}
                    alt={`Slide ${index + 1}`}
                    className={index === currentSlide ? 'active' : ''}
                />
            ))}
        </div>
    );
};

export default Slideshow;