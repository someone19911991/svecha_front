import styles from './modelProducts.module.css'
import { useParams } from 'react-router-dom'
import { useGetProductsByNameQuery } from '../../features/products/productsApiSlice'
import Loading from '../../components/Loading/Loading'
import Card from '../../components/Card/Card'
import Pagination from "../../components/Pagination/Pagination";
import React, {useEffect, useState} from "react";
import {IProduct} from "../../interfaces";
import product from "../Products/Product";

const ModelProducts = () => {
    const pageItemsCount = 6
    const [activePage, setActivePage] = useState(1)
    const params = useParams<{ model: string }>()
    const model = params.model as string
    const { data: products, isLoading } = useGetProductsByNameQuery(model)
    const [productsToShow, setProductsToShow] = useState<Array<IProduct>>([])

    useEffect(() => {
        if(products){
            const endIndex = activePage * pageItemsCount
            const startIndex = endIndex - pageItemsCount
            const productsToProvide = products.slice(startIndex, endIndex)
            setProductsToShow(productsToProvide)
        }

    }, [activePage, products])

    if (isLoading) {
        return <Loading />
    }

    return (
        <>
        <div className={styles.container}>
            {products &&
                productsToShow.map((product) => (
                    <Card
                        key={product.product_id}
                        product={product}
                        compareActive={false}
                    />
                ))}
        </div>
            {products && products.length > pageItemsCount && <Pagination
                pageItemsCount={pageItemsCount}
                productsCount={products.length}
                activePage={activePage}
                setActivePage={setActivePage}
            />}
        </>
    )
}

export default ModelProducts
