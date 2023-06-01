import apiSlice from '../../app/api/apiSlice'
import {IAuth, ISignIn} from '../../interfaces'

const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        signIn: builder.mutation<IAuth, ISignIn>({
            query: (data) => ({
                url: '/auth/sign-in',
                method: 'post',
                body: data,
            }),
        }),
        refresh: builder.mutation<IAuth, {}>({
            query: (data ) => ({
                url: '/auth/refresh',
                method: 'post',
            }),
        }),
    }),
})

export const { useSignInMutation, useRefreshMutation } = authApiSlice
