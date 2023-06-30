import apiSlice from '../../app/api/apiSlice'
import { ICategory } from '../../interfaces'
import {transformErrorResponseHandler} from "../../helpers";

const clientsCountApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getClientCounts: builder.query<number, void>({
            query: () => ({
                url: '/clients-count',
            }),
            transformErrorResponse: transformErrorResponseHandler
        }),
    }),
})

export const { useGetClientCountsQuery } = clientsCountApiSlice
