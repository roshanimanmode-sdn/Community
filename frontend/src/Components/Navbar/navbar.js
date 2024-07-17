import React from 'react'
import './navbar.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { userlogout } from '../../Slice/AuthSlice';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Navbar() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    const handleLogout = async () => {
        localStorage.clear();
        dispatch(userlogout());
        toast("Logout Successfully");
    };

    return (
        <>
            <header>
                <nav>
                    <ul>
                        {isLoggedIn ? (
                            <>
                                <li>
                                    <Link to="/login" onClick={handleLogout}> Logout </Link>
                                </li>
                                <li>
                                    <Link to="/notification"> Notification </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/"> Home </Link>
                                </li>
                                <li>
                                    <Link to="/login"> Login </Link>
                                </li>
                                <li>
                                    <Link to="/signup"> Signup </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </header>
        </>
    )
}
