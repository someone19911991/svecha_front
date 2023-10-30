import React, {useEffect, useState} from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header/Header'
import Search from './Search/Search'
import '../pages/Main/main.css'
import Footer from "./Footer/Footer";

const setActive = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'active-link' : ''
const setActiveStyle = ({ isActive }: { isActive: boolean }) =>
    isActive
        ? { color: 'var(--color-active)' }
        : { color: 'var(--color-inactive)' }

const Layout = () => {
    const [headerComponentHeight, setHeaderComponentHeight] = useState(0)

    useEffect(() => {
        const headerComponent = document.querySelector<HTMLDivElement>('.header')
        if(headerComponent){
            const headerComponentH = headerComponent.clientHeight + 25;
            setHeaderComponentHeight(headerComponentH)
        }
    }, [])

    return (
        <div className="main-wrapper">
            <Header />
            {/*<div style={{marginTop: `${headerComponentHeight}px`}}>*/}
            <div className="outlet">
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default Layout
