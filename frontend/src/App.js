import React from 'react';
import './App.css';
import Navbar from './component/Navbar';
import Home from './component/Home';
import Info from './component/Info';
import Register from './component/Register';
import PostEvent from './component/PostEvent';
import AboutUs from './component/AboutUS';
import Authentication from './component/Authentication';
import Payment from './component/Payment';
import AdminDashboard from './component/AdminDashboard';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <AppContent />
        </header>
      </div>
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();

  return (
    <>
      {!location.pathname.includes("admin") && <Navbar />}
      

      <Routes>
        <Route path="/" exact Component={Home} />
        <Route path="/register" exact Component={Register} />
        <Route path="/info" exact Component={Info} />
        <Route path="/post-event" exact Component={PostEvent} />
        <Route path="/about-us" exact Component={AboutUs} />
        <Route path="/login" exact Component={Authentication} />
        <Route path="/payment" exact Component={Payment} />
        <Route path="/admin-dashboard" exact Component={AdminDashboard} />
      </Routes>
    </>
  );
}

export default App;
