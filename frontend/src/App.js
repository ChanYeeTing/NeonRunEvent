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
import Status from './component/Status';
import Success from './component/SuccessPayment';
import Failed from './component/FailedPayment';
import AdminDashboard from './component/AdminDashboard';
import SideBar from './component/SideBar';
import ParticipantList from './component/ParticipantList';
import Ranking from './component/Ranking';
import KitCollection from './component/KitCollection';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import ProtectedRoute from './component/ProtectRoute';
import LoadingOverlay from './component/LoadingOverlay';

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
  const [loading, setLoading] = React.useState(true);

  return (
    <>
      <Navbar setLoading={setLoading} />
      <LoadingOverlay loading={loading} />
      <Routes>
        <Route path="/" exact Component={Home} />
        <Route path="/register" exact Component={Register} />
        <Route path="/info" exact Component={Info} />
        <Route path="/post-event" exact Component={PostEvent} />
        <Route path="/about-us" exact Component={AboutUs} />
        <Route path="/login" exact Component={Authentication} />
        <Route path="/payment" exact Component={Payment} />
        <Route path="/status" exact Component={Status}/>
        <Route path="/success" exact Component={Success}/>
        <Route path="/failed" exact Component={Failed}/>
        <Route path="/admin-dashboard" element= {<ProtectedRoute><AdminDashboard/></ProtectedRoute>} />
        <Route path="/admin-participant-list" element= {<ProtectedRoute><ParticipantList/></ProtectedRoute>} />
        <Route path="/admin-ranking-list" element= {<ProtectedRoute><Ranking/></ProtectedRoute>} />
        <Route path="/admin-race-kit"  element= {<ProtectedRoute><KitCollection/></ProtectedRoute>} />
      </Routes>

      { location.pathname.includes("admin") && 
            <SideBar/>}
    </>
  );
}

export default App;
