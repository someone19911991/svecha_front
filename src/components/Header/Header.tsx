import React, {useEffect} from 'react'
import './header.css'
import logo from '../../imgs/logo.jpg'
import { Link, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { useAppSelector } from '../../hooks/redux'
import TopBanner from '../TopBanner/TopBanner'
import Search from '../Search/Search'
import {useTranslation} from "react-i18next";
import {ImArrowDown} from "react-icons/im"
import {getCartFromLS} from "../../helpers";

const Header = () => {
    const {t} = useTranslation()
    const { totalProductsCount } = useAppSelector((state) => state.cart)

    const handleSlideRight = () => {
        const leftSlide = document.querySelector<HTMLDivElement>('.left-slide')
        if(leftSlide){
            leftSlide.style.transform = "translate(0)"
        }
    }

    return (
        <div className="header">
            <ImArrowDown onClick={handleSlideRight} className="slider_arrow" />
            <TopBanner />
            <div className="header_content app_container">
                <div className="logo-container">
                    <div>
                        <Link to="/">
                            <img src={logo} alt="" />
                        </Link>
                        <p className="logo-text">
                            <b>{t("general.specialized_online_store")}</b>
                        </p>
                    </div>
                    <NavLink to="/cart">
                        <div
                            className="logo_cart"
                            data-count={totalProductsCount}
                        >
                            <FontAwesomeIcon icon={faCartShopping} />
                        </div>
                    </NavLink>
                </div>
                <Search />
                <div className="header_cart">
                    <NavLink
                        className="header_cart_link"
                        data-count={totalProductsCount}
                        to="/cart"
                    >
                        {t("general.cart")} <FontAwesomeIcon icon={faCartShopping} />
                    </NavLink>
                </div>
            </div>
            {/*<Slider/>*/}
        </div>
    )
}

export default Header
