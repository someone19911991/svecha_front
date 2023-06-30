import React from 'react';
import bosch from "../../imgs/bosch.png"
import delco from "../../imgs/delco.png"
import champion from "../../imgs/champion.png"
import denso from "../../imgs/denso.png"
import motorcraft from "../../imgs/motorcraft.png"
import ngk from "../../imgs/ngk.png"
import styles from "./brands.module.css"

const Brands = () => {
    return (
        <div className={styles.brand_container}>
            <div>
                <img src={bosch} alt=""/>
            </div>
            <div>
                <img src={delco} alt=""/>
            </div>
            <div>
                <img src={champion} alt=""/>
            </div>
            <div>
                <img src={denso} alt=""/>
            </div>
            <div>
                <img src={motorcraft} alt=""/>
            </div>
            <div>
                <img src={ngk} alt=""/>
            </div>

        </div>
    );
};

export default Brands;