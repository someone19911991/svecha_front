import apiSlice from "../../app/api/apiSlice";

const topSellersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        checkIdentity: builder.mutation<{ls: string}, {product_id: string, ls: string }>({
            query: (body) => ({
                url: `/top-sellers`,
                method: 'POST',
                body,
            }),
            transformErrorResponse: (
                response: { status: string | number; data?: any },
                meta,
                arg
            ) => {
                return response?.data?.message || 'Something went wrong!'
            }
        })
    })
})

export const {useCheckIdentityMutation} = topSellersApiSlice

export default topSellersApiSlice