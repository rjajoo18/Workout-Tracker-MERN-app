import { useTheme } from '../context/ThemeContext';

const DarkModeToggle = () => {
  const { darkMode, setDarkMode } = useTheme();
  return (
    <button 
      onClick={() => setDarkMode(!darkMode)} 
      style={{ margin: '10px', padding: '5px 10px' }}
    >
      {darkMode ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
};

export default DarkModeToggle;
