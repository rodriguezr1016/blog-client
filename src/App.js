
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
function App() {
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