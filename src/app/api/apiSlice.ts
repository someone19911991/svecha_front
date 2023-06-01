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

const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ['SparkPlugs'],
    endpoints: () => ({}),
})

export default apiSlice
