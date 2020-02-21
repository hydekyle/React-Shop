import React from 'react';
import logo from './logo.svg';
import Login from  './components/login/Login.tsx';
import Menu from './components/menu/Menu';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <i class="fas fa-home" />
      <Menu />
      <div className="Body"><p>Aquí va el body-content</p></div>
      <i class="fab fa-font-awesome"></i>
      <Login />
    </div>
  );
}

export default App;
