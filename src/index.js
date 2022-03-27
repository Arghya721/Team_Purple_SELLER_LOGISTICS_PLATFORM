import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './components/login';
import Register from './components/register';
import Dashboard from './dashboard/dashboard';
import Ssax from './components/maps';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    
    <Router>
      <Routes>
      
      <Route exact path = "/" element={<Login/>}/>
      <Route exact path = "/register" element={<Register/>}/>
      <Route exact path = "/dashboard" element={<Dashboard/>}/>
      <Route path="/dashboard/orderstatus/:topicId" element={<Dashboard/>}/>      
      <Route path="/maps" element={<Ssax/>}/> 
      <Route path="/dashboard/shipment/:topicId" element={<Dashboard/>}/>
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);


