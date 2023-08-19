import React, {useEffect, useState} from 'react'
import styles from './about.module.css'
import clients from "../../imgs/clients.jpg"
import selling from "../../imgs/selling.jpg"
import years from "../../imgs/years.jpg"
import self from "../../imgs/self.jpg"
import saro from "../../imgs/saro.jpg"
// import saro2 from "../../imgs/saro2.jpg"
import {useTranslation} from "react-i18next";
import {useGetClientCountsQuery} from "../../features/clientCount/clientCountApiSlice";
import useScrollTop from "../../hooks/useScrollTop";

const About = () => {
    const {t} = useTranslation()
    const workingYears = new Date().getFullYear() - 2018 + 1
    const {data: clientsCount} = useGetClientCountsQuery()

    useScrollTop()

    return (
        <div className={styles.about_container}>
            <div className={styles.our_goal}>
                <h2>{t("about.our_goal_1")} <br /> {t("about.our_goal_2")}</h2>
            </div>
            <div className={styles.main_text_container}>
                <h1>{t("menu.about_us")}</h1>
                <p>{t("about.text1")}</p>
                <div className={styles.text_list}>
                    <p><span>1.</span> {t("about.point1")}</p>
                    <p><span>2.</span> {t("about.point2")}</p>
                    <p><span>3.</span> {t("about.point3")}</p>
                </div>
                <p>{t("about.text2")}</p>
                <p>{t("about.text3")}</p>
            </div>
            <div className={styles.info_wrapper}>
                <div className={styles.info_container}>
                    <div className={styles.info_item}>
                        <img src={selling} alt=""/>
                        <span className={styles.info_number}>24234</span>
                        <span className={styles.info_text}>{t("about.selling_parts")}</span>
                    </div>
                    <div className={styles.info_item}>
                        <img src={years} alt=""/>
                        <span className={styles.info_number}>{workingYears}</span>
                        <span className={styles.info_text}>{t("about.working_years")}</span>
                    </div>
                    <div className={styles.info_item}>
                        <img src={clients} alt=""/>
                        <span className={styles.info_number}>{clientsCount}</span>
                        <span className={styles.info_text}>{t("about.our_clients")}</span>
                    </div>
                </div>
            </div>
            <div className={styles.our_team}>
                <h2>{t("about.our_team")}</h2>
                <div className={styles.team_imgs}>
                    <div className={styles.img_container}>
                        <img src={saro} alt=""/>
                        <p className={styles.member_name}>{t("about.founder_name")}</p>
                        <p className={styles.member_role}>{t("about.founder")}</p>
                    </div>
                    <div className={styles.img_container}>
                        <img src={self} alt=""/>
                        <p  className={styles.member_name}>{t("about.co_founder_name")}</p>
                        <p className={styles.member_role}>{t("about.co_founder")}</p>
                    </div>
                    <div className={styles.img_container}>
                        <img src={self} alt=""/>
                        <p  className={styles.member_name}>{t("about.developer_name")}</p>
                        <p  className={styles.member_role}>{t("about.developer")}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
