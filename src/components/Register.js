import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import AuthService from "../services/auth.service";
import styled from "styled-components";

const required = (value) => {
    if (!value){
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const TopSectionContainer = styled.div`
    position: absolute;
    width: 100%;
    height: 92.9%;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 99;
    
`;

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
    align: center;
    transition: all 350ms ease-in-out;

    &:hover {
        background-color: transparent;
        border: 2px solid #27b927;
    }

`


const validEmail = (value) => {
    if(!isEmail(value)){
        return(
            <div className="alert alert-danger" role="alert">
                Please enter a valid email address!
            </div>
        );
    }
};

const vUsername = (value) => {
    if(value.length < 3 || value.length > 20){
        return (
            <div className="alert alert-danger" role="alert">
            The username must be between 3 and 20 characters.
        </div>
        );
    }
};

const vPassword = (value) => {
    if(value.length < 6 || value.length > 40){
        return (
            <div className="alert alert-danger" role="alert">
            The password must be between 6 and 40 characters.
        </div>
        );
    }
};

const Register = () => {
    const form = useRef();
    const checkBtn = useRef();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [succesful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleRegister = (e) => {
        e.preventDefault();
        setMessage("");
        setSuccessful(false);
        form.current.validateAll();
        if (checkBtn.current.context._errors.length === 0){
            AuthService.register(username, email, password).then(
                (response) => {
                    setMessage(response.data.message);
                    setSuccessful(true);
                },
                (error) => {
                    const resMessage = 
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                        error.message ||
                        error.toString();
                        setMessage(resMessage);
                        setSuccessful(false);
                
                }
            );
        }
    };
    
    return(
       <TopSectionContainer>
            <div className="card card-container">
                <img src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                alt="profile-img"
                className="profile-img-card"
                />
            <Form onSubmit={handleRegister} ref={form}>
                {!succesful && (
                <div>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                    <Input 
                        type="text"
                        className="form-control"
                        name="username"
                        value={username}
                        onChange={onChangeUsername}
                        validations={[required, vUsername]}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                    <Input 
                        type="text"
                        className="form-control"
                        name="password"
                        value={email}
                        onChange={onChangeEmail}
                        validations={[required, validEmail]}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                    <Input 
                        type="password"
                        className="form-control"
                        name="password"
                        value={password}
                        onChange={onChangePassword}
                        validations={[required, vPassword]}
                        />
                    </div>

                    <div className="form-group">
                        <UButton className="btn btn-primary btn-block">
                        Sign Up
                        </UButton>
                    </div>
                </div>
                )}
                {message && (
                    <div className="form-group">
                        <div className={ succesful ? "alert alert-success" : "alert alert-danger" } 
                        role="alert">
                            {message}
                        </div>
                    </div>
                )}
                 <CheckButton style={{ display: "none" }} ref={checkBtn} />
            </Form>
        
            </div>

    </TopSectionContainer>
    );
};
export default Register;
