import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ProductsComponent from '../../components/Products/ProductsComponent'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { setProductsAction } from '../../features/products/productsSlice'
import { categoriesArray } from '../../helpers'
import { useLazyGetProductsByCategoryQuery } from '../../features/products/productsApiSlice'
import LeftBar from '../../components/LeftBar/LeftBar'
import styles from "./products.module.css"

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
    const {filteredProducts} = useAppSelector(state => state.products)
    const dispatch = useAppDispatch()
    const { category } = useParams<ICategoryType>()
    const [getProductsByCategory, { isSuccess }] =
        useLazyGetProductsByCategoryQuery()

    useEffect(() => {
        const getCategoryProducts = async () => {
            if (category && categoriesArray.includes(category)) {
                const result = await getProductsByCategory(category).unwrap()
                dispatch(setProductsAction({ products: result }))
            }
        }
        getCategoryProducts()
    }, [category])


    return isSuccess ? (
        <div className={styles.category_container}>
            <LeftBar />
            <div className={styles.category_container_products}>
                <ProductsComponent />
            </div>
        </div>
    ) : (
        <></>
    )
}

export default Products
