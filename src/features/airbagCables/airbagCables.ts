import apiSlice from '../../app/api/apiSlice'
import { IAirbagCable } from '../../interfaces'

const airbagCablesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAirbagCables: builder.query<IAirbagCable[], void>({
            query: () => '/product/airbag_cables',
        }),
    }),
})

export const { useLazyGetAirbagCablesQuery } = airbagCablesApiSlice
