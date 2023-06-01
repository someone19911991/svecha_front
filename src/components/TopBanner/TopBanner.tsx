import React from 'react'
import styles from './topBanner.module.css'
import { FaFacebook, FaWhatsapp, FaViber, FaTruck } from 'react-icons/fa'

const TopBanner = () => {
    return (
        <div className={styles.top_banner_wrapper}>
            <div className="app_container">
                <div className={styles.top_banner}>
                    <div className={styles.delivery}>
                        <div className={styles.delivery_title}>
                            <span>DELIVERY </span>
                            <FaTruck className={`${styles.icon}`} />
                        </div>
                        <div className={styles.phone_nums}>
                            <p>+374 94 17 34 33</p>
                            <p>+374 96 01 34 33</p>
                        </div>
                    </div>
                    <div className={styles.icon_container}>
                        <FaFacebook className={styles.icon} />
                        <a href="https://www.facebook.com/profile.php?id=100009318679726">Facebook</a>
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
        </div>
    )
}

export default TopBanner
