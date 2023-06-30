import React, {FC, useCallback, useEffect, useMemo, useRef, useState} from 'react'
import spark_plugs from '../../imgs/spark_plugs.jpg'
import ignition_coil_mouthpieces from '../../imgs/ignition_coil_mouthpieces.jpeg'
import {categoryImages} from "../../consts";
import styles from './categories.module.css'
import {BsFillArrowLeftCircleFill} from "react-icons/bs"
import {BsFillArrowRightCircleFill} from "react-icons/bs"
import {NavLink} from "react-router-dom";

interface ISliderProps{imgsCount: number, sliderLength: number, containerClassName: string}

const CategorySlider:FC<ISliderProps> = ({imgsCount, sliderLength, containerClassName}) => {
    const [prevVisible, setPrevVisible] = useState(false)
    const [prevNextDisabled, setPrevNextDisabled] = useState(false)
    const [slidedRight, setSlidedRight] = useState(false)
    const [slidedLeft, setSlidedLeft] = useState(false)
    const intervalRef = useRef<number | null>(null)
    const additionalLeftImgRef = useRef<HTMLImageElement>(null)
    const additionalRightImgRef = useRef<HTMLImageElement>(null)
    const sliderContainerRef = useRef<HTMLDivElement>(null)
    const anotherContainerRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const activeImgs = useMemo(() => {
        return categoryImages
    }, [])

    const [firstTranslate, setFirstTranslate] = useState(0)
    const [secondTranslate, setSecondTranslate] = useState(0)

    const sliderFunc = useCallback(() => {
        sliderContainerRef.current && (sliderContainerRef.current.style.transition = '1s')
        anotherContainerRef.current && (anotherContainerRef.current.style.transition = '1s')

        const categorySliderImg = document.querySelector<HTMLImageElement>(
            '.category_slider_img'
        )
        let imgLength = 0
        if (categorySliderImg) {
            imgLength = categorySliderImg.clientWidth
        }

        if(additionalLeftImgRef.current){
            if(slidedRight){
                additionalLeftImgRef.current.style.zIndex = `0`
                additionalLeftImgRef.current.style.translate = `-${imgLength}px`
                setSlidedRight(false)
            }else{
                additionalLeftImgRef.current.style.zIndex = `3`
            }
        }

        if(additionalRightImgRef.current){
            if(slidedLeft){
                additionalRightImgRef.current.style.zIndex = `0`
                additionalRightImgRef.current.style.translate = `${sliderLength * imgLength}px`
                setSlidedLeft(false)
            }else{
                additionalRightImgRef.current.style.zIndex = `3`
            }
        }

        anotherContainerRef.current && (anotherContainerRef.current.style.transition = 'translate 1s')
        sliderContainerRef.current && (sliderContainerRef.current.style.transition = 'translate 1s')

        if(firstTranslate === ((sliderLength - imgsCount + 1) * imgLength)){
            anotherContainerRef.current && (anotherContainerRef.current.style.zIndex = '0')
            setFirstTranslate(firstTranslate - imgLength)
            setSecondTranslate(sliderLength * imgLength)
        }else if(secondTranslate === ((sliderLength - imgsCount + 1) * imgLength)){
            sliderContainerRef.current && (sliderContainerRef.current.style.zIndex = '0')
            setSecondTranslate(secondTranslate - imgLength)
            setFirstTranslate(sliderLength * imgLength)
        }else{
            sliderContainerRef.current && (sliderContainerRef.current.style.zIndex = '2')
            anotherContainerRef.current && (anotherContainerRef.current.style.zIndex = '1')
            setFirstTranslate(firstTranslate - imgLength)
            setSecondTranslate(secondTranslate - imgLength)
        }

    }, [firstTranslate, secondTranslate, sliderContainerRef, anotherContainerRef])

    const prevNext = (arg: string) => {
        if(prevNextDisabled){
            return
        }
        if(intervalRef.current){
            window.clearInterval(intervalRef.current)
            intervalRef.current = null
        }

        sliderContainerRef.current && (sliderContainerRef.current.style.transition = '0.3s')
        anotherContainerRef.current && (anotherContainerRef.current.style.transition = '0.3s')
        const categorySliderImg = document.querySelector<HTMLImageElement>(
            '.category_slider_img'
        )
        let imgLength = 0
        if (categorySliderImg) {
            imgLength = categorySliderImg.clientWidth
        }
        if(additionalLeftImgRef.current){
            if(slidedRight){
                additionalLeftImgRef.current.style.zIndex = `0`
                additionalLeftImgRef.current.style.translate = `-${imgLength}px`
                setSlidedRight(false)
            }else{
                additionalLeftImgRef.current.style.zIndex = `3`
            }
        }

        if(additionalRightImgRef.current){
            if(slidedLeft){
                additionalRightImgRef.current.style.zIndex = `0`
                additionalRightImgRef.current.style.translate = `${sliderLength * imgLength}px`
                setSlidedLeft(false)
            }else{
                additionalRightImgRef.current.style.zIndex = `3`
            }
        }

        if(arg === 'prev'){
            if(firstTranslate >= 0 && secondTranslate >= 0){
                if(secondTranslate > firstTranslate){
                    anotherContainerRef.current && (anotherContainerRef.current.style.zIndex = '0');
                    setSecondTranslate(-(imgsCount - 1) * imgLength)
                    setFirstTranslate(firstTranslate + imgLength)
                }else{
                    sliderContainerRef.current && (sliderContainerRef.current.style.zIndex = '0');
                    setFirstTranslate(-(imgsCount - 1) * imgLength)
                    setSecondTranslate(secondTranslate + imgLength)
                }

                if(additionalLeftImgRef.current){
                    additionalLeftImgRef.current.style.zIndex = `3`
                    additionalLeftImgRef.current.style.translate = `0`
                    setSlidedRight(true)
                }
            }else{
                sliderContainerRef.current && (sliderContainerRef.current.style.zIndex = '2')
                anotherContainerRef.current && (anotherContainerRef.current.style.zIndex = '1')
                setFirstTranslate(firstTranslate + imgLength)
                setSecondTranslate(secondTranslate + imgLength)
            }
        }else{
            if(firstTranslate <= (-(imgsCount - sliderLength) * imgLength) && secondTranslate <= (-(imgsCount - sliderLength) * imgLength)){
                if(secondTranslate > firstTranslate){
                    sliderContainerRef.current && (sliderContainerRef.current.style.zIndex = '0')
                    setFirstTranslate((sliderLength - 1) * imgLength)
                    setSecondTranslate(secondTranslate - imgLength)
                }else{
                    anotherContainerRef.current && (anotherContainerRef.current.style.zIndex = '0')
                    setSecondTranslate((sliderLength - 1) * imgLength)
                    setFirstTranslate(firstTranslate - imgLength)
                }
                if(additionalRightImgRef.current){
                    additionalRightImgRef.current.style.zIndex = '3'
                    additionalRightImgRef.current.style.translate = `${(sliderLength - 1)  * imgLength}px`
                    setSlidedLeft(true)
                }
            }else{
                setFirstTranslate(firstTranslate - imgLength)
                setSecondTranslate(secondTranslate - imgLength)
                sliderContainerRef.current && (sliderContainerRef.current.style.zIndex = '2')
                anotherContainerRef.current && (anotherContainerRef.current.style.zIndex = '1')
            }
        }
        setPrevNextDisabled(true)
    }

    useEffect(() => {
        intervalRef.current = window.setInterval(sliderFunc, 2000)

        return () => {
            if (intervalRef.current) {
                window.clearInterval(intervalRef.current)
                intervalRef.current = null
            }
        }
    }, [firstTranslate, secondTranslate])

    useEffect(() => {
        if (sliderContainerRef.current) {
            sliderContainerRef.current.style.translate = `${firstTranslate}px`
        }
        if (anotherContainerRef.current) {
            anotherContainerRef.current.style.translate = `${secondTranslate}px`
        }
    }, [firstTranslate, secondTranslate])

    useEffect(() => {
        const categorySliderImg = document.querySelector<HTMLImageElement>(
            '.category_slider_img'
        )
        let imgLength = 0
        if (categorySliderImg) {
            imgLength = categorySliderImg.clientWidth
        }
        if(additionalLeftImgRef.current){
            additionalLeftImgRef.current.style.width = `${imgLength}px`
            additionalLeftImgRef.current.style.translate = `-${imgLength}px`
        }
        if(additionalRightImgRef.current){
            additionalRightImgRef.current.style.width = `${imgLength}px`
            additionalRightImgRef.current.style.translate = `${sliderLength * imgLength}px`
        }
        if(anotherContainerRef.current){
            anotherContainerRef.current.style.translate = `${imgsCount * imgLength}px`
        }

        setTimeout(() => {
            setPrevVisible(true)
        }, 3000)
    }, [])

    useEffect(() => {
        let prevNextInterval: ReturnType<typeof setTimeout>;
        if(prevNextDisabled){
            prevNextInterval = setTimeout(() => {
                setPrevNextDisabled(false)
            }, 300)
        }

        return () => clearInterval(prevNextInterval)
    }, [prevNextDisabled])


    return (
        <div className={`${styles.container} categories_slideshow`} ref={containerRef}>
            <img src={ignition_coil_mouthpieces} className={`${styles.additional_img} left`} ref={additionalLeftImgRef} alt=""/>
            <img src={spark_plugs} className={`${styles.additional_img} right`} ref={additionalRightImgRef} alt=""/>
            <div
                ref={sliderContainerRef}
                className={`${styles.slider_container} ${styles[containerClassName]}`}
            >
                {activeImgs.map((imgItem) => (
                    <NavLink key={imgItem.img} to={imgItem.url}><img
                        className="category_slider_img"
                        src={imgItem.img}
                        alt=""
                    /></NavLink>
                ))}
            </div>
            <div
                ref={anotherContainerRef}
                className={`${styles.imgs_bgc} ${styles[containerClassName]}`}
            >
                {activeImgs.map((imgItem) => (
                    <NavLink key={imgItem.img} to={imgItem.url}><img
                        className="category_slider_img"
                        src={imgItem.img}
                        alt=""
                    /></NavLink>
                ))}
            </div>
            {prevVisible && <button
                className={`${styles.slider_btn} ${styles.slider_prev_btn}`}
                onClick={() => prevNext('prev')}
            >
                <BsFillArrowLeftCircleFill/>
            </button>}
            <button
                className={`${styles.slider_btn} ${styles.slider_next_btn}`}
                onClick={() => prevNext('next')}
            >
                <BsFillArrowRightCircleFill />
            </button>
        </div>
    )
}

export default CategorySlider
