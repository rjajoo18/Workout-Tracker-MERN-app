import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'

const WorkoutFilter = ({ workouts, setFiltered }) => {
  const [filter, setFilter] = useState('')
  const { darkMode } = useTheme()

  const handleChange = (e) => {
    const value = e.target.value
    setFilter(value)
    const filtered = workouts.filter(w =>
      w.title.toLowerCase().includes(value.toLowerCase())
    )
    setFiltered(filtered)
  }

  const inputStyle = {
    padding: '5px',
    width: '200px',
    margin: '10px 0',
    backgroundColor: darkMode ? '#333' : '#fff',
    color: darkMode ? '#fff' : '#000',
    border: `1px solid ${darkMode ? '#555' : '#ccc'}`
  }

  return (
    <input
      type="text"
      placeholder="Search workouts"
      value={filter}
      onChange={handleChange}
      style={inputStyle}
    />
  )
}

export default WorkoutFilter
