import React, {useEffect} from 'react';
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
import UploadDocument from './component/UploadDocument';
import { auth } from './firebase/firebase-init';
import { signOut } from 'firebase/auth';
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from 'react-router-dom';

const SESSION_TIMEOUT = 30 * 60 * 1000; 
let timeoutId = null;

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
  const navigate = useNavigate();
  const user = useAuthState(auth);

  
  const clearSession = () => {    
    localStorage.clear(); // Clear all localStorage
    signOut(auth);
    alert("Session expired. Please log in again.");
    navigate("/login"); // Redirect to the login page
  };

  const setSessionTimeout = () => {

    // Clear any previous timeout
    clearTimeout(timeoutId);
    // Set a new timeout
    timeoutId = setTimeout(() => {
      clearSession();
    }, SESSION_TIMEOUT);
  };

  // Reset session timeout on user activity
  const handleUserActivity = () => {
    localStorage.setItem("lastActivity", Date.now()); // Track last activity time
    setSessionTimeout(); // Reset session timeout on any user activity (click, scroll, etc.)
  };

  useEffect(() => {

    if (!user[0]) {
      return; // Don't run session timeout logic if the user is not authenticated
    }

    // Set up event listeners for user activity
    window.addEventListener("click", handleUserActivity);
    window.addEventListener("keypress", handleUserActivity);
    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("scroll", handleUserActivity);

    // Check session timeout on component mount
    const lastActivity = localStorage.getItem("lastActivity");
    const currentTime = Date.now();

    if ((lastActivity && currentTime - lastActivity > SESSION_TIMEOUT)) {
      clearSession(); // If the session is expired, clear it
    } else {
      setSessionTimeout(); // If the session is still valid, set a new timeout
    }

    // Clear timeout and remove event listeners when component unmounts
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("click", handleUserActivity);
      window.removeEventListener("keypress", handleUserActivity);
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("scroll", handleUserActivity);
    };
  }, [user]);

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
        <Route path="/admin-upload-document"  element= {<ProtectedRoute><UploadDocument/></ProtectedRoute>} />
      </Routes>

      { location.pathname.includes("admin") && 
            <SideBar/>}
    </>
  );
}

export default App;
