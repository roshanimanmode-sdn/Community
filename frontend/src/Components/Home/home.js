import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../Navbar/navbar";
import Stories from "../Stories/stories";
import Post from "../Posts/posts";
import Sidebar from "../SideBar/sideBar";
import Form from "../Form/form";
import { fetchUserDetails } from '../../Services/Auth.service';

export default function Home() {

    useEffect(() => {
        fetchUserData();
      }, []);
    
      const fetchUserData = async () => {
        try {
          const getData = await fetchUserDetails();
          if (getData.status) {
            toast.success(getData?.message);
          } else {
            toast.error(getData.message);
          }
        } catch (error) {
          console.error('Failed to fetch user data:', error);
          toast.error('An error occurred while fetching user data.');
        }
      };
    
      return (
        <>
          <Navbar />
          <div className="App">
            <div className="section">
              {/* <Stories /> */}
              <Sidebar />
              <Post />
              <Form />
              {/* <Footer /> */}
            </div>
          </div>
        </>
      );
    }
