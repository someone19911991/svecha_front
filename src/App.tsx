import React, {useEffect, useState} from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignIn from './features/auth/SignIn'
import { useAppSelector, useAppDispatch } from './hooks/redux'
import Layout from './components/Layout'
import routes from './routes'
import { useRefreshMutation } from './features/auth/authApiSlice'
import { setCredentials } from './features/auth/authSlice'
import {getCartFromLS} from "./helpers";
import {setCart} from "./features/cart/cartSlice";

const App = () => {
    const [initialized, setInitialized] = useState(false)
    const { user, accessToken } = useAppSelector(
        (state) => state.auth
    )
    const dispatch = useAppDispatch()
    const [refresh, { error, isLoading }] = useRefreshMutation()

    useEffect(() => {
        const getUserData = async () => {
            try{
                const userData = await refresh({}).unwrap()
                dispatch(setCredentials(userData))
                setInitialized(true)
                const cart = getCartFromLS()
                if(cart?.products?.length){
                    dispatch(setCart(cart))
                }
            }catch(err){
                setInitialized(true)
            }

        }
        getUserData()
    }, [])


    if (isLoading || !initialized) {
        return <h3>Loading...</h3>
    }

    return (
        <div className="app">
                {accessToken && (
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
                )}
                {!accessToken && (
                    <Routes>
                        {routes.publicRoutes.map((route) => (
                            <Route
                                key={route.path}
                                path={route.path}
                                element={<route.element />}
                            />
                        ))}
                        <Route path="*" element={<SignIn />}></Route>
                    </Routes>
                )}
        </div>
    )
}

export default App
