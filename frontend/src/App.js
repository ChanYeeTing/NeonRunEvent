import React from 'react';
import './App.css';
import Navbar from './component/Navbar';
import Home from './component/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <header className="App-header">
        <Navbar/>
        <Routes>
          <Route path='/' exact Component={Home}/>
        </Routes>
      </header>
    </div>
    </BrowserRouter>
  );
}

export default App;
