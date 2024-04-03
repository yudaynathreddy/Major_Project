import { VscThreeBars } from "react-icons/vsc";
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import canerlogo from '../../Assests/cancerlogo.png'
import { FaUserCircle } from "react-icons/fa";
import profileimg from '../../Assests/profileimg.png'
import { MdLogout } from "react-icons/md";
import { logout } from "../../redux/Actions";
import './navbar.css'
function Navbar() {
    const { username, email } = useSelector(state => state.loginreducer)
    const dispatch = useDispatch()
    let navigate = useNavigate()
    const onlogout = () => {
        localStorage.clear()
        dispatch(logout())
        navigate('/')
    }
    return (
        <div className='header'>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <NavLink className="logo" to='/'><img src={canerlogo} height="50px" width="50px" alt="" />Cancer Care</NavLink>
                    <button className="navbar-toggler navbtn" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="toggler"><VscThreeBars /></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul className="navbar-nav gap-4">
                            <li className="nav-item">
                                <NavLink className="nav-link text-light" to='/home'>Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link text-light" to='/detection'>Lab</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link text-light" to='/maps'>Hospitals</NavLink>
                            </li>
                            <li>
                                <i style={{ fontSize: "27px", color: "white", cursor: "pointer" }} data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions"><FaUserCircle /></i>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="offcanvas offcanvas-end" data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
                <div className="offcanvas-header d-flex justify-content-end">

                    <button type="button" className="btn-close mt-1" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <img src={profileimg} className="d-block mx-auto" width="300px" alt="" />
                    <div className="mt-4 fs-5 text-center">
                        <p>{username}</p><hr />
                        <p>{email}</p><hr />
                        {/* <p>History</p><hr /> */}
                        <p style={{ cursor: "pointer" }} onClick={() => onlogout()}>logout <i><MdLogout /></i></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
