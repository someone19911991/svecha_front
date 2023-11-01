import styles from './models.module.css'
import { categoryImages } from '../../consts'
import {useEffect, useRef, useState} from 'react'
import { FC } from 'react'

interface IModels {
    itemsPerPage: number
}

const Models: FC<IModels> = ({ itemsPerPage }) => {
    const [activeIndex, setActiveIndex] = useState(0)
    const modelsContainerRef = useRef<HTMLDivElement>(null)
    const modelsContainerRef2 = useRef<HTMLDivElement>(null)
    const categoryImages2 = [...categoryImages]


    // const handleClick = () => {
    //     if (modelsContainerRef.current && modelsContainerRef2.current) {
    //         console.log({ activeIndex })
    //         const itemsLength = categoryImages.length
    //         const singleModel = modelsContainerRef.current.querySelector(
    //             `.model`
    //         ) as HTMLDivElement
    //         const singleModelWidth = singleModel.clientWidth
    //         const firstContainerStyle = modelsContainerRef.current.style
    //         const secondContainerStyle = modelsContainerRef2.current.style
    //
    //
    //         let setToZero = false
    //         if (itemsLength - activeIndex === itemsPerPage) {
    //             console.log('first')
    //             secondContainerStyle.left = `${
    //                 singleModelWidth * (itemsPerPage)
    //             }px`
    //             firstContainerStyle.left = `${
    //                 parseInt(firstContainerStyle.left) - singleModelWidth
    //             }px`
    //         } else if (itemsLength * 2 - activeIndex - 1 === itemsPerPage) {
    //             console.log('second')
    //             secondContainerStyle.left = `${
    //                 parseInt(secondContainerStyle.left) - singleModelWidth
    //             }px`
    //             firstContainerStyle.left = `${
    //                 itemsPerPage * singleModelWidth
    //             }px`
    //         } else {
    //             console.log('third')
    //             firstContainerStyle.left = `${
    //                 parseInt(firstContainerStyle.left) - singleModelWidth
    //             }px`
    //             secondContainerStyle.left = `${
    //                 secondContainerStyle.left.includes('vw')
    //                     ? singleModelWidth * categoryImages.length -
    //                       singleModelWidth
    //                     : parseInt(secondContainerStyle.left) - singleModelWidth
    //             }px`
    //         }
    //
    //         if(activeIndex === itemsLength * 2 - itemsPerPage + 1){
    //             setToZero = true
    //         }
    //         const firstContainerPos = parseInt(firstContainerStyle.left)
    //         const secondContainerPos = parseInt(secondContainerStyle.left)
    //
    //         console.log({firstContainerPos, secondContainerPos})
    //
    //         setActiveIndex((prev) => {
    //             if(setToZero){
    //                 return 0
    //             }
    //             return (prev + 1)
    //         })
    //     }
    // }

    useEffect(() => {
        console.log({activeIndex})
    }, [activeIndex])

    const handleClick = () => {
        if (modelsContainerRef.current && modelsContainerRef2.current) {
            const itemsLength = categoryImages.length
            const singleModel = modelsContainerRef.current.querySelector(
                `.model`
            ) as HTMLDivElement
            const singleModelWidth = singleModel.clientWidth
            const firstContainerStyle = modelsContainerRef.current.style
            const secondContainerStyle = modelsContainerRef2.current.style
            const firstContainerLeftPos = parseInt(modelsContainerRef.current.style.left)
            const secondContainerLeftPos = parseInt(modelsContainerRef2.current.style.left)
            if(activeIndex === 1){
                console.log('first')
                firstContainerStyle.left = `${parseInt(firstContainerStyle.left) - singleModelWidth}px`
                secondContainerStyle.left = `${(firstContainerLeftPos < 0 ? itemsPerPage : itemsLength) * singleModelWidth}px`
            }else if(activeIndex === 7){
                console.log('second')
                console.log({firstContainerLeftPos})
                console.log({secondContainerLeftPos})
                secondContainerStyle.left = `${parseInt(secondContainerStyle.left) - singleModelWidth}px`
                firstContainerStyle.left = `${(secondContainerLeftPos < 0 ? itemsPerPage : itemsLength) * singleModelWidth}px`
            }else{
                console.log('third')
                secondContainerStyle.left = `${
                    secondContainerStyle.left.includes('vw')
                        ? singleModelWidth * categoryImages.length -
                          singleModelWidth
                        : parseInt(secondContainerStyle.left) - singleModelWidth
                }px`
                firstContainerStyle.left = `${parseInt(firstContainerStyle.left) - singleModelWidth}px`
            }

            setActiveIndex(prev => {
                if(activeIndex === 9){
                    return 0
                }

                return prev + 1
            })
        }
    }

    return (
        <div className={styles.models_slider}>
            <div
                ref={modelsContainerRef}
                style={{ left: '0px' }}
                className={styles.models_container}
            >
                {categoryImages.map((item, index) => (
                    <div
                        style={{ left: `calc(${index * 25 + '%'})` }}
                        onClick={() => handleClick()}
                        data-index={index}
                        key={item.img}
                        className={`${styles.model} model`}
                    >
                        <img src={item.img} />
                    </div>
                ))}
            </div>
            <div
                ref={modelsContainerRef2}
                style={{ left: '150vw' }}
                className={styles.models_container}
            >
                {categoryImages2.map((item, index) => (
                    <div
                        style={{ left: `calc(${index * 25 + '%'})` }}
                        onClick={() => handleClick()}
                        data-index={index}
                        key={item.img + index}
                        className={`${styles.model2} model2`}
                    >
                        <img src={item.img} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Models
