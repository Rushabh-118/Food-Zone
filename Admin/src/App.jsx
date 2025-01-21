import React from 'react'
import Sidebar from './component/Sidebar/Sidebar'
import Navbar from './component/navbar/navbar'
import { Route, Routes } from 'react-router-dom'
import ADD from './pages/ADD/ADD'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'

const App = () => {
  const url = 'http://localhost:4000';
  return (
    <div>
      <Navbar />
      <hr /> 
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/add" element={<ADD url = {url}/>} />
          <Route path="/list" element={<List url = {url}/>} />
          <Route path="/orders" element={<Orders url = {url}/>} />
        </Routes>
      </div>  
    </div>
  )
}

export default App
