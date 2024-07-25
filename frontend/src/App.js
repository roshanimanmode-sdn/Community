import './styles.css';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./Components/Login/login";
import Home from "./Components/Home/home";
import Profile from './Components/Profile/profile';


function App() {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile/:id" element={<Profile />} />
      </Routes>
  );
}

export default App;
