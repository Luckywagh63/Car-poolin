import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Page from './components/Page';  // Front page component
import ServicePage from './components/ServicePage';  // Service page component
import DriveDetailsPage from './components/DriveDetailsPage';  // Drive details page component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Page />} />  {/* Home route */}
        <Route path="/drive-details" element={<DriveDetailsPage />} />  {/* Drive details route */}
        <Route path="/services" element={<ServicePage />} />  {/* Services route */}
      </Routes>
    </Router>
  );
};

export default App;
