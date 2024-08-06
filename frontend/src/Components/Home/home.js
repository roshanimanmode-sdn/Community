import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../Navbar/navbar";
import Stories from "../Stories/stories";
import Post from "../Posts/posts";
import Sidebar from "../SideBar/sideBar";
import Form from "../Form/form";
import { fetchAllUsers } from '../../Services/Auth.service';
import { useDispatch } from 'react-redux';

const Home = () => {
  const dispatch = useDispatch();
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    const fetchAllUserData = async () => {
        try {
            const getData = await fetchAllUsers(dispatch);
            if (getData?.status) {
                setAllPosts(getData?.data);
            } else {
              console.log("Error:",getData?.message);
              
            }
        } catch (error) {
            console.error('Failed to fetch user data:', error);
        }
    };

    fetchAllUserData();
}, []);

    return (
        <>
            <Navbar />
            <div className="App">
                <div className="section">
                    {/* <Stories /> */}
                    <Sidebar />
                    <Post allPosts={allPosts}/>
                    <Form />
                    {/* <Footer /> */}
                </div>
            </div>
        </>
    );
};

export default Home;
