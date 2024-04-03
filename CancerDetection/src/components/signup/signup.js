import React from 'react'
import { toast } from 'react-toastify'
import { FcGoogle } from "react-icons/fc";
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom'
import { auth, db, provider } from '../../firebase';
import signupimg from '../../Assests/signupimg.svg'
import mainlogo from '../../Assests/mainlogo.jpg'
import './signup.css'
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { setDoc, doc, getDoc } from 'firebase/firestore';
function Signup() {
    document.querySelector('title').textContent = "CancerCare | Signup"
    const { register, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate()
    const onuserregister = async (userdata) => {
        console.log(userdata)
        await createUserWithEmailAndPassword(auth, userdata.email, userdata.password)
            .then(async (usercredentials) => {
                await setDoc(doc(db, "users", usercredentials.user.uid), {
                    email: userdata.email,
                    username: userdata.username
                })
                navigate('/')
                toast.success("Registered Successfully", {
                    position: "top-right",
                    autoClose: 2000,
                    pauseOnHover: false,
                    closeOnClick: true,
                    draggable: true,
                    theme: "colored",
                })
            })
            .catch((error) => {
                if (error.code === "auth/email-already-in-use") {
                    toast.error("User Already exists", {
                        position: "top-right",
                        autoClose: 2000,
                        pauseOnHover: false,
                        closeOnClick: true,
                        draggable: true,
                        theme: "colored",
                    })
                }
                else if (error.code === "auth/invalid-email") {
                    toast.error("Invalid email / password", {
                        position: "top-right",
                        autoClose: 2000,
                        pauseOnHover: false,
                        closeOnClick: true,
                        draggable: true,
                        theme: "colored",
                    })
                }
                else if (error.code === "auth/weak-password") {
                    toast.warning("password min length 6", {
                        position: "top-right",
                        autoClose: 2000,
                        pauseOnHover: false,
                        closeOnClick: true,
                        draggable: true,
                        theme: "colored",
                    })
                }
                else {
                    console.log(error.code)
                }
            })
    }
    const handlegooglesignup = async () => {
        await signInWithPopup(auth, provider)
            .then(async (usercredentials) => {
                const docref = await getDoc(doc(db, "users", usercredentials.user.uid))
                if (docref.exists()) {
                    toast.error("User Already exists", {
                        position: "top-right",
                        autoClose: 2000,
                        pauseOnHover: false,
                        closeOnClick: true,
                        draggable: true,
                        theme: "colored",
                    })
                }
                else {
                    await setDoc(doc(db, "users", usercredentials.user.uid), {
                        email: usercredentials.user.email,
                        username: usercredentials.user.displayName
                    })
                    navigate('/')
                    toast.success("Registered Successfully", {
                        position: "top-right",
                        autoClose: 2000,
                        pauseOnHover: false,
                        closeOnClick: true,
                        draggable: true,
                        theme: "colored",
                    })
                }
            })
            .catch(error => console.log(error.code))
    }
    return (
        <div className='row' style={{width:"100%"}}>
            <div className='col-md-6'>
                <img src={signupimg} className='singupimg' alt="" />
            </div>
            <div className='signmain col-md-6'>
                <form className="signupform" onSubmit={handleSubmit(onuserregister)}>
                    <img src={mainlogo} height="200px" width="200px" style={{ display: "block", margin: "auto" }} alt="" />
                    <div className='mt-3'>
                        <input type="text" placeholder='Username' {...register("username", { required: true })} />
                        {errors.username?.type === "required" && <p className='text-danger fw-light mt-1'>* username required</p>}
                    </div>
                    <div className='mt-3'>
                        <input type="email" placeholder='Email' {...register("email", { required: true })} />
                        {errors.email?.type === "required" && <p className='text-danger fw-light mt-1'>* email required</p>}
                    </div>
                    <div className='mt-3'>
                        <input type="password" placeholder='Password' autoComplete='none' {...register("password", { required: true })} />
                        {errors.password?.type === "required" && <p className='text-danger fw-light mt-1'>* Password required</p>}
                    </div >
                    <div className='mt-3'>
                        <input type="password" autoComplete='none' placeholder='Confirm Password' />
                    </div >
                    <div className='mt-3'>
                        <button type='submit'>Register</button>
                    </div>
                    <div className='mt-3 text-center'>
                        <span className='fw-light'>Already have an account </span><NavLink className='text-dark fw-bold' style={{ textDecoration: "none" }} to='/'>Login here</NavLink>
                    </div>
                    <p className='text-center mt-3'>OR</p>
                    <div className='mt-3'>
                        <button className='btngoogle' onClick={() => handlegooglesignup()}><i className='me-2 fs-5'><FcGoogle /></i><span>Signup with Google</span></button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Signup
