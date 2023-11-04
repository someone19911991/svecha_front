import React, {useEffect, useState} from 'react';
import car4 from "../../imgs/car4.jpg"
import car5 from "../../imgs/car5.jpg"
import car6 from "../../imgs/car6.jpg"
import car7 from "../../imgs/car7.jpg"
import styles from "./slider.module.css"
import RealSlider from "../ModelsSlider/RealSlider";
import {useGetModelsQuery} from "../../features/products/productsApiSlice";

const Slider = () => {
    const {data: products, isSuccess, isLoading} = useGetModelsQuery()
    const imgArr = [car5, car6, car7, car4]
    const [activeImgIndex, setActiveImgIndex] = useState(0)

    const setItemsCount = () => {
        if(window.innerWidth >= 840){
            return 5
        }else if(window.innerWidth > 640 && window.innerWidth <= 840){
            return 4
        }else if(window.innerWidth > 440 && window.innerWidth <= 640) {
            return 3
        }
        return 2
    }


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
            {isSuccess && <RealSlider items={products} itemsPerPage={setItemsCount()}/>}
            <img src={imgArr[activeImgIndex]} alt=""/>
        </div>
    );
};

export default Slider;