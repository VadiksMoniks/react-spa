import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Menu from './Menu'
import Dashboard from './pages/DashBoard'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Registre from './pages/Registre'
import Settings from './pages/Settings'
import Posts from './pages/Posts'
import PostView from './pages/PostView'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'

function App() {
  return (
    <>
      <Menu />
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registre" element={<Registre />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:id" element={<PostView />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/posts/edit/:id" element={<EditPost />} />
        </Routes>
    </>
  )
}

export default App
