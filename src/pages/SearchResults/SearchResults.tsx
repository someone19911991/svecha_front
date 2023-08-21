import React, {useEffect} from 'react';
import Card from "../../components/Card/Card";
import {useAppSelector} from "../../hooks/redux";
import styles from "./search_results.module.css"
import noProducts from "../../imgs/no_product.png"

const SearchResults = () => {
    const {searchResult} = useAppSelector(state => state.products)
    if(!searchResult.length){
        return <h2 className={styles.no_products}>No products found</h2>
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