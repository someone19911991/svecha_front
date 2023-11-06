import React, {useEffect, useRef, useState} from 'react';
import styles from "./top_selling_products.module.css"
import {useAppSelector} from "../../hooks/redux";
import Card from "../Card/Card";
import {useTranslation} from "react-i18next";
import Pagination from "../Pagination/Pagination";
import {IProduct} from "../../interfaces";
import {useGetTopSellingProductsQuery} from "../../features/products/productsApiSlice";
import Loading from "../Loading/Loading";

const TopSellingProducts = () => {
    const titleRef = useRef<HTMLDivElement>(null)
    const pageItemsCount = 6
    const {t} = useTranslation()
    const {data: topSellers, isLoading: isLoadingTopSellers} = useGetTopSellingProductsQuery()
    const [activePage, setActivePage] = useState(1)
    const [productsToShow, setProductsToShow] = useState<Array<IProduct>>([])

    useEffect(() => {
        if(topSellers){
            const endIndex = activePage * pageItemsCount
            const startIndex = endIndex - pageItemsCount
            const productsToProvide = topSellers.slice(startIndex, endIndex)
            setProductsToShow(productsToProvide)
        }


        if (titleRef.current) {
            titleRef.current.scrollIntoView({
                behavior: "smooth", // "smooth" can be replaced with "auto" or "instant"
                block: "center"
            });
        }
    }, [activePage, topSellers])


    if (isLoadingTopSellers) {
        return <Loading />
    }

    if(topSellers && !topSellers.length){
        return <></>
    }

    return (
        <div className='app_container' >
            <h1 ref={titleRef} className={styles.top_selling_title}>{t("general.top_selling")}</h1>
            <div className={styles.top_selling_container}>
                {!!productsToShow.length && productsToShow.map(product => <div key={product.model || product.detail_number}>
                    <Card  product={product} compareActive={false} inTopSelling={true} />
                </div>)}
            </div>
            {topSellers && topSellers.length > pageItemsCount && <Pagination
                pageItemsCount={6}
                productsCount={topSellers.length}
                activePage={activePage}
                setActivePage={setActivePage}
            />}
        </div>
    );
};

export default TopSellingProducts;