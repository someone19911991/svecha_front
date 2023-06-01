import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IProduct } from '../../interfaces'
import {addCartToLS, getCartFromLS} from "../../helpers";

export interface ICartItem {
    count_original: number
    count_copy: number
    product: IProduct
    product_id: number
}

export interface ICartState {
    products: ICartItem[]
    totalProductsCount: number
}

const initialState: ICartState = { products: [], totalProductsCount: 0 }

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart: (state, action: PayloadAction<ICartState>) => {
            state.products = action.payload.products
            state.totalProductsCount = action.payload.totalProductsCount
        },
        addToCart: (state, action: PayloadAction<ICartItem>) => {
            const { count_original, count_copy, product, product_id } =
                action.payload
            const cartProduct = state.products.find(product => product.product_id === product_id)
            if(cartProduct){
                if(count_original){
                    if(count_original > cartProduct.product.count_original || count_original <= 0){
                        return state
                    }else{
                        const updatedCart = state.products.map(product => {
                            if(product.product_id === product_id){
                                state.totalProductsCount = state.totalProductsCount - product.count_original + count_original
                                product.count_original = count_original
                            }
                            return product
                        })
                        state.products = updatedCart
                    }
                }else if(count_copy){
                    if(count_copy > cartProduct.product.count_copy || count_copy <= 0){
                        return state
                    }else{
                        const updatedCart = state.products.map(product => {
                            if(product.product_id === product_id){
                                state.totalProductsCount = state.totalProductsCount - product.count_copy + count_copy
                                product.count_copy = count_copy
                            }
                            return product
                        })
                        state.products = updatedCart
                    }
                }
            }else{
                if(count_original){
                    state.totalProductsCount += count_original
                }else if(count_copy){
                    state.totalProductsCount += count_copy
                }
                state.products = [...state.products, {product, count_original, count_copy, product_id}]
            }
            addCartToLS(state)
        },
        removeProductFromCart: (
            state,
            action: PayloadAction<{ product_id: number, product_type: string }>
        ) => {
            const { product_id, product_type } = action.payload
            let {totalProductsCount} = state
            const updatedProducts = state.products.reduce((acc: Array<ICartItem>, productItem) => {
                if(productItem.product_id === product_id){
                    if(product_type === 'original'){
                        totalProductsCount -=
                            productItem.count_original
                        productItem.count_original = 0
                    }else if(product_type === 'copy'){
                        totalProductsCount -=
                            productItem.count_copy
                        productItem.count_copy = 0
                    }
                }
                if(productItem.count_original || productItem.count_copy){
                    acc.push(productItem)
                }
                return acc
            }, [])
            state.products = updatedProducts
            state.totalProductsCount = totalProductsCount
            addCartToLS(state)
        },
        clearCart: (state) => {
            state.products = []
            state.totalProductsCount = 0
            addCartToLS(state)
        },
    },
})

export default cartSlice.reducer

export const { addToCart, clearCart, removeProductFromCart, setCart } = cartSlice.actions
