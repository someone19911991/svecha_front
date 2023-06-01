import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
    IProduct,
} from '../../interfaces'

interface ICompareState {
    compareCategory: string
    products: IProduct[]
}

const initialState: ICompareState = { products: [], compareCategory: '' }

const compareSlice = createSlice({
    name: 'compare',
    initialState,
    reducers: {
        setCompareCategory: (
            state,
            action: PayloadAction<{ category: string }>
        ) => {
            const { category } = action.payload
            state.compareCategory = category
        },
        addRemoveCompareProduct: (
            state,
            action: PayloadAction<{ product: IProduct }>
        ) => {

                const { product } = action.payload
                if(!state.products.length){
                    state.compareCategory = product.category_name
                }
                const compareProduct = state.products.find(productItem => productItem.product_id === product.product_id)
                console.log({compareProduct})
                if(compareProduct){
                    state.products = state.products.filter(productItem => productItem.product_id !== product.product_id)
                }else{
                    if (state.products.length < 4) {
                        state.products = [...state.products, product]
                    }
                }
        },
        removeAllProducts: (state) => {
            state.compareCategory = ''
            state.products = []
        },
        removeCompareProduct: (
            state,
            action: PayloadAction<{ product_id: number }>
        ) => {
            const { product_id } = action.payload
            const productsToSet = state.products.filter(
                (product) => product.product_id !== product_id
            )
            state.products = productsToSet
        },
    },
})

export const { setCompareCategory, addRemoveCompareProduct, removeCompareProduct, removeAllProducts } = compareSlice.actions

export default compareSlice.reducer
