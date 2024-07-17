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

    return (
        <>
        </>
    )
}
