import { useState, useEffect } from 'react';
import Sortify from './Sortify/Sortify';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <div className="App">
      <Sortify darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    </div>
  );
}

export default App;