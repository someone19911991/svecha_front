import React, { useState } from 'react'
import { useSignInMutation } from './authApiSlice'
import { useAppDispatch } from '../../hooks/redux'
import { setCredentials } from './authSlice'

const SignIn = () => {
    const dispatch = useAppDispatch()
    const [signIn, { error, isLoading }] = useSignInMutation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async () => {
        try {
            const result = await signIn({ email, password }).unwrap()
            dispatch(setCredentials(result))
        } catch (err) {}
    }

    return (
        <div className="sign-in">
            <div>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div>
                <button onClick={handleSubmit}>Sign In</button>
            </div>
        </div>
    )
}

export default SignIn
