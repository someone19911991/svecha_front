import React, {useEffect} from 'react';
import Card from "../../components/Card/Card";
import {useAppSelector} from "../../hooks/redux";
import styles from "./search_results.module.css"
import {useTranslation} from "react-i18next";

const SearchResults = () => {
    const {t} = useTranslation()
    const {searchResult} = useAppSelector(state => state.products)
    if(!searchResult.length){
        return <h2 className={styles.no_products}>{t("general.no_products_found")}</h2>
    }

    return (
        <div className={`app_container ${styles.container}`}>
            {searchResult?.map(product => {
                return <Card
                    key={product.product_id}
                    product={product}
                    compareActive={false}
                />
            })}
        </div>
    );
};

export default SearchResults;