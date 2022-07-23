import React from "react";
import styled from "styled-components";

const TopSectionContainer = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: #1700dd82;
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
font-size: 30px;
margin-top: 1em;
`
const UButton = styled.button`
    outline: none;
    border: none;
    background-color: #27b927;
    color: #fff;
    font-size: 16px;
    font-weight: 700;
    border-radius: 8px;
    padding: 8px 2em;
    margin-top: 3em;
    cursor: pointer;
    border: 2px solid transparent;
    transition: all 350ms ease-in-out;

    &:hover {
        background-color: transparent;
        border: 2px solid #27b927;
    }

`

export function TopSection() {
    return (
    <TopSectionContainer>
        <Logo>
            House of the Rising Buns
        </Logo>
        <Slogan>
            Click, drag, and zoom!!
        </Slogan>
        <UButton>Donate</UButton>
        
    </TopSectionContainer>
    );
}