import React, { useEffect } from 'react'
import 'react-lazy-load-image-component/src/effects/blur.css'
import './main.css'
import Search from '../../components/Search/Search'
import Header from '../../components/Header/Header'
import Categories from '../../components/Categories/Categories'
import { useGetProductsQuery } from '../../features/products/productsApiSlice'
import ProductsComponent from '../../components/Products/ProductsComponent'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { setProductsAction } from '../../features/products/productsSlice'
import Slider from "../../components/Slider/Slider";

const Main = () => {
    const dispatch = useAppDispatch()
    const { data: allProducts, isSuccess } = useGetProductsQuery()

    useEffect(() => {
        if (isSuccess) {
            dispatch(setProductsAction({products: allProducts}))
        }
    }, [isSuccess])

    return (
        <div className="main">
            <Slider/>
            <Categories />
            {isSuccess && <ProductsComponent />}
        </div>
    )
}

export default Main
