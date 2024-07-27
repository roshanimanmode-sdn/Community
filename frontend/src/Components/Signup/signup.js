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

export function Signup() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userID, setUserID] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [community, setCommunity] = useState("");
    const [phone, setPhone] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [zipcode, setZipcode] = useState("");

    const ProfileData = useSelector((state) => state.profileData);

    const ExistedUsers = Object.keys(ProfileData);

    const handleSignUp = (e) => {
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
                <Form onSubmit={handleSignUp}>
                    <header className='heading mt-4'><h1><i>Register to Community</i></h1></header>
                    <Input
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        type="text"
                        placeholder="Your Full Name"
                    />
                    <Input
                        value={userID}
                        onChange={(e) => setUserID(e.target.value)}
                        type="text"
                        placeholder="Username"
                    />
                    <Input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        max={10}
                        type="text"
                        placeholder="Phone No."
                    />
                    <Input
                        value={community}
                        onChange={(e) => setCommunity(e.target.value)}
                        type="text"
                        placeholder="Your Community"
                    />
                    <Input
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        type="text"
                        placeholder="State"
                    />
                    <Input
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        type="text"
                        placeholder="City"
                    />
                    <Input
                        value={zipcode}
                        onChange={(e) => setZipcode(e.target.value)}
                        type="text"
                        placeholder="Zipcode"
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <StyledButton type="submit">Sign up</StyledButton>
                    <Footer>
                        <p>Already have an account?</p>
                        <StyledLink to={"/"}>Login</StyledLink>
                    </Footer>
                </Form>
                <div className="warning">Username already exists!</div>
            </Container>
        </>
    );
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
  flex-direction: column;
  background: white;
  border-radius: 10px;
  padding: 20px;
  width: 300px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);

  .heading {
    text-align: center;
    margin-bottom: 20px;
  }
`;

const Input = styled.input`
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
`;

const StyledButton = styled.button`
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
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1c4ddf;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const Footer = styled.footer`
  font-weight: bold;
  margin-top: 20px;
  font-size: 12px;
  text-align: center;
  color: #534e4e;
`;

const StyledLink = styled(Link)`
  color: royalblue;
  margin-left: 5px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
