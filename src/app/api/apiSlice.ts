import {
    BaseQueryFn,
    createApi,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'
import { setCredentials, logout } from '../../features/auth/authSlice'
import { IAuth } from '../../interfaces'
import { RootState } from '../../store/store'

const baseUrl = 'http://localhost:5000/api'
// const baseUrl = 'https://www.back.svecha.am/api'

const baseQuery = fetchBaseQuery({
    baseUrl,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const state = getState() as RootState
        const { accessToken } = state.auth
        if (accessToken) {
            headers.set('authorization', `Bearer ${accessToken}`)
        }
        return headers
    },
})

const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    if (result.error && result.error.status === 401) {
        const refreshResult = await baseQuery(
            { url: '/auth/refresh', method: 'POST' },
            api,
            extraOptions
        )
        const data = refreshResult.data as IAuth
            if (data) {
                api.dispatch(setCredentials(data))
                result = await baseQuery(args, api, extraOptions)
            } else {
                api.dispatch(logout())
            }
    }

    return result
}

const apiSlice_ = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({}),
})

const apiSlice = apiSlice_.enhanceEndpoints({addTagTypes: ["Product"]})

export default apiSlice
