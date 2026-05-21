import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../src/components/Home'
import Login from '../src/components/Login'
import Register from '../src/components/Register'
import Header from '../src/components/Header'
import { Toaster } from 'react-hot-toast'
import axios from 'axios'

const App = () => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [task, setTask] = useState([]);
  const [user, setUser] = useState({});
  useEffect(() => {
    const handleGetUser = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/v1/user/getUserDetails", { withCredentials: true, })
        setIsUserAuthenticated(true)
        setUser(res.data)
      } catch (error) {
        setIsUserAuthenticated(false)
        setUser({})
      }
    }
    handleGetUser()
  }, [isUserAuthenticated])

  return (
    <>
      <BrowserRouter>
        <Header task={task} setTask={setTask} isUserAuthenticated={isUserAuthenticated} setIsUserAuthenticated={setIsUserAuthenticated} />
        <Routes>
          <Route path='/' element={<Home isUserAuthenticated={isUserAuthenticated} task={task} setTask={setTask} />} />
          <Route path='/login' element={<Login isUserAuthenticated={isUserAuthenticated} setIsUserAuthenticated={setIsUserAuthenticated} />} />
          <Route path='/register' element={<Register isUserAuthenticated={isUserAuthenticated} setIsUserAuthenticated={setIsUserAuthenticated} />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </>
  )
}

export default App