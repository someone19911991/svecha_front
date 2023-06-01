import apiSlice from '../../app/api/apiSlice'
import { IIgnitionCoil } from '../../interfaces'

const ignitionCoilsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getIgnitionCoils: builder.query<IIgnitionCoil[], void>({
            query: () => '/product/ignition_coils',
        }),
    }),
})

export const { useGetIgnitionCoilsQuery, useLazyGetIgnitionCoilsQuery } = ignitionCoilsApiSlice
