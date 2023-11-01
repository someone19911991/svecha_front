import React, {useEffect, useState} from 'react';
import car4 from "../../imgs/car4.jpg"
import car5 from "../../imgs/car5.jpg"
import car6 from "../../imgs/car6.jpg"
import car7 from "../../imgs/car7.jpg"
import styles from "./slider.module.css"
import {RiArrowRightSFill} from "react-icons/ri"
import Models from "../Models/Models";

const Slider = () => {
    const imgArr = [car5, car6, car7, car4]
    const [activeImgIndex, setActiveImgIndex] = useState(0)

    useEffect(() => {
        const getNextIndex = (prev: number) => {
            let nextIndex = prev + 1
            if(nextIndex === imgArr.length) nextIndex = 0
            return nextIndex
        }

        const timeout = setInterval(() => {
            setActiveImgIndex(prev => getNextIndex(prev))
        }, 5000)

        return () => clearInterval(timeout)
    }, [])

    return (
        <div className={styles.slider_container}>
            {/*<Models itemsPerPage={4} />*/}
            <img src={imgArr[activeImgIndex]} alt=""/>
        </div>
    );
};

export default Slider;