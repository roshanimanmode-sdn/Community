import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import styled from "styled-components";
import ConfirmPost from '../Form/confirmPost';
import { registerAPI, updateVisiblityStatus } from '../../Services/Auth.service';
import { initialValues, validationSchema } from '../../Constant/formikFiles';
import { toast } from 'react-toastify';

export function Signup() {
  const [openModal, setOpenModal] = useState(false);
  const [userId, setUserId] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async (values, { setSubmitting }) => {
    try {
      const addUser = await registerAPI(values);
      if (addUser) {
        setUserId(addUser?.data?._id);
        setOpenModal(true);
      }
    } catch (error) {
      console.error('Registration failed:', error);
      toast.error("Registration failed")
    } finally {
      setSubmitting(false);
    }
  };

  const handleConfirmVisibility = async (isProfileVisible) => {
    if (isProfileVisible) {
      const updateStatus = await updateVisiblityStatus({ userId: userId, isProfileVisible: isProfileVisible });
      if (updateStatus) {
        setOpenModal(false);
        toast.success(updateStatus?.message);
        navigate('/home');
      }
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    navigate('/home');
  };

  return (
    <Container>
      {openModal && (
        <ConfirmPost
          isOpen={openModal}
          onConfirm={handleConfirmVisibility}
          onClose={handleCloseModal}
        />
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSignUp}
      >
        {({ setFieldValue, values, isSubmitting }) => (
          <Form>
            <Header><h1><i>Register</i></h1></Header>
            <ProfilePhotoSection>
              <ProfilePhotoContainer onClick={() => document.getElementById('profilePhoto').click()}>
                {values.profilePhoto ? <img src={values.profilePhoto} alt="Profile" /> : <span>Upload Profile Photo</span>}
              </ProfilePhotoContainer>
              <ProfilePhotoInput
                type="file"
                id="profilePhoto"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files[0]) {
                    setFieldValue("profilePhoto", URL.createObjectURL(e.target.files[0]));
                  }
                }}
                style={{ display: 'none' }}
              />
            </ProfilePhotoSection>
            <ErrorText><ErrorMessage name="profilePhoto" /></ErrorText>

            <label>Basic Information</label>
            <FormRow>
              <Field name="fullName" as={Input} placeholder="Full Name" />
              <Field name="userName" as={Input} placeholder="Username" />
            </FormRow>
            <FormRow>
              <ErrorText><ErrorMessage name="fullName" /></ErrorText>
              <ErrorText><ErrorMessage name="userName" /></ErrorText>
            </FormRow>

            <FormRow>
              <Field name="phone" as={Input} placeholder="Phone No." />
              <Field name="email" as={Input} placeholder="Email" />
            </FormRow>
            <FormRow>
              <ErrorText><ErrorMessage name="phone" /></ErrorText>
              <ErrorText><ErrorMessage name="email" /></ErrorText>
            </FormRow>

            <FormRow>
              <Field name="country" as={Input} placeholder="Country" />
              <Field name="state" as={Input} placeholder="State" />
            </FormRow>
            <FormRow>
              <ErrorText><ErrorMessage name="country" /></ErrorText>
              <ErrorText><ErrorMessage name="state" /></ErrorText>
            </FormRow>

            <FormRow>
              <Field name="city" as={Input} placeholder="City" />
              <Field name="zipcode" as={Input} placeholder="Zipcode" />
            </FormRow>
            <FormRow>
              <ErrorText><ErrorMessage name="city" /></ErrorText>
              <ErrorText><ErrorMessage name="zipcode" /></ErrorText>
            </FormRow>

            <FormRow>
              <Field name="age" as={Input} type="number" placeholder="Age" min="0" />
              <Field name="dob" as={Input} placeholder="DOB" />
            </FormRow>
            <FormRow>
              <ErrorText><ErrorMessage name="age" /></ErrorText>
              <ErrorText><ErrorMessage name="dob" /></ErrorText>
            </FormRow>

            <FormRow>
              <Field as={Select} name="gender">
                <option value="" label="Select Gender" />
                <option value="Male" label="Male" />
                <option value="Female" label="Female" />
                <option value="Other" label="Other" />
              </Field>
            </FormRow>
            <ErrorText><ErrorMessage name="gender" /></ErrorText>

            <FormRow>
              <Field name="password" as={Input} type="password" placeholder="Password" />
              <Field name="confirmPassword" as={Input} type="password" placeholder="Confirm Password" />
            </FormRow>
            <FormRow>
              <ErrorText><ErrorMessage name="password" /></ErrorText>
              <ErrorText><ErrorMessage name="confirmPassword" /></ErrorText>
            </FormRow>

            <label>Additional Information</label>
            <FormRow>
              <Field name="qualification" as={Input} placeholder="Qualification" />
              <Field name="community" as={Input} placeholder="Community" />
            </FormRow>
            <FormRow>
              <ErrorText><ErrorMessage name="qualification" /></ErrorText>
              <ErrorText><ErrorMessage name="community" /></ErrorText>
            </FormRow>

            <StyledButton type="submit" disabled={isSubmitting}>Sign up</StyledButton>
            <Footer>
              <p>Already have an account?</p>
              <StyledLink to={"/"}>Login</StyledLink>
            </Footer>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

const Container = styled.div`
  height: 160vh;
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

const ProfilePhotoSection = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const ProfilePhotoContainer = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  span {
    font-size: 12px;
    color: #666;
  }
`;

const ProfilePhotoInput = styled.input`
  display: none;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 20px;

  h1 {
    margin: 0;
    font-size: 24px;
    color: #333;
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

const Select = styled.select`
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

const ErrorText = styled.div`
  color: tomato;
  font-size: 12px;
  margin-top: 5px;
`;
