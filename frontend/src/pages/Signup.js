import { useState } from 'react'
import { useSignup } from "../hooks/useSignup"
import { useTheme } from '../context/ThemeContext'

const Signup = () => {
    const { darkMode } = useTheme()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { signup, error, isLoading } = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await signup(email, password)
    }

    const inputStyle = {
        padding: '8px',
        borderRadius: '6px',
        marginBottom: '10px',
        border: `1px solid ${darkMode ? '#555' : '#ccc'}`,
        backgroundColor: darkMode ? '#333' : '#fff',
        color: darkMode ? '#fff' : '#000',
        outline: 'none'
    }

    const buttonStyle = {
        padding: '8px 12px',
        borderRadius: '6px',
        backgroundColor: darkMode ? '#444' : '#fff',
        color: darkMode ? '#fff' : '#000',
        border: `1px solid ${darkMode ? '#666' : '#ccc'}`,
        cursor: 'pointer'
    }

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        backgroundColor: darkMode ? '#1c1c1c' : '#f9f9f9',
        padding: '20px',
        borderRadius: '10px',
        maxWidth: '350px',
        margin: '50px auto',
        boxShadow: darkMode ? '0 4px 8px rgba(0,0,0,0.6)' : '0 4px 8px rgba(0,0,0,0.2)'
    }

    const labelStyle = { color: darkMode ? '#fff' : '#000' }

    return (
        <form onSubmit={handleSubmit} style={formStyle}>
            <h3 style={{ color: darkMode ? '#fff' : '#000' }}>Sign up</h3>

            <label style={labelStyle}>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} required />

            <label style={labelStyle}>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle} required />

            <button type="submit" style={buttonStyle} disabled={isLoading}>
                Sign up
            </button>

            {error && <div style={{ color: 'red' }}>{error}</div>}
        </form>
    )
}

export default Signup
