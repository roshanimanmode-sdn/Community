import React from 'react';
import '../Dashboard/dashboard.css'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userlogout } from '../../Slice/AuthSlice';

export function SideBar() {
    const dispatch = useDispatch();

    const handleLogout = async () => {
        localStorage.clear();
        dispatch(userlogout());
        toast("Logout Successfully");
    };

    return (
        <>
            <div className="col-sm-3 sidenav hidden-xs">
                <h2>Logo</h2>
                <ul className="nav nav-pills nav-stacked">
                    <li className="active"><Link to="/dashboard"> Dashboard </Link></li>
                    <li><Link to="/notification"> Notification List </Link></li>
                    <li><Link to="/login" onClick={handleLogout}> Logout </Link></li>
                </ul><br />
            </div>
        </>
    )
}
