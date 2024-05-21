
import './App.css';
import Dashboard from './pages/DashBoard';
import { BrowserRouter as Router,Routes, Route ,Navigate} from 'react-router-dom';
import RegisterForm from './pages/Register';
import Home from './pages/Home';
import EditProfile from './pages/EditProfile';

function App() {
  return (
    <div className="App">
       <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<RegisterForm/>}/>
          <Route path="edit-profile" element ={<EditProfile/>}/>
        </Routes>
       </Router>
       
    </div>
  );
}

export default App;
