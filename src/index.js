import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './components/login';
import Register from './components/register';
import Dashboard from './dashboard/dashboard';
import OrderStatus from './dashboard/components/orderstatus';
import Ssax from './components/maps';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
ReactDOM.render(
  <React.StrictMode>
    
    <Router>
      <Routes>
      <Route exact path="/" element={<App/>} />
      <Route exact path = "/login" element={<Login/>}/>
      <Route exact path = "/register" element={<Register/>}/>
      <Route exact path = "/dashboard" element={<Dashboard/>}/>
      <Route path="/dashboard/orderstatus/:topicId" element={<OrderStatus/>}/>      
      <Route path="/maps" element={<Ssax/>}/> 
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);


