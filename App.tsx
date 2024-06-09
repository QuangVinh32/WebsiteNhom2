import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import Context from './Context';
import './App.css';

const App = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    return null;
  }

  return (
    <div style={{ padding: '20px' }}>
      <button onClick={context.toggleTheme}>Toggle theme</button>
      <Context />
    </div>
  );
};

export default App;
