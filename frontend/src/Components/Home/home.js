import React from 'react';
import Navbar from "../Navbar/navbar";
import Stories from "../Stories/stories";
import Post from "../Posts/posts";
import Sidebar from "../SideBar/sideBar";
import Form from "../Form/form";


export default function Home() {

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
    )
}
