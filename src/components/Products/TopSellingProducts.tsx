import React from 'react';
import styles from "./top_selling_products.module.css"
import {useAppSelector} from "../../hooks/redux";
import Card from "../Card/Card";
import {useTranslation} from "react-i18next";

const TopSellingProducts = () => {
    const {t} = useTranslation()
    const {topSellingProducts} = useAppSelector(state => state.products)

    return (
        <div className='app_container'>
            <h1 className={styles.top_selling_title}>{t("general.top_selling")}</h1>
            <div className={styles.top_selling_container}>
                {!!topSellingProducts.length && topSellingProducts.map(product => <div key={product.model || product.detail_number}>
                    <Card  product={product} compareActive={false} inTopSelling={true} />
                </div>)}
            </div>
        </div>
    );
};

export default TopSellingProducts;