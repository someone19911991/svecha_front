import React from 'react'
import './header.css'
import logo from '../../imgs/logo.jpg'
import { Link, NavLink } from 'react-router-dom'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartShopping} from "@fortawesome/free-solid-svg-icons";
import {useAppSelector} from "../../hooks/redux";
import TopBanner from "../TopBanner/TopBanner";
import Search from "../Search/Search";

const Header = () => {
    const {totalProductsCount} = useAppSelector(state => state.cart)
    return (
        <div className="header">
            <TopBanner/>
            <div className="header_content app_container">
                <div className="logo-container">
                    <Link to="/">
                        <img src={logo} alt="" />
                    </Link>
                    <p className="logo-text">«Սվեչեքի» մասնագիտացված առցանց խանութ</p>
                </div>
                <Search/>
                <div className="header_cart">
                    <NavLink className="header_cart_link" data-count={totalProductsCount} to="/cart">Cart <FontAwesomeIcon icon={faCartShopping} /></NavLink>
                </div>
            </div>
        </div>
    )
}

export default Header
