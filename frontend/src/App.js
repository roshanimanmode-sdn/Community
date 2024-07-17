import './App.css';
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Home } from './Components/Home/home';
import { Login } from './Components/Login/login';
import { Signup } from './Components/Signup/signup';
import { Dashboard } from './Components/Dashboard/dashboard';
import { Notification } from './Components/Notification/notification';
import ProtectedOutlet from './Components/Protected';



function App() {
  return (
    <div>
      <ToastContainer />
      <Home />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<ProtectedOutlet />}>  {/* It works as a authGuard (prevent access to pages that is not accessible without login)*/}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/notification" element={<Notification />} />
        </Route>
      </Routes>


    </div>
  );
}

export default App;
