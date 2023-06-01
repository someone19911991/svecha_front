import React, {useState} from 'react';
import car4 from "../../imgs/car4.jpg"
import car5 from "../../imgs/car5.jpg"
import car6 from "../../imgs/car6.jpg"
import car7 from "../../imgs/car7.jpg"
import styles from "./slider.module.css"

const Slider = () => {
    const imgArr = [car5, car6, car7, car4]
    const [activeImgIndex, setActiveImgIndex] = useState(0)
    let timeout: NodeJS.Timeout | number | null = null

    const slide = () => {
        timeout = setTimeout(() => {
            let nextIndex = activeImgIndex + 1
            if(nextIndex === imgArr.length) nextIndex = 0
            setActiveImgIndex(nextIndex)
        }, 5000)
    }

    slide()

    return (
        <div className={styles.slider_container}>
            <div className={styles.img_container}>
                <img src={imgArr[activeImgIndex]} alt=""/>
            </div>
        </div>
    );
};

export default Slider;