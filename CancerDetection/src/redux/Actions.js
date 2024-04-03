import { toast } from "react-toastify"
import { signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth, db, provider } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
export const LOGIN = 'LOGIN'
export const GLOGIN = 'GLOGIN'
export const LOGOUT = 'LOGOUT'
export const login = (userdata) => {
    return async dispatch => {
        await signInWithEmailAndPassword(auth, userdata.email, userdata.password)
            .then((usercredentials) => {
                localStorage.setItem('token', usercredentials.user.accessToken)
                toast.success("Login Successfully", {
                    position: "top-right",
                    autoClose: 2000,
                    pauseOnHover: false,
                    closeOnClick: true,
                    draggable: true,
                    theme: "colored",
                })
                return dispatch({
                    type: LOGIN,
                    payload: userdata
                })
            })
            .catch((error) => {
                if (error.code === "auth/wrong-password") {
                    toast.error("Invalid Password", {
                        position: "top-right",
                        autoClose: 2000,
                        pauseOnHover: false,
                        closeOnClick: true,
                        draggable: true,
                        theme: "colored",
                    })
                }
                else if (error.code === "auth/user-not-found") {
                    toast.error("Invalid Email", {
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
}
export const glogin = () => {
    return async dispatch => {
        await signInWithPopup(auth, provider)
            .then(async (usercredentials) => {
                const docref = await getDoc(doc(db, "users", usercredentials.user.uid))
                if (docref.exists()) {                    
                    localStorage.setItem('token', usercredentials.user.accessToken)
                    toast.success("Login Successfully", {
                        position: "top-right",
                        autoClose: 2000,
                        pauseOnHover: false,
                        closeOnClick: true,
                        draggable: true,
                        theme: "colored",
                    })
                    return dispatch({
                        type: GLOGIN,
                        payload: usercredentials.user
                    })
                }
                else {
                    toast.error("Invalid Email", {
                        position: "top-right",
                        autoClose: 2000,
                        pauseOnHover: false,
                        closeOnClick: true,
                        draggable: true,
                        theme: "colored",
                    })
                    signOut(auth)
                }
            })
            .catch(error => console.log(error))
    }
}
export const logout = () => {
    return async dispatch => {
        toast.success("Logout Successful", {
            position: "top-right",
            autoClose: 2000,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            theme: "colored",
        })
        return dispatch({
            type: LOGOUT
        })
    }
}