import React, {useEffect, useState} from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignIn from './features/auth/SignIn'
import { useAppSelector, useAppDispatch } from './hooks/redux'
import Layout from './components/Layout'
import routes from './routes'
import {getCartFromLS} from "./helpers";
import {setCart} from "./features/cart/cartSlice";
import LeftSlide from "./components/LeftSlide/LeftSlide";

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
