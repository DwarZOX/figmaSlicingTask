import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import Detail from './pages/dashboard/Detail'
import Tabel from './pages/dashboard/Tabel'
import TambahWisata from './pages/dashboard/TambahWisata'
import Login from './pages/landing/Login'
import Register from './pages/landing/Register'
import Ubah from './pages/dashboard/Ubah'
import NotFound from './pages/not-found'


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard/home" element={<Dashboard />} />
          <Route path="/dashboard/detail/:id" element={<Detail />} />
          <Route path="/dashboard/tambahwisata" element={<TambahWisata />} />
          <Route path="/dashboard/tabel" element={<Tabel />} />
          <Route path="/dashboard/ubah/:id" element={<Ubah />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App