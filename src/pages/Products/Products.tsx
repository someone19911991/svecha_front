import React, { useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import ProductsComponent from '../../components/Products/ProductsComponent'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import {setProductsAction} from '../../features/products/productsSlice'
import { categoriesArray } from '../../helpers'
import { useLazyGetProductsByCategoryQuery } from '../../features/products/productsApiSlice'
import LeftBar from '../../components/LeftBar/LeftBar'
import styles from "./products.module.css"
import {IoMdClose} from "react-icons/io"
import no_product from "../../imgs/no_product.png"
import useScrollTop from "../../hooks/useScrollTop";
import {useTranslation} from "react-i18next";

type ICategoryType = {
    category:
        | 'spark_plugs'
        | 'ignition_coils'
        | 'airbag_cables'
        | 'ignition_coil_mouthpieces'
        | 'crankshaft_sensors'
        | 'camshaft_sensors'
}

const Products = () => {
    const {t} = useTranslation()
    const dispatch = useAppDispatch()
    const {filteredProducts} = useAppSelector(state => state.products)
    const { category } = useParams<ICategoryType>()
    const [getProductsByCategory, { isSuccess, isLoading }] =
        useLazyGetProductsByCategoryQuery()
    const [filterOpen, setFilterOpen] = useState(false)
    const [showLeftBar, setShowLeftBar] = useState(false)

    const handleFilter = (arg: string = '') => {
        const leftBar = document.querySelector<HTMLDivElement>('.left-bar')
        if(leftBar){
            if(arg){
                leftBar.style.transform = `translate(${arg})`
            }else{
                if(leftBar.style.transform === "translate(-100%)" || !leftBar.style.transform){
                    leftBar.style.transform = "translate(0)"
                    setFilterOpen(true)
                }else{
                    leftBar.style.transform = "translate(-100%)"
                    setFilterOpen(false)
                }
            }
        }
    }

    useScrollTop()

    useEffect(() => {
        if(filteredProducts.length === 0 && window.innerWidth <= 510){
            setFilterOpen(false)
            handleFilter('-100%')
        }
    }, [filteredProducts])

    useEffect(() => {
        const getCategoryProducts = async () => {
            if (category && categoriesArray.includes(category)) {
                let result = await getProductsByCategory(category).unwrap()
                // result = result.slice(0, 30)
                // console.log({result})
                result.length && setShowLeftBar(true)
                dispatch(setProductsAction({ products: result }))
            }
        }
        getCategoryProducts()
    }, [category])

    return isSuccess ? (
        <div className={styles.products_wrapper}>
            <div className={styles.category_container}>
                {showLeftBar && <LeftBar/>}
                {/*{showLeftBar && <div className={`${styles.category_container_products} ${styles.products_in_category}`}>*/}
                {/*    <ProductsComponent in_category={true}/>*/}
                {/*</div>}*/}
                {showLeftBar && <>
                    <ProductsComponent isSuccess={isSuccess} in_category={true}/>
                </>}
                {!showLeftBar && <div className={styles.no_product}><img  src={no_product}/></div>}
            </div>
        </div>
    ) : (
        <></>
    )
}

export default Products
