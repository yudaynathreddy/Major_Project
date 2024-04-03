import React from 'react'
import {Navigate ,Routes,Route} from 'react-router-dom'
import Login from './components/login/login'
import Signup from './components/signup/signup'
import Maps from './components/maps/maps'
import 'mapbox-gl/dist/mapbox-gl.css';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Detection from './components/Detection/Detection'
import Home from './components/Home/Home'
function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/signup' element={<Signup/>}/>        
        <Route path='/maps' element={<Protected><Maps /></Protected>}/>
        <Route path='/home' element={<Protected><Home /></Protected>}/>
        <Route path='/detection' element={<Protected><Detection /></Protected>}/>        
      </Routes>
      <ToastContainer/>
    </div>
  )
}

export default App
export function Protected({children}){
  if(localStorage.getItem('token')){
    return children
  }
  else{
    return <Navigate to='/'></Navigate>
  }
}
