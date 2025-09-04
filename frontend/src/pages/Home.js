import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'
import { useTheme } from '../context/ThemeContext'

const Home = ({ workouts }) => {
  const { darkMode } = useTheme()

  const homeStyle = {
    display: 'flex',
    flexDirection: 'row',
    gap: '20px',
    padding: '20px',
    backgroundColor: darkMode ? '#1c1c1c' : '#f9f9f9',
    minHeight: '100vh'
  }

  const workoutsStyle = {
    flex: 3,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  }

  const headerStyle = {
    fontSize: '28px',
    fontWeight: 'bold',
    padding: '10px 20px',
    borderRadius: '10px',
    backgroundColor: darkMode ? '#444' : '#e0e0e0',
    color: darkMode ? '#fff' : '#000',
    boxShadow: darkMode
      ? '0 4px 8px rgba(0,0,0,0.6)'
      : '0 4px 8px rgba(0,0,0,0.2)',
    alignSelf: 'flex-start',
    marginBottom: '20px'
  }

  const formContainerStyle = { flex: 1 }

  return (
    <div style={homeStyle}>
      <div style={workoutsStyle}>
        <div style={headerStyle}>Home</div>
        {workouts && workouts.map((workout) => (
          <WorkoutDetails key={workout._id || workout.title} workout={workout} />
        ))}
      </div>
      <div style={formContainerStyle}>
        <WorkoutForm />
      </div>
    </div>
  )
}

export default Home
