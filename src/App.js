import React from 'react';
import logo from './logo.svg';
import Login from  './components/login/Login.tsx';
import Menu from './components/menu/Menu';

function App() {
  return (
    <div className="App">
      <Menu />
      <div className="Body"><p>Aquí va el body-content</p></div>
      <Login />
    </div>
  );
}

export default App;
