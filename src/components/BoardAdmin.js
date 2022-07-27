import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import styled from "styled-components";

const TopSectionContainer = styled.div`
    position: absolute;
    width: 100%;
    height: 92.9%;
    bottom: 0;
    left: 0;
    background-color: #1755dd42;
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
const BoardAdmin = () => {
    const [content, setContent]  = useState("");

    useEffect(() => {
        UserService.getAdminBoard().then(
            (response) => {
                setContent(response.data);
            },
            (error) => {
                const _content = 
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
                setContent(_content);
            }
        );
    }, []);

    return(
        <TopSectionContainer>
            <Logo>
                {content}
            </Logo>
        </TopSectionContainer>
    );
};
export default BoardAdmin;