//import * as dotenv from 'dotenv';
//dotenv.config();

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Profile from './pages/Profile';
import AnotherPage from './pages/AnotherPage';
import Dashboard from './pages/Dashboard';
import ScrambledCategory from './pages/scrambled/ScrambledCategory';
import ScrambledQuestion from './pages/scrambled/ScrambledQuestion';
import ScrambledAddQuestion from './pages/scrambled/ScrambledAddQuestion';
import ScrambledAddCategory from './pages/scrambled/ScrambledAddCategory';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      
      <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/another" element={<AnotherPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/scrambled/categories" element={<ScrambledCategory />} />
      <Route path="/scrambled/category/questions/:category_id/:category_name" element={<ScrambledQuestion />} />
      <Route path="/scrambled/category/question/add/:category_id/:category_name" element={<ScrambledAddQuestion />} />
      <Route path="/scrambled/category/create" element={<ScrambledAddCategory />} />
    </Routes>
  </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();