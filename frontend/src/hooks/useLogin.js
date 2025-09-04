// useLogin.js
import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await fetch('/api/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })

            const json = await response.json()

            if (!response.ok) {
                setError(json.error || 'Login failed')
                setIsLoading(false)
                return
            }

            // Save user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            // Update Auth Context
            dispatch({ type: 'LOGIN', payload: json })

        } catch (err) {
            setError('Network error. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return { login, isLoading, error }
}
