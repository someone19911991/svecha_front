import apiSlice from '../../app/api/apiSlice'
import { ICategory } from '../../interfaces'
import {transformErrorResponseHandler} from "../../helpers";

const categoriesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query<ICategory[], void>({
            query: () => ({
                url: '/category',
            }),
            transformErrorResponse: transformErrorResponseHandler
        }),
        getCategory: builder.query<ICategory, number>({
            query: (categoryId) => ({
                url: `category/${categoryId}`,
            }),
        }),
    }),
})

export const { useGetCategoriesQuery, useGetCategoryQuery, useLazyGetCategoriesQuery } = categoriesApiSlice
