import './App.css';
import Homepage from './Components/Homepage/Homepage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import 'react-toastify/dist/ReactToastify.css';
import InnerHomepage from './Components/InnerHomepage/InnerHomepage';
import TopNavbar from './Components/TopNavbar/TopNavbar';
import 'bootstrap/dist/css/bootstrap.css';
import Profile from './Components/Profile/Profile';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <Router>
        <TopNavbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/innerHome" element={<InnerHomepage />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
