import apiSlice from "../../app/api/apiSlice";
import {IProduct} from "../../interfaces";

const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProduct:builder.query<IProduct, string>({
            query: (param) => `/product/${param}`
        }),
        getProducts:builder.query<IProduct[], void>({
            query: () => "/product",
        }),
        getProductsByCategory:builder.query<IProduct[], string>({
            query: (param) => `/product/${param}`
        }),
        searchProduct:builder.query<IProduct[], string>({
            query: (param) => `/product/search/${param}`
        })
    })
})

export const {useGetProductsQuery, useLazySearchProductQuery, useLazyGetProductsQuery, useLazyGetProductsByCategoryQuery, useLazyGetProductQuery} = productsApiSlice

export default productsApiSlice