import React, { useState } from 'react';
import { signup } from '../../Services/service';
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './signup.css';

export function Signup() {
    const navigate = useNavigate();

    const [input, setInput] = useState({
        name: "",
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
        const res = await signup(input.name, input.email, input.password);
        if (res?.data?.status === true) {
            navigate("/login");
            toast("Signup Successfully");
        } else if (res?.data?.status === false || res === null) {
            toast("Something went wrong");
        }
    };

    return (
        <>
            <div className="container">
                <div className="center">
                    <h1>Register</h1>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className="txt_field">
                            <input type="text" name="name" defaultValue={input.name} onChange={handleChange} required />
                            <span></span>
                            <label>Name</label>
                        </div>
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
                            Have an Account ? <Link to="/login">Login Here</Link>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}
