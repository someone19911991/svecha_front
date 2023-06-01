import apiSlice from "../../app/api/apiSlice";
import {IBrand} from "../../interfaces";

const brandsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getBrands: builder.query<IBrand[], void>({
            query: () => ({
                url: '/brand',
            })
        })
    })
})

export const {useGetBrandsQuery, useLazyGetBrandsQuery} = brandsApiSlice