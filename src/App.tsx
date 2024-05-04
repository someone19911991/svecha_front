import React, {useEffect, useState} from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignIn from './features/auth/SignIn'
import { useAppSelector, useAppDispatch } from './hooks/redux'
import Layout from './components/Layout'
import routes from './routes'
import {getCartFromLS} from "./helpers";
import {setCart} from "./features/cart/cartSlice";
import LeftSlide from "./components/LeftSlide/LeftSlide";
import { Helmet } from 'react-helmet';
import logo from "./imgs/logo192.png"

const App = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        const cart = getCartFromLS()
        if(cart?.products.length){
            dispatch(setCart(cart))
        }
    }, [])

    return (
        <div className="app">
            <Helmet>
                <title>{'Your Website Title'}</title>
                <meta property="og:title" content={'Spark plugs\' specialized online shop'} />
                <meta property="og:description" content={'Shop high-quality car parts online at our store; Spark plugs\' specialized online shop; Սվեչեքի մասնագիտացված օնլայն խանութ; Սվեչեքի  օնլայն խանութ Հայաստանում'} />
                <meta property="og:image" content={logo} />
                <meta property="og:url" content={'https://www.svecha.am'} />
                {/* Add other meta tags as needed */}
            </Helmet>
            <LeftSlide />
            <Routes>
                <Route path="/" element={<Layout />}>
                    {routes.privateRoutes.map((route) => (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={<route.element />}
                        />
                    ))}
                </Route>
                <Route path="*" element={<Navigate to="/" />}></Route>
            </Routes>
        </div>
    )
}

export default App
