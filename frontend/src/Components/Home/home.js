import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../Navbar/navbar";
import Stories from "../Stories/stories";
import Post from "../Posts/posts";
import Sidebar from "../SideBar/sideBar";
import Form from "../Form/form";

const Home = () => {
    return (
        <>
            <Navbar />
            <div className="App">
                <div className="section">
                    {/* <Stories /> */}
                    <Sidebar />
                    <Post/>
                    <Form />
                    {/* <Footer /> */}
                </div>
            </div>
        </>
    );
};

export default Home;
