import apiSlice from "../../app/api/apiSlice";
import {IProduct} from "../../interfaces";

const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProduct:builder.query<IProduct, string>({
            query: (param) => `/product/${param}`,
            providesTags: (result) => ['Product'],
        }),
        getProducts:builder.query<IProduct[], void>({
            query: () => "/product",
            providesTags: (result) => ['Product'],
        }),
        getProductsByCategory:builder.query<IProduct[], string>({
            query: (param) => `/product/${param}`,
            providesTags: (result) => ['Product'],
        }),
        searchProduct:builder.query<IProduct[], string>({
            query: (param) => `/product/search/${param}`
        })
    })
})

export const {useGetProductsQuery, useLazySearchProductQuery, useLazyGetProductsQuery, useLazyGetProductsByCategoryQuery, useLazyGetProductQuery} = productsApiSlice

export default productsApiSlice