import React from 'react';
import Home from './pages/home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar';
import Employees from './pages/employees/Employees';
import Departments from './pages/departments/Departments';
import JobTitles from './pages/job-titles/JobTitles';
import AddEmployee from './pages/add-employee/AddEmployee';

function App() {
  return (
    <>
      <Router>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-employee" element={<AddEmployee />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/job-titles" element={<JobTitles />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
