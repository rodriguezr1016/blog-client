
import './App.css';
import {Route, Routes} from 'react-router-dom';
import Layout from './component/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { UserContextProvider } from './UserContext';
import CreatePost from './pages/CreatePost';
import PostPage from './pages/PostPage';
import EditPost from './pages/EditPost';
import { Analytics } from "@vercel/analytics/react"
import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from './UserContext';

const fetchUserInfo = async (token) => {
 const response = await fetch('https://yvettes-mern-blog-plum.vercel.app/profile', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
 });
 if (!response.ok) {
    throw new Error('Failed to fetch user info');
 }
 return response.json();
};

function App() {
  const { setUserInfo } = useContext(UserContext);

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      // Fetch user info using the token
      fetchUserInfo(token).then(userInfo => {
        setUserInfo(userInfo);
        // Optionally, set any other state related to the user's session
      });
   }
   }, []);

  return (
    <UserContextProvider>
      <Analytics />
      <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={
            <Home />
          } />

        <Route path='/login' element={
            <Login />
          } />
        <Route path='/register' element={
            <Register />
        } />
        <Route path='/create' element={
            <CreatePost />
        } />
        <Route path='/post/:id' element={
          <PostPage /> 
        } />
        <Route path='/edit/:id' element={
          <EditPost />
        } />
    
    
      </Route>
 
    </Routes>

    </UserContextProvider>
    
   
  )
}

export default App;
