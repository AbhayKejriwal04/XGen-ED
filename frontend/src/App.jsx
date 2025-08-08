import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './Pages/Signup';
import Signin from './Pages/Signin';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Signin />} />
        <Route path="*" element={<Signin />} />
      </Routes>
    </Router>
  );
}

export default App;