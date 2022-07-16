import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginChang from './pages/changhoonOh/Login/Login';
import MainChang from './pages/changhoonOh/Main/Main';
import LoginHoon from './pages/hoonjoJeong/Login/Login';
import MainHoon from './pages/hoonjoJeong/Main/Main';
import LoginKwang from './pages/kwangheeKim/Login/Login';
import MainKwang from './pages/kwangheeKim/Main/Main';
import LoginSeong from './pages/seongeunPark/Login/Login';
import MainSeong from './pages/seongeunPark/Main/Main';
import LoginWon from './pages/wonikChoi/Login/Login';
import MainWon from './pages/wonikChoi/Main/Main';
import RegisterWon from './pages/wonikChoi/Register/Register';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login-chang" element={<LoginChang />} />
        <Route path="/main-chang" element={<MainChang />} />
        <Route path="/login-hoon" element={<LoginHoon />} />
        <Route path="/main-hoon" element={<MainHoon />} />
        <Route path="/login-kwang" element={<LoginKwang />} />
        <Route path="/main-kwang" element={<MainKwang />} />
        <Route path="/login-seong" element={<LoginSeong />} />
        <Route path="/main-seong" element={<MainSeong />} />
        <Route path="/login-won" element={<LoginWon />} />
        <Route path="/main-won" element={<MainWon />} />
        <Route path="/register-won" element={<RegisterWon />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
