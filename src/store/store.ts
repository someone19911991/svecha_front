import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authSliceReducer from '../features/auth/authSlice'
import apiSlice from '../app/api/apiSlice'
import cartSlice from "../features/cart/cartSlice";
import compareSlice from "../features/compare/compareSlice";
import productsSlice from "../features/products/productsSlice";

const rootReducer = combineReducers({
    auth: authSliceReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSlice,
    compare: compareSlice,
    products: productsSlice
})

const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(apiSlice.middleware),
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
export default setupStore()
