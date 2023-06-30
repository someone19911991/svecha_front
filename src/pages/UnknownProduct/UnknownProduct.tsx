import React from 'react';
import styles from "./unknownProduct.module.css"
import useScrollTop from "../../hooks/useScrollTop";

const UnknownProduct = () => {

    useScrollTop()

    return (
        <div className={styles.unknown_product}>
            <h3>Unknown product</h3>
        </div>
    );
};

export default UnknownProduct;