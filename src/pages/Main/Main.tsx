import React, {useEffect, useState} from 'react'
import 'react-lazy-load-image-component/src/effects/blur.css'
import './main.css'
import Categories from '../../components/Categories/Categories'
import { useGetProductsQuery } from '../../features/products/productsApiSlice'
import ProductsComponent from '../../components/Products/ProductsComponent'
import { useAppDispatch } from '../../hooks/redux'
import { setProductsAction } from '../../features/products/productsSlice'
import Slider from "../../components/Slider/Slider";
import CategorySlider2 from "../../components/Categories/CategorySlider2";
import Brands from "../../components/Brands/Brands";
import LeftSlide from "../../components/LeftSlide/LeftSlide";
import TopSellingProducts from "../../components/Products/TopSellingProducts";
import useScrollTop from "../../hooks/useScrollTop";

const Main = () => {
    const dispatch = useAppDispatch()
    const { data: allProducts, isSuccess } = useGetProductsQuery()
    const [containerClassName, setContainerClassName] = useState('')
    const [sliderLength, setSliderLength] = useState(0)

    useEffect(() => {
        if (isSuccess) {
            dispatch(setProductsAction({products: allProducts}))
        }
    }, [isSuccess])

    useEffect(() => {
        const windowLength = window.innerWidth
        if(windowLength <= 860 && windowLength >= 650){
            setContainerClassName('four_elems')
            setSliderLength(4)
        }else if(windowLength < 650 && windowLength >= 450){
            setContainerClassName('three_elems')
            setSliderLength(3)
        }else if(windowLength < 450 && windowLength >= 300){
            setContainerClassName('two_elems')
            setSliderLength(2)
        }else if(windowLength < 300){
            setContainerClassName('one_elem')
            setSliderLength(1)
        }
    }, [])

    useScrollTop()

    return (
        <div className="main">
            <Slider/>
            <Categories />
            {!!sliderLength && <CategorySlider2 containerClassName={containerClassName} sliderLength={sliderLength} imgsCount={6}/>}
            {isSuccess && <TopSellingProducts />}
            <Brands/>
        </div>
    )
}

export default Main
