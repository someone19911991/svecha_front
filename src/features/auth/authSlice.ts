import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IAuth, IUser } from '../../interfaces'

const initialState: IAuth = { user: {} as IUser, accessToken: '' }

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<IAuth>) => {
            const { user, accessToken } = action.payload
            state.user = user
            state.accessToken = accessToken
        },
        logout: (state) => {
            state.user = {} as IUser
            state.accessToken = ''
        },
    },
})

export const { setCredentials, logout } = authSlice.actions

export default authSlice.reducer
