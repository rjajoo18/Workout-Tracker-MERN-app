import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// Dark mode
import { ThemeProvider, useTheme } from './context/ThemeContext'
import DarkModeToggle from './components/DarkModeToggle'

// Pages and components
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'
import WorkoutStats from './components/WorkoutStats'
import WorkoutFilter from './components/WorkoutFilter'

function AppContent() {
  const { darkMode } = useTheme()
  const { user } = useAuthContext()

  // State for all workouts
  const [workouts, setWorkouts] = useState([])
  const [filteredWorkouts, setFilteredWorkouts] = useState([])

  // Fetch workouts from backend when user logs in
  useEffect(() => {
    if (!user) return

    const fetchWorkouts = async () => {
      const response = await fetch('/api/workouts', {
        headers: { 'Authorization': `Bearer ${user.token}` }
      })
      const data = await response.json()
      if (response.ok) {
        setWorkouts(data)
        setFilteredWorkouts(data) // initial filtered list = all workouts
      }
    }

    fetchWorkouts()
  }, [user])

  return (
    <div className={darkMode ? 'dark' : 'light'} style={{ minHeight: '100vh', padding: '10px' }}>
      <BrowserRouter>
        <Navbar />
        <DarkModeToggle />

        <div className="pages">
          <Routes>
            <Route 
              path="/"
              element={
                user ? (
                  <div>
                    {/* Filter input */}
                    <WorkoutFilter workouts={workouts} setFiltered={setFilteredWorkouts} />

                    {/* Graph */}
                    <WorkoutStats workouts={filteredWorkouts} />

                    {/* Home list */}
                    <Home workouts={filteredWorkouts} />
                  </div>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route 
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
            <Route 
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App
