import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import { handleLogin } from '../../Slice/PostData';
import { getUserData } from '../../Slice/ProfileData';
import { registerAPI } from '../../Services/Auth.service';
import ConfirmPost from '../Form/confirmPost';

export function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userID, setUserID] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [community, setCommunity] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [age, setAge] = useState("");
  const [dob, setDob] = useState("");
  const [qualification, setQualification] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();

    const userData = {
      userID,
      userName,
      email,
      password,
      confirmPassword,
      community,
      phone,
      country,
      state,
      city,
      zipcode,
      age,
      dob,
      qualification,
    };
    // console.log('userData:', userData);

    try {
      // const response = await registerAPI(userData);
      // console.log('User registered successfully:', response);
      // if(response?.status) {
      setOpenModal(true);
      // dispatch(handleLogin([userID, userName]));
      // dispatch(getUserData([userID, userName]));
      // }
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const handleConfirmVisibility = () => {
    // Handle the action to make profile visible
    setOpenModal(false);
    navigate('/home');
  };

  const handleCloseModal = () => {
    // Handle the action to close modal
    setOpenModal(false);
    navigate('/home');
  };

  return (
    <>
      <Container>
        {openModal && (
          <ConfirmPost
            isOpen={openModal}
            onConfirm={handleConfirmVisibility}
            onClose={handleCloseModal}
          />
        )}
        <Form onSubmit={handleSignUp}>
          <header className='heading mt-4'><h1><i>Register</i></h1></header>
          <label>Basic Information</label>
          <FormRow>
            <Input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              type="text"
              placeholder="Full Name"
            />
            <Input
              value={userID}
              onChange={(e) => setUserID(e.target.value)}
              type="text"
              placeholder="Username"
            />
          </FormRow>
          <FormRow>
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="text"
              placeholder="Phone No."
            />
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="email"
            />
          </FormRow>
          <FormRow>
            <Input
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              type="text"
              placeholder="Country"
            />
            <Input
              value={state}
              onChange={(e) => setState(e.target.value)}
              type="text"
              placeholder="State"
            />

          </FormRow>
          <FormRow>
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
          </FormRow>
          <FormRow>
            <Input
              value={age}
              onChange={(e) => setAge(e.target.value)}
              type="number"
              placeholder="Age"
              min="0"
            />
            <Input
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              type="text"
              placeholder="DOB"
            />
          </FormRow>
          <FormRow>
            <Input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="text"
              placeholder="Confirm Password"
            />
          </FormRow>
          {/* <hr></hr> */}
          <label>Additional Information</label>
          <FormRow>
            <Input
              value={qualification}
              onChange={(e) => setQualification(e.target.value)}
              type="text"
              placeholder="Qualification"
            />
            <Input
              value={community}
              onChange={(e) => setCommunity(e.target.value)}
              type="text"
              placeholder="Community"
            />
          </FormRow>

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
// background: linear-gradient(50deg, #d6249f, #285aeb);
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 10px;
  padding: 20px;
  width: 500px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);

  .heading {
    text-align: center;
    margin-bottom: 20px;
  }
`;

const FormRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;

  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;

const Input = styled.input`
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
