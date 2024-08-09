import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { useParams } from "react-router-dom";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { Button, Col, Row } from 'reactstrap';
import userIcon from "../../assets/img/default_image.png"
import { fetchUserDetailsById, updateUserDataAPI } from '../../Services/Auth.service';

export default function ProfileInfo(props) {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState();
  const [profilePic, setProfilePic] = useState(userIcon);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const getData = await fetchUserDetailsById(id);
        if (getData?.status) {
          setProfileData(getData?.data);
        } else {
          console.log("Error:", getData?.message);

        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };
    fetchUserData();
  }, [id]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
      // You might also want to handle uploading the file to your server here
    }
  };

  const handleUpdateUserData = async () => {
    try {
      const formData = {
        "fullName": profileData?.fullName,
        "qualification": profileData?.qualification,
        "age": profileData?.age,
        "community": profileData?.community,
        "aboutYourself": profileData?.aboutYourself
      };
      const updatedData = await updateUserDataAPI(formData);
      if (updatedData?.status) {
        setProfileData(updatedData?.data);
        setIsEditing(!isEditing);
      } else {
        console.log("Error:", updatedData?.message);

      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  }

  return !profileData ? (
    <Container>
      <h2>
        Sorry, User Doesn't Exist!😕
      </h2>
    </Container>
  ) : (
    <Container>
      <ProfilePicContainer>
        <ProfilePic src={profilePic} alt="profilePic" />
        <FileInputWrapper>
          <label htmlFor="profile-pic-upload" className="custom-file-upload">
            Edit Photo
          </label>
          <input
            id="profile-pic-upload"
            type="file"
            accept="image/*"
            onChange={handleProfilePicChange}
            style={{ display: 'none' }}
          />
        </FileInputWrapper>
      </ProfilePicContainer>
      <Info>
        {isEditing ? (
          <>
            <h3><b>Edit Profile</b></h3>
            <Row>
              <Col md={6}>
                <Input
                  type="text"
                  name="fullName"
                  value={profileData.fullName}
                  onChange={handleChange}
                  placeholder="Full Name"
                />
              </Col>
              <Col md={6}>
                <Input
                  type="text"
                  name="qualification"
                  value={profileData.qualification}
                  onChange={handleChange}
                  placeholder="Qualification"
                />
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Input
                  type="number"
                  name="age"
                  value={profileData.age}
                  onChange={handleChange}
                  placeholder="Age"
                />
              </Col>
              <Col md={6}>
                <Input
                  type="text"
                  name="community"
                  value={profileData.community}
                  onChange={handleChange}
                  placeholder="Community"
                />
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Textarea
                  name="aboutYourself"
                  value={profileData.aboutYourself}
                  onChange={handleChange}
                  placeholder="About Yourself"
                />
              </Col>
              <Col md={6}>
                <StyledButton onClick={handleUpdateUserData}>Save</StyledButton>

              </Col>
            </Row>
          </>
        ) : (
          <>
            <p className="owner-ID">
              {profileData?.userName}
              {profileData?.verified ? <CheckCircleIcon className="verified" /> : null}
            </p>
            <Stats>
              <p>
                Age: <strong>{profileData?.age}</strong>
              </p>
              <p>
                Qualification: <strong>{profileData?.qualification}</strong>
              </p>
              <p>
                Community: <strong>{profileData?.community}</strong>
              </p>
            </Stats>
            <Bio>
              <p className="fullName">
                <strong>{profileData?.fullName}</strong>
              </p>
              <p className="category">{profileData?.qualification}</p>
              <p>{profileData?.bio}</p>
            </Bio>
            <StyledButton className='mt-4' onClick={handleEditToggle}>Edit</StyledButton>
          </>
        )}
      </Info>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  max-width: 620px;
  margin: 30px auto;
  padding-bottom: 40px;
  flex-wrap: wrap;

  span {
    text-decoration: underline;
    cursor: pointer;
    &:hover {
      color: tomato;
    }
  }
`;

const ProfilePicContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfilePic = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid #ebdddd;

  @media (max-width: 500px) {
    width: 100px;
  }
`;

const FileInputWrapper = styled.div`
  margin-top: 10px;
  .custom-file-upload {
    cursor: pointer;
    background-color: #007bff;
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    display: inline-block;
    font-size: 14px;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

const Info = styled.div`
  width: 60%;
  .owner-ID {
    font-size: 30px;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    @media (max-width: 500px) {
      font-size: 20px;
    }
  }
  .verified {
    color: royalblue;
    margin-left: 5px;
  }
`;

const Stats = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 12px 0;
`;

const Bio = styled.div`
  p {
    margin: 2px 0;
  }
  .category {
    color: gray;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  box-sizing: border-box;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  box-sizing: border-box;
  resize: none;
`;

const StyledButton = styled(Button)`
  padding: 10px 20px;
  background-color: #007bff;
  border: none;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
  &:focus {
    outline: none;
    box-shadow: none;
  }
  margin-top: 10px;
`;
