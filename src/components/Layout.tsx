import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header/Header'
import Search from './Search/Search'
import '../pages/Main/main.css'

const setActive = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'active-link' : ''
const setActiveStyle = ({ isActive }: { isActive: boolean }) =>
    isActive
        ? { color: 'var(--color-active)' }
        : { color: 'var(--color-inactive)' }

const Layout = () => {
    const location = useLocation()

    return (
        <div>
            <Header />
            {/*{location.pathname !== '/cart' && <Search />}*/}
            <Outlet />
        </div>
    )
}

export default Layout
