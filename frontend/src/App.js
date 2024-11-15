import React from 'react';
import './App.css';
import Navbar from './component/Navbar';
import Home from './component/Home';
import Info from './component/Info';
import Register from './component/Register';
import PostEvent from './component/PostEvent';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <header className="App-header">
        <Navbar/>
        <Routes>
          <Route path='/' exact Component={Home}/>
          <Route path='/register' exact Component={Register}/>
          <Route path='/info' exact Component={Info}/>
          <Route path='/post-event' exact Component={PostEvent}/>
        </Routes>
      </header>
    </div>
    </BrowserRouter>
  );
}

export default App;
