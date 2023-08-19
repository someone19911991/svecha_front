import React, { ChangeEvent } from 'react'
import styles from './topBanner.module.css'
import { FaFacebook, FaWhatsapp, FaViber, FaTruck } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'

const TopBanner = () => {
    const { i18n, t } = useTranslation()
    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng)
    }
    const handleChangeLng = (e: ChangeEvent<HTMLSelectElement>) => {
        changeLanguage(e.target.value)
    }

    return (
        <div className={styles.top_banner_wrapper}>
            <div className="app_container">
                <div className={styles.top_banner}>
                    <div className={styles.delivery}>
                        <div className={styles.delivery_title}>
                            <FaTruck className={`${styles.icon}`} />
                            <span>{t('general.delivery')} </span>
                        </div>
                        <div className={styles.phone_nums}>
                            <p>+374 94 09 33 88</p>
                            <p>+374 94 17 34 33</p>
                        </div>

                        <div className={styles.phone_nums}>
                            <p>+374 96 01 34 33</p>
                            <p>+374 91 09 33 88</p>
                        </div>
                    </div>
                    <div className={styles.icon_container}>
                        <FaFacebook className={styles.icon} />
                        <a href="https://www.facebook.com/profile.php?id=100009318679726">
                            Facebook
                        </a>
                    </div>
                    <div className={styles.icon_container}>
                        <FaWhatsapp className={styles.icon} />
                        +37494173433
                    </div>
                    <div className={styles.icon_container}>
                        <FaViber className={styles.icon} />
                        +37494173433
                    </div>
                    <div>
                        <select className={styles.language} onChange={handleChangeLng}>
                            <option value="am">AM</option>
                            <option value="ru">RU</option>
                            <option value="en">EN</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopBanner
