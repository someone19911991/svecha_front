import apiSlice from "../../app/api/apiSlice";
import {IMessage, IOrder, IProductOrder} from "../../interfaces";

const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOnOrder: builder.mutation<IMessage, IOrder>({
            query: (body) => ({
                url: "/order/on-order",
                method: "POST",
                body
            })
        }),
        createOrder: builder.mutation<IMessage, IProductOrder>({
            query: (body) => ({
                url: "/order",
                method: "POST",
                body
            }),
            transformErrorResponse: (
                response: { status: string | number; data?: any },
                meta,
                arg
            ) => {
                return response?.data?.error || 'Something went wrong!'
            },
            invalidatesTags: ['Product'],
        })
    })
})

export const {useCreateOnOrderMutation, useCreateOrderMutation} = orderApiSlice

export default orderApiSlice