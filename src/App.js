
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
function App() {
  const [userInfo, setUserInfo] = useState(null);
    const { setUserInfo: setUserInfoFromContext } = useContext(UserContext);
    useEffect(() => {
      // Function to check for the JWT token cookie
      
      const checkToken = () => {
        let token = '';
           token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
          if (token) {
              // If the token exists, verify it and fetch user info
              fetch('https://yvettes-mern-blog-plum.vercel.app/profile', {
                  credentials: 'include',
              })
              .then(response => {
                  if (!response.ok) {
                      throw new Error('Network response was not ok');
                  }
                  return response.json();
              })
              .then(userInfo => {
                  setUserInfo(userInfo);
                  setUserInfoFromContext(userInfo); // Update the context with the fetched user info
              })
              .catch(error => {
                  console.error('There was a problem with your fetch operation:', error);
              });
          }
      };

      checkToken();
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