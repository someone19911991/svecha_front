import React from 'react';
import styles from "./footer.module.css"
import {Link} from "react-router-dom";
import logo from "../../imgs/logo.jpg";
import {useTranslation} from "react-i18next";
import {BsTwitter, BsInstagram, BsFacebook} from "react-icons/bs"
import {GrMail} from "react-icons/gr"
import {FaPhone, FaLocationArrow, FaTruck, FaFacebook, FaWhatsapp, FaViber} from "react-icons/fa"

const Footer = () => {
    const {t} = useTranslation()

    return (
        <div className={`${styles.footer_container} footer`}>
            <div className={styles.logo_container}>
                <div className={styles.img_container}>
                    <Link to="/">
                        <img src={logo} alt=""/>
                    </Link>
                </div>
                <p className={styles.logo_title}>{t("general.specialized_online_store")}</p>
                <div className={styles.footer_info}>
                    <div className={styles.connected}>
                        <p className={styles.connected_title}>STAY CONNECTED</p>
                        <div className={styles.icon_container}>
                            <Link to={'/'}>
                                <BsFacebook className={styles.icon} />
                                Facebook
                            </Link>
                        </div>
                        <div className={styles.icon_container}>
                            <Link to={'/'}>
                                <BsTwitter className={styles.icon} />
                                Twitter
                            </Link>
                        </div>
                        <div className={styles.icon_container}>
                            <Link to={'/'}>
                                <BsInstagram className={styles.icon} />
                                Instagram
                            </Link>
                        </div>
                    </div>
                    <div className={styles.contact}>
                        <p className={styles.connected_title}>CONTACT US</p>
                        <div className={styles.icon_container}>
                            <GrMail className={styles.icon} />
                            vangaspardo1@gmail.com
                        </div>
                        <div className={styles.icon_container}>
                            <FaPhone className={styles.icon} />
                            +37494173433 +37494093388
                        </div>
                        <div className={styles.icon_container}>
                    <span className={styles.footer_text}>
                        {t("footer.working_hours_1")}
                    </span>
                        </div>
                        <div className={styles.icon_container}>
                    <span className={styles.footer_text}>
                        {t("footer.working_hours_2")}
                    </span>
                        </div>
                        <div className={styles.icon_container}>
                            <FaLocationArrow className={styles.icon} />
                            svecha.am
                        </div>
                        <div className={styles.icon_container}>
                            <span className={styles.footer_text}>{t("footer.address")}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.links}>
                <p>
                    <Link to="/">{t("menu.main")}</Link>
                </p>
                <p>
                    <Link to="/about-us">{t("menu.about_us")}</Link>
                </p>
            </div>
            <div className={styles.map}>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1509.847426789802!2d43.83424762116414!3d40.81269885358293!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4041f9646abc9b0d%3A0x7ab780ceb428d3e8!2sAlexander%20Herzen%20St%2C%20Gyumri!5e0!3m2!1sen!2sam!4v1687952578379!5m2!1sen!2sam"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
            <div className={styles.contact_info}>
                <div className={styles.delivery}>
                    <div className={styles.delivery_title}>
                        <FaTruck className={`${styles.icon}`} />
                        {t('general.delivery')}
                    </div>
                    <div className={styles.phone_nums}>
                        <p>+374 94 17 34 33</p>
                        <p>+374 96 01 34 33</p>
                    </div>
                </div>
                <div className={`${styles.icon_container} ${styles.facebook}`}>
                    <Link to={'/'}>
                        <FaFacebook className={styles.icon} />
                        Facebook
                    </Link>
                </div>
                <div className={styles.icon_container}>
                    <FaWhatsapp className={styles.icon} />
                    +37494173433
                </div>
                <div className={styles.icon_container}>
                    <FaViber className={styles.icon} />
                    +37494173433
                </div>
            </div>
        </div>
    );
};

export default Footer;