import { useState } from "react"
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from "../hooks/useAuthContext"
import { useTheme } from '../context/ThemeContext'

const WorkoutForm = () => {
    const { dispatch } = useWorkoutsContext()
    const { user } = useAuthContext()
    const { darkMode } = useTheme()

    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!user) {
            setError('You must be logged in')
            return
        }

        const workout = { title, load, reps }

        const response = await fetch('/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields || [])
        } else {
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            setEmptyFields([])
            dispatch({ type: 'CREATE_WORKOUT', payload: json })
        }
    }

    const inputStyle = (field) => ({
        padding: '8px',
        marginBottom: '10px',
        borderRadius: '6px',
        backgroundColor: darkMode ? '#333' : '#fff',
        color: darkMode ? '#fff' : '#000',
        border: `1px solid ${emptyFields.includes(field) ? 'red' : darkMode ? '#555' : '#ccc'}`,
        outline: 'none'
    })

    const buttonStyle = {
        padding: '8px 12px',
        borderRadius: '6px',
        backgroundColor: darkMode ? '#444' : '#fff',
        color: darkMode ? '#fff' : '#000',
        border: `1px solid ${darkMode ? '#666' : '#ccc'}`,
        cursor: 'pointer'
    }

    return (
        <form className="create" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h3 style={{ color: darkMode ? '#fff' : '#000' }}>Add a New Workout</h3>

            <label style={{ color: darkMode ? '#fff' : '#000' }}>Exercise Title:</label>
            <input 
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={inputStyle('title')}
            />

            <label style={{ color: darkMode ? '#fff' : '#000' }}>Load (in kg):</label>
            <input 
                type="number"
                value={load}
                onChange={(e) => setLoad(e.target.value)}
                style={inputStyle('load')}
            />

            <label style={{ color: darkMode ? '#fff' : '#000' }}>Reps:</label>
            <input 
                type="number"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
                style={inputStyle('reps')}
            />

            <button type="submit" style={buttonStyle}>Add Workout</button>

            {error && (
                <div style={{ color: 'red', marginTop: '10px' }}>
                    <p>{error}</p>
                    {emptyFields.length > 0 && <p>Missing fields: {emptyFields.join(', ')}</p>}
                </div>
            )}
        </form>
    )
}

export default WorkoutForm
