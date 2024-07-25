import React, { useState } from "react";
import styled from "styled-components";
import Form from "../Form/form";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem
} from "reactstrap";
import LeftArrow from "../../assets/img/icons/common/leftArrow.png";
import Logo from "../../assets/img/icons/common/Logo.png";
import Icon from "../../assets/sidebar/forms.svg";
import settingIcon from "../../assets/sidebar/setting.svg";
import userIcon from "../../assets/sidebar/roles.svg";
import viewProfileIcon from "../../assets/sidebar/viewProfile.svg";


export default function SideBar() {
    const usersData = useSelector((state) => state.profileData);
    const usersList = Object.keys(usersData);
    const currentUser = usersData[usersList[usersList.length - 1]];

    const bringForm = () => {
        let form = document.querySelector(".new-img");
        form.classList.toggle("active");
    };

    const [isCollapsed, setIsCollapsed] = useState(false);
    const toggle = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <>
            {/* <div>
                <Container className="new-post">
                    <div className="profile-gateway">
                        <img src={currentUser.profilePic} alt="profilePic" />
                        <div>
                            <Link to={`/profile/${currentUser.userID}`}>
                                <p>{currentUser.userID}</p>
                            </Link>
                            <p className="name">{currentUser.name}</p>
                        </div>
                    </div>
                    <div className="btn" onClick={bringForm}>
                        <AddCircleIcon />
                        <p>Add a Post</p>
                        <div className="box"></div>
                    </div>
                </Container>
                <Form />
            </div> */}
            <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
                <div className="logo_container">
                    <Navbar>
                        <div className="navbar-brand">
                            <NavbarBrand href="/home">
                                <div className="d-flex justify-content-between align-items-center logo-container gap-2">
                                    <div>
                                        <img src={Logo} alt="Logo-img" />
                                    </div>
                                    <div className={`collapse_block ${isCollapsed ? "hide" : ""}`}>
                                        <h3>Community</h3>
                                    </div>
                                </div>
                            </NavbarBrand>
                            <div onClick={toggle} className="toggle_img">
                                <img src={LeftArrow} alt="text_logo" />
                            </div>
                        </div>
                        <Nav className="me-auto" navbar>
                            <NavItem>
                                <Link to={URL}>
                                    <div className="d-flex gap-3 link align-items-center nav_space" onClick={bringForm}>
                                        <div className="icon-wrap">
                                            <img src={userIcon} alt="icon" />
                                        </div>
                                        <h4 className={`collapse_block ${isCollapsed ? "hide" : ""}`}>Add Post</h4>
                                    </div>
                                    <div className="d-flex gap-3 link align-items-center nav_space">
                                        <div className="icon-wrap">
                                            <img src={viewProfileIcon} alt="icon" />
                                        </div>
                                        <h4 className={`collapse_block ${isCollapsed ? "hide" : ""}`}>View Profile</h4>
                                    </div>
                                    <div className="d-flex gap-3 link align-items-center nav_space">
                                        <div className="icon-wrap">
                                            <img src={settingIcon} alt="icon" />
                                        </div>
                                        <h4 className={`collapse_block ${isCollapsed ? "hide" : ""}`}>Settings</h4>
                                    </div>
                                    <div className="d-flex gap-3 link align-items-center nav_space">
                                        <div className="icon-wrap">
                                            <img src={Icon} alt="icon" />
                                        </div>
                                        <h4 className={`collapse_block ${isCollapsed ? "hide" : ""}`}>Notification</h4>
                                    </div>
                                </Link>
                            </NavItem>
                        </Nav>
                    </Navbar>
                </div>
            </div>
            <Form />
        </>
    )
}

const Container = styled.div`
  position: fixed;
  top: 50%;
  right: 20%;

  .btn {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding: 5px 10px;
    border: 1px solid hsl(147, 7%, 75%);
    border-radius: 5px;
    cursor: pointer;
    transition: transform 0.3s;

    .box {
      position: absolute;
      z-index: 0;
      height: 100%;
      width: 100%;
      transform: scale(0);
      opacity: 0;
      background: linear-gradient(70deg, #962fbf, #4f5bd5);
      transition: all 0.3s;
    }

    svg,
    p {
      z-index: 1;
      background: transparent;
      font-weight: bold;
    }

    svg {
      font-size: 30px;
      margin-right: 5px;
    }

    &:hover {
      transform: scale(1.1);
      svg,
      p {
        color: white;
      }

      .box {
        transform: scale(1);
        opacity: 1;
      }
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;
