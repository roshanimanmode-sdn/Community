import React, { useState } from 'react';
import { userlogin } from '../../Slice/AuthSlice';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import { loginAPI } from '../../Services/Auth.service';
import './login.css';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const runLogin = async (event) => {
    event.preventDefault();
    try {
      let userData = {
        email: email,
        password: password
      };
      const response = await loginAPI(userData);
      if (response?.status) {
        navigate("/home");
        dispatch(userlogin(response?.data));
        toast.success(response?.message);
      } else {
        setError("Username does not exist!");
        toast.error("Login failed, please check your credentials.");
      }
    } catch (error) {
      console.log('Login failed:', error);
      setError("Invalid credentials.");
    }
  };

  return (
    <>
      <Container>
        <Form onSubmit={runLogin}>
          <Header className='heading mt-4'>
            <h1><i>Login</i></h1>
          </Header>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
          />
          <Input
            value={password}
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <Warning>{error}</Warning>}
          <StyledButton type="submit">Log in</StyledButton>
          <Footer>
            <p>Don't have an account?</p>
            <StyledLink to={"/register"}>Register</StyledLink>
          </Footer>
        </Form>
      </Container>
    </>
  );
}

const Container = styled.div`
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

const Header = styled.header`
  text-align: center;
  margin-bottom: 20px;
`;

const Warning = styled.div`
  color: red;
  margin-top: 10px;
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
