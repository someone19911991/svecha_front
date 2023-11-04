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
        getProductsByName: builder.query<IProduct[], string>({
            query: (param) => ({
                url: `/models/${param}`,
            }),
        }),
        getModels: builder.query<Array<{img: string, name: string, id: number}>, void>({
            query: () => ({
                url: `/models`,
            }),
            transformErrorResponse: (
                response: { status: string | number; data?: any },
                meta,
                arg
            ) => {
                return response?.data?.error || 'Something went wrong!'
            }
        }),
        searchProduct:builder.query<IProduct[], string>({
            query: (param) => {
                const encodedParam = encodeURIComponent(param);
                return `/product/search?term=${encodedParam}`
            }
        })
    })
})

export const {useGetModelsQuery, useGetProductsQuery, useLazySearchProductQuery, useLazyGetProductsQuery, useLazyGetProductsByCategoryQuery, useLazyGetProductQuery, useGetProductsByNameQuery} = productsApiSlice

export default productsApiSlice