import React, {ChangeEvent, useEffect, useState} from 'react';
import styles from "./left_side.module.css"
import {Link} from "react-router-dom"
import {useTranslation} from "react-i18next";
import {IoMdClose} from "react-icons/io"

const LeftSlide = () => {
    const { i18n, t } = useTranslation()
    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng)
    }
    const handleChangeLng = (e: ChangeEvent<HTMLSelectElement>) => {
        changeLanguage(e.target.value)
    }

    const handleSlideClose = () => {
        const leftSlide = document.querySelector<HTMLDivElement>('.left-slide')
        if(leftSlide){
            leftSlide.style.transform = "translate(-100vw)"
        }
    }

    return (
        <div className={`${styles.container} left-slide`}>
            <span className={styles.close}><IoMdClose onClick={handleSlideClose} /></span>
            <ul>
                <li><Link to="/">{t("menu.main")}</Link></li>
                <li><Link to="/about-us">{t("menu.about_us")}</Link></li>
            </ul>
            <div className={styles.language_container}>
                <select className={styles.language} onChange={handleChangeLng}>
                    <option value="am">AM</option>
                    <option value="ru">RU</option>
                    <option value="en">EN</option>
                </select>
            </div>
        </div>
    );
};

export default LeftSlide;