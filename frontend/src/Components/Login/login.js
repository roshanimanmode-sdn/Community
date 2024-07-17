import React, { useEffect, useState } from 'react';
import { login } from '../../Services/service';
import { userlogin } from '../../Slice/AuthSlice';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { joinRoom } from '../../Services/socketService';
import './login.css';

export function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [input, setInput] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput((previousValue) => ({
            ...previousValue,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    };

    const buttonHandler = async () => {
        const res = await login(input.email, input.password);
        if (res?.data?.status === true) {
            dispatch(userlogin(res?.data));
            joinRoom(res?.data?.result?._id);
            navigate("/dashboard");
            toast("Login Successfully");
        } else if (res?.data?.status === false || res === null) {
            toast("Please Check your credentials");
        }
    };
    
    // to prevent going to login page when user is logged in
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    useEffect(() => {
        if (isLoggedIn) {
            navigate("/dashboard")
        }

    }, [])

    return (
        <>
            <div className="login_container">
                <div className="center">
                    <h1>Login</h1>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className="txt_field">
                            <input type="email" name="email" defaultValue={input.email} onChange={handleChange} required />
                            <span></span>
                            <label>Email</label>
                        </div>
                        <div className="txt_field">
                            <input type="password" name="password" defaultValue={input.password} onChange={handleChange} required />
                            <span></span>
                            <label>Password</label>
                        </div>
                        <input name="submit" type="Submit" onClick={buttonHandler} />
                        <div className="signup_link">
                            Dont have an Account ? <Link to="/signup">Signup Here</Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
