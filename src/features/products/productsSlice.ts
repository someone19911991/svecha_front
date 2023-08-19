import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IProduct } from '../../interfaces'

interface IProductsState {
    products: IProduct[]
    filteredProducts: IProduct[]
    topSellingProducts: IProduct[]
}

const initialState: IProductsState = { products: [], filteredProducts: [], topSellingProducts: [] }

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProductsAction: (
            state,
            action: PayloadAction<{ products: IProduct[] }>
        ) => {
            const { products } = action.payload
            state.products = products
            state.filteredProducts = products
            state.topSellingProducts = products.filter(product => product.top_selling === 1)
        },
        filteredProducts: (
            state,
            action: PayloadAction<{
                clear_all?: boolean
                brands?: Array<string>
                electrodes_type?: Array<string>
                electrodes_number?: Array<string>
                seat_type?: Array<string>
                key_type?: Array<string>
                key_size?: Array<string>
                thread_size?: Array<string>
                plugs_number?: Array<string>
                contacts_number?: Array<string>
                contact_number?: Array<string>
                contact_type?: Array<string>
                wired?: Array<string>
                connection_types?: Array<string>
            }>
        ) => {
            const filterToApply = (product: IProduct) => {
                const { clear_all, brands, electrodes_type, electrodes_number, seat_type, key_type, key_size, thread_size, plugs_number, contacts_number, contact_number, wired, contact_type, connection_types } =
                    action.payload

                if(clear_all){
                    return state
                }

                let shouldReturnProduct = true
                if (brands?.length && !brands?.includes(product.brand)) {
                    shouldReturnProduct = false
                }
                if (
                    shouldReturnProduct &&
                    electrodes_type?.length &&
                    product?.electrode_type &&
                    !electrodes_type?.includes(product?.electrode_type)
                ) {
                    shouldReturnProduct = false
                }

                if (
                    shouldReturnProduct &&
                    electrodes_number?.length &&
                    product?.electrodes_number &&
                    !electrodes_number?.includes(product?.electrodes_number)
                ) {
                    shouldReturnProduct = false
                }
                if (
                    shouldReturnProduct &&
                    seat_type?.length &&
                    product?.seat_type &&
                    !seat_type?.includes(product?.seat_type)
                ) {
                    shouldReturnProduct = false
                }
                if (
                    shouldReturnProduct &&
                    key_type?.length &&
                    product?.key_type &&
                    !key_type?.includes(product?.key_type)
                ) {
                    shouldReturnProduct = false
                }
                if (
                    shouldReturnProduct &&
                    key_size?.length &&
                    product?.key_size &&
                    !key_size?.includes(product?.key_size)
                ) {
                    shouldReturnProduct = false
                }
                if (
                    shouldReturnProduct &&
                    thread_size?.length &&
                    product?.thread_size &&
                    !thread_size?.includes(`${product?.thread_size}`)
                ) {
                    shouldReturnProduct = false
                }
                if (
                    shouldReturnProduct &&
                    plugs_number?.length &&
                    product?.plugs_number &&
                    !plugs_number?.includes(`${product?.plugs_number}`)
                ) {
                    shouldReturnProduct = false
                }
                if (
                    shouldReturnProduct &&
                    contacts_number?.length &&
                    product?.contacts_number &&
                    !contacts_number?.includes(`${product?.contacts_number}`)
                ) {
                    shouldReturnProduct = false
                }

                if (
                    shouldReturnProduct &&
                    contact_type?.length &&
                    product?.contact_type &&
                    !contact_type?.includes(`${product?.contact_type}`)
                ) {
                    shouldReturnProduct = false
                }
                if (
                    shouldReturnProduct &&
                    wired?.length &&
                    product?.wired !== undefined
                ) {
                    if(wired?.includes('wired') && wired?.includes('not wired')){
                        shouldReturnProduct = true
                    }else if(wired?.includes('wired')){
                        shouldReturnProduct = !!product?.wired
                    }else if(wired?.includes('not wired')){
                        shouldReturnProduct = !product?.wired
                    }
                }
                if (
                    shouldReturnProduct &&
                    connection_types?.length &&
                    product?.connection_type &&
                    !connection_types.includes(product?.connection_type)
                ) {
                    shouldReturnProduct = false
                }
                if (
                    shouldReturnProduct &&
                    contact_number?.length &&
                    product?.contact_number &&
                    !contact_number.includes(product?.contact_number)
                ) {
                    shouldReturnProduct = false
                }
                return shouldReturnProduct
            }

            state.filteredProducts = state.products.filter((pr) =>
                filterToApply(pr)
            )
            // state.filter.brands = state.filter.brands ? [...state.filter, ...action.payload] : brands

            return state
        },
    },
})

export default productsSlice.reducer

export const { setProductsAction, filteredProducts } = productsSlice.actions
