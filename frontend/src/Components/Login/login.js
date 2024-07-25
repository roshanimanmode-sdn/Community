import React, { useEffect, useState } from 'react';
import { login } from '../../Services/service';
import { userlogin } from '../../Slice/AuthSlice';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import FacebookIcon from "@material-ui/icons/Facebook";
import { handleLogin } from "../../Slice/PostData";
import { getUserData } from "../../Slice/ProfileData";
import './login.css';

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userID, setUserID] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const ProfileData = useSelector((state) => state.profileData);

    const ExistedUsers = Object.keys(ProfileData);

    const runLogin = (e) => {
        e.preventDefault();
        if (ExistedUsers.indexOf(userID) !== -1) {
            let warn = document.querySelector(".warning");
            warn.classList.add("active");

            setTimeout(() => {
                warn.classList.remove("active");
            }, 3000);

            return;
        }
        navigate("/home");
        dispatch(handleLogin([userID, userName]));
        dispatch(getUserData([userID, userName]));
    };

    useEffect(() => {
        let btn = document.querySelector("button");
        if (!userID || !userName || !password) {
            btn.setAttribute("disabled", "true");
        } else {
            btn.removeAttribute("disabled");
        }
    }, [userID, userName, password]);

    return (
        <>
            <Container>
                <Form>
                    <header className='heading mt-4'><h1><i>Community Channel</i></h1></header>
                    <input
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        type="text"
                        placeholder="Your Name"
                    />
                    <input
                        value={userID}
                        onChange={(e) => setUserID(e.target.value)}
                        type="text"
                        placeholder="Fake Username"
                    />
                    <input
                        type="password"
                        placeholder="Fake Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={runLogin}>Log in</button>
                </Form>
                <div className="warning">Username already Exist!</div>
            </Container>
        </>
    )
}

const Container = styled.div`
  background: linear-gradient(50deg, #d6249f, #285aeb);
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;

  .warning {
    position: absolute;
    bottom: 20px;
    opacity: 0;
    color: tomato;
    background: #1c2022;
    font-size: 15px;
    padding: 10px 5px;
    width: 260px;
    text-align: center;
    font-weight: bold;
    border-radius: 3px;
    transition: all 0.3s ease-in-out;
  }

  .warning.active {
    bottom: 60px;
    opacity: 1;
  }
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: white;
  border-radius: 10px;
  height: 400px;
  width: 300px;
  padding: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);

  img {
    width: 150px;
    margin-bottom: 20px;
  }

  input {
    margin: 10px 0;
    border: 1px solid #757676;
    border-radius: 5px;
    height: 35px;
    padding: 0 10px;
    width: 100%;
    outline: 0;

    &:focus {
      border: 2px solid rgba(65, 105, 225, 0.7);
    }
  }

  button {
    margin-top: 20px;
    width: 100%;
    padding: 10px 15px;
    outline: none;
    border: none;
    background-color: royalblue;
    color: white;
    cursor: pointer;
    border-radius: 5px;
    font-weight: bold;

    &:hover {
      background-color: #1c4ddf;
    }
  }

  footer {
    font-weight: bold;
    margin-top: 20px;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #534e4e;

    svg {
      color: royalblue;
      margin: 0 5px;
    }
  }
`;
