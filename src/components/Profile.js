import React from "react";
import AuthService from "../services/auth.service";
import styled from "styled-components";

const TopSectionContainer = styled.div`
    position: absolute;
    width: 100%;
    height: 92.9%;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 15%;
    z-index: 99;
    
`;

const Logo = styled.div`
    margin: 0;
    color: #fff;
    font-weight: 700;
    font-size: 45px;
`;

const Slogan = styled.h4`
margin: 0;
color: #fff;
font-weight: 700;
font-size: 15px;
margin-top: 1em;
`

const Profile = () => {
    const currentUser = AuthService.getCurrentUser();
    return(
       <TopSectionContainer>
                <Logo>
                   {currentUser.username} Profile
                </Logo>
            <Slogan>
                <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
                {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
            </Slogan>
            <Slogan>
                <strong>Id:</strong> {currentUser.id}
            </Slogan>
            <Slogan>
                <strong>Email:</strong> {currentUser.email}
            </Slogan>
            <Slogan>Authorities:</Slogan>
            <Slogan>
                {currentUser.roles &&
                currentUser.roles.map((role, index) => 
                <li key={index}>{role}</li>)}
            </Slogan>
        </TopSectionContainer>
    );
};
export default Profile;