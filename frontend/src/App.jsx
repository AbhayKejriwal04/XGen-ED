import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Signup from './Pages/Signup';
import Signin from './Pages/Signin';
import Information from './Pages/Information';
import Profile from './Pages/Profile';
import CGPAPage from './Pages/CGPA';

import SGPACal from './Calculator/SGPACal';
import CGPACal from './Calculator/CGPACal';
import Predictor from './Calculator/Predictor';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/information" element={<Information />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/cgpa" element={<CGPAPage />} />
        <Route path="/cgpa/sgpa" element={<SGPACal />} />
        <Route path="/cgpa/cgpa" element={<CGPACal />} />
        <Route path="/cgpa/predict" element={<Predictor />} />

        <Route path="*" element={<Signin />} />
      </Routes>
    </Router>
  );
}

export default App;