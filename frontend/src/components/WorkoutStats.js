import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { useTheme } from '../context/ThemeContext'

const WorkoutStats = ({ workouts }) => {
  const { darkMode } = useTheme()

  // Aggregate total load per day
  const dataMap = {}
  workouts.forEach(w => {
    const date = new Date(w.createdAt).toLocaleDateString()
    if (!dataMap[date]) dataMap[date] = 0
    dataMap[date] += w.load
  })

  const data = Object.keys(dataMap).map(date => ({
    date,
    totalLoad: dataMap[date]
  }))

  // Chart colors
  const strokeColor = darkMode ? '#82ca9d' : '#8884d8'
  const gridColor = darkMode ? '#555' : '#ccc'
  const textColor = darkMode ? '#fff' : '#000'

  return (
    <div style={{ margin: '20px 0' }}>
      <h3 style={{ color: textColor }}>Workout Stats</h3>
      <LineChart width={600} height={300} data={data}>
        <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
        <XAxis dataKey="date" stroke={textColor} />
        <YAxis stroke={textColor} />
        <Tooltip contentStyle={{ backgroundColor: darkMode ? '#333' : '#fff', color: textColor }} />
        <Legend wrapperStyle={{ color: textColor }} />
        <Line type="monotone" dataKey="totalLoad" stroke={strokeColor} />
      </LineChart>
    </div>
  )
}

export default WorkoutStats
