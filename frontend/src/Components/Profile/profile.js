import React from 'react';
import styled from "styled-components";
import ProfileInfo from "./profileInfo";
import ProfilePosts from "./profilePost";

export default function Profile(props) {

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
