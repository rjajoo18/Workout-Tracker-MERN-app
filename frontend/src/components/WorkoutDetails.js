import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { useTheme } from '../context/ThemeContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({ workout }) => {
    const { dispatch } = useWorkoutsContext()
    const { user } = useAuthContext()
    const { darkMode } = useTheme()

    const handleClick = async () => {
        if(!user) return
        const response = await fetch('/api/workouts/' + workout._id, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${user.token}` }
        })
        const json = await response.json()
        if(response.ok) dispatch({ type: 'DELETE_WORKOUT', payload: json })
    }

    const workoutStyle = {
        backgroundColor: darkMode ? '#333' : '#fff',
        color: darkMode ? '#fff' : '#000',
        padding: '15px',
        borderRadius: '8px',
        boxShadow: darkMode ? '0 2px 5px rgba(0,0,0,0.5)' : '0 2px 5px rgba(0,0,0,0.1)',
        position: 'relative'
    }

    const deleteStyle = {
        position: 'absolute',
        top: '10px',
        right: '10px',
        cursor: 'pointer',
        color: darkMode ? '#ff6b6b' : '#d11a2a'
    }

    return (
        <div style={workoutStyle}>
            <h4>{workout.title}</h4>
            <p><strong>Load(kg): </strong>{workout.load}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
            <span className="material-symbols-outlined" onClick={handleClick} style={deleteStyle}>
                delete
            </span>
        </div>
    )
}

export default WorkoutDetails
