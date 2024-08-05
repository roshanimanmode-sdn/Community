import React from 'react';
import styled from "styled-components";
import ProfileInfo from "./profileInfo";
import ProfilePosts from "./profilePost";
import { useSelector } from 'react-redux';

export default function Profile(props) {
    const postData = useSelector((state) => state.postData.data);
    console.log("postData--",postData);
    

    return (
        <>
            <Container>
                <ProfileInfo />
                <ProfilePosts />
            </Container>
            
        </>
    )
}

const Container = styled.div`
  margin: 0 auto;
  height: 100vh;
  max-width: 700px;
`;
