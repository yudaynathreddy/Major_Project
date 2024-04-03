import React from 'react'
import { useEffect } from 'react';
import { FcGoogle } from "react-icons/fc";
import { NavLink, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import { login, glogin } from '../../redux/Actions';
import mainlogo from '../../Assests/mainlogo.jpg'
import loginimg from '../../Assests/loginimg.svg'
import './login.css'
function Login() {
    document.querySelector('title').textContent = "CancerCare | Login"
    const { register, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { issuccess } = useSelector(state => state.loginreducer)
    const onuserlogin = async (userdata) => {
        console.log(userdata)
        dispatch(login(userdata))
    }
    const handlegooglelogin = async () => {
        dispatch(glogin())
    }
    useEffect(()=>{
        function onreload(){
            if(issuccess)
                navigate('/home')
        }
        onreload()
    })
    return (
        <div className='row' style={{width:"100%"}}> 
            <div className='col-md-6'>
                <img src={loginimg} className='loginimg' alt="" />
            </div>
            <div className='loginmain col-md-6'>
                <form className='loginform' onSubmit={handleSubmit(onuserlogin)}>
                    <img src={mainlogo} height="200px" width="200px" style={{ display: "block", margin: "auto" }} alt="" />
                    <div className='mt-3'>
                        <input type="email" placeholder='Email' {...register("email", { required: true })} />
                        {errors.email?.type === "required" && <p className='text-danger fw-light mt-1'>* email required</p>}
                    </div>
                    <div className='mt-3'>
                        <input type="password" autoComplete='none' placeholder='Password' {...register("password", { required: true })} />
                        {errors.password?.type === "required" && <p className='text-danger fw-light mt-1'>* password required</p>}
                    </div >
                    <div className='mt-3'>
                        <button type='submit'>Login</button>
                    </div>
                    <div className='mt-3 text-center fw-light'>
                        <span >Don't have an account </span><NavLink className='text-dark fw-bold' style={{ textDecoration: "none" }} to='/signup'>Signup here</NavLink>
                    </div>
                    <p className='text-center mt-3'>OR</p>
                    <div className='mt-3'>
                        <button className='btngoogle' onClick={() => handlegooglelogin()}><i className='me-2 fs-5'><FcGoogle /></i><span>Login with Google</span></button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Login
