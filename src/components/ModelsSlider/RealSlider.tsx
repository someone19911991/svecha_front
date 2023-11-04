import styles from './models.module.css'
import React, {useEffect, useRef, useState} from 'react'
import {backURL} from "../../consts";
import {BsArrowLeftCircle, BsArrowRightCircle} from "react-icons/bs"
import {Link} from "react-router-dom";
import {LazyLoadImage} from "react-lazy-load-image-component";

interface IModels {
    itemsPerPage: number,
    items: Array<{img: string, name: string}>
}

const RealSlider = ({ itemsPerPage, items }: IModels) => {
    let itemsLength = items.length
    const [firstArrFirstItem, setFirstArrFirstItem] = useState(0)
    const [secondArrFirstItem, setSecondArrFirstItem] = useState(itemsLength)
    const modelsContainerRef = useRef<HTMLDivElement>(null)
    const modelsContainerRef2 = useRef<HTMLDivElement>(null)
    const items2 = [...items]
    let interval = useRef<NodeJS.Timeout | null>(null)

    const handleNextClick = () => {
        if (modelsContainerRef.current && modelsContainerRef2.current) {
            const singleModel = modelsContainerRef.current.querySelector(
                `.model`
            ) as HTMLDivElement
            const singleModelWidth = singleModel.clientWidth
            const containerStyle = modelsContainerRef.current.style
            const container2Style = modelsContainerRef2.current.style
            const containerLeft =
                containerStyle && parseInt(containerStyle.left)
            const container2Left =
                container2Style && container2Style.left.includes('%') ? singleModelWidth * itemsLength : parseInt(container2Style.left)

            if(firstArrFirstItem === itemsPerPage - itemsLength){
                container2Style.zIndex = '1'
                container2Style.transitionDuration = '0s'
                container2Style.left = `${itemsPerPage * singleModelWidth}px`

                setTimeout(() => {
                    container2Style.transitionDuration = '0.5s'
                    container2Style.left = `${parseInt(container2Style.left) - singleModelWidth}px`
                    containerStyle.left = `${containerLeft - singleModelWidth}px`
                }, 100)

                setFirstArrFirstItem(prev => prev - 1)
                setSecondArrFirstItem(itemsLength - 1 - (itemsLength - itemsPerPage))
            }else if(secondArrFirstItem === itemsPerPage - itemsLength){
                containerStyle.zIndex = '1'
                containerStyle.transitionDuration = '0s'
                containerStyle.left = `${itemsPerPage * singleModelWidth}px`

                setTimeout(() => {
                    containerStyle.transitionDuration = '0.5s'
                    containerStyle.left = `${parseInt(containerStyle.left) - singleModelWidth}px`
                    container2Style.left = `${container2Left - singleModelWidth}px`
                }, 100)

                setFirstArrFirstItem(itemsLength - 1 - (itemsLength - itemsPerPage))
                setSecondArrFirstItem(prev => prev - 1)
            }else{
                containerStyle.zIndex = '999'
                container2Style.zIndex = '999'
                containerStyle.left = `${containerLeft - singleModelWidth}px`
                container2Style.left = `${container2Left - singleModelWidth}px`
                setFirstArrFirstItem(prev => prev - 1)
                setSecondArrFirstItem(prev => prev - 1)
            }
        }
    }

    const handlePrevClick = () => {
        if (modelsContainerRef.current && modelsContainerRef2.current) {
            const singleModel = modelsContainerRef.current.querySelector(
                `.model`
            ) as HTMLDivElement
            const singleModelWidth = singleModel.clientWidth
            const containerStyle = modelsContainerRef.current.style
            const container2Style = modelsContainerRef2.current.style
            const containerLeft =
                containerStyle && parseInt(containerStyle.left)
            const container2Left =
                container2Style && container2Style.left.includes('%') ? singleModelWidth * itemsLength : parseInt(container2Style.left)

            if(firstArrFirstItem === 0){
                container2Style.zIndex = '1'
                container2Style.left = `${-singleModelWidth * itemsLength}px`
                container2Style.transitionDuration = `0s`

                setTimeout(() => {
                    container2Style.transitionDuration = `0.5s`
                    container2Style.left = `${parseInt(container2Style.left) + singleModelWidth}px`
                    containerStyle.left = `${containerLeft + singleModelWidth }px`
                })
                setFirstArrFirstItem(prev => prev + 1)
                setSecondArrFirstItem(-(itemsLength - 1))
            }else if(secondArrFirstItem === 0){
                containerStyle.zIndex = '1'
                containerStyle.left = `${-singleModelWidth * itemsLength}px`
                containerStyle.transitionDuration = `0s`

                setTimeout(() => {
                    containerStyle.transitionDuration = `0.5s`
                    containerStyle.left = `${parseInt(containerStyle.left) + singleModelWidth}px`
                    container2Style.left = `${container2Left + singleModelWidth }px`
                })
                setSecondArrFirstItem(prev => prev + 1)
                setFirstArrFirstItem(-(itemsLength - 1))
            }else{
                containerStyle.zIndex = '999'
                container2Style.zIndex = '999'
                container2Style.left = `${container2Left + singleModelWidth}px`
                containerStyle.left = `${containerLeft + singleModelWidth }px`
                setFirstArrFirstItem(prev => prev + 1)
                setSecondArrFirstItem(prev => prev + 1)
            }
        }
    }

    useEffect(() => {
        interval.current = setTimeout(handleNextClick, 2000)

        return () => {
            interval.current && clearInterval(interval.current)
        }
    }, [firstArrFirstItem, secondArrFirstItem])



    return (
        <div className={styles.models_slider}>
            <button onClick={handlePrevClick} className={styles.prev_btn}>
                <BsArrowLeftCircle className={styles.arrow} />
            </button>
            <button onClick={handleNextClick} className={styles.next_btn}>
                <BsArrowRightCircle className={styles.arrow} />
            </button>
            <div
                ref={modelsContainerRef}
                style={{ left: '0px' }}
                className={styles.models_container}
            >
                {items?.map((item, index) => (
                    <div
                        style={{
                            left: `calc(${index * (100 / itemsPerPage) + '%'})`,
                            width: `${100 / itemsPerPage}%`,
                        }}
                        data-index={index}
                        key={item.img}
                        className={`${styles.model} model`}
                    >
                        <Link to={`models/${encodeURI(item.name.toLowerCase())}`}>
                            <img src={`${backURL}/${item.img}`} />
                        </Link>
                    </div>
                ))}
            </div>
            <div
                ref={modelsContainerRef2}
                style={{ left: `calc(${itemsLength * (100 / itemsPerPage) + '%'})`, }}
                className={styles.models_container}
            >
                {items2.map((item, index) => (
                    <div
                        style={{
                            left: `calc(${index * (100 / itemsPerPage) + '%'})`,
                            width: `${100 / itemsPerPage}%`,
                        }}
                        data-index={index}
                        key={item.img + index}
                        className={`${styles.model2} model2`}
                    >
                        <Link to={`models/${encodeURI(item.name.toLowerCase())}`}>
                            <img src={`${backURL}/${item.img}`} />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RealSlider
