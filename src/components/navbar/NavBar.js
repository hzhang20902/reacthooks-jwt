import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import MenuButton from './MenuButton';
import AuthService from '../../services/auth.service';
import { Typography } from '@mui/material';
import styled from 'styled-components';

const UButton = styled.button`
    outline: none;
    border: none;
    background-color: white;
    color: black;
    font-size: 2px;
    border-radius: 5px;
    padding: 2px 6em;
    margin-right: 1%;
    cursor: pointer;
    border: 1px solid transparent;
    transition: all 250ms ease-in-out;

    &:hover {
        background-color: grey;
        border: 2px solid white;
    }

`
export default function NavBar() {

    const [showModeratorBoard, setShowModeratorBoard] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);
  
    useEffect(() => {
      const user = AuthService.getCurrentUser();
      if (user) {
        setCurrentUser(user);
        setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
        setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
      }
    }, []);
  
    const logOut = () => {
      AuthService.logout();
    };

    return (
 
        <AppBar>
          <Toolbar variant="dense" sx={{ backgroundColor: "darkblue" }}>
            {/* <MenuButton />
      */}
      <UButton>
        <Link to={"/"} className="nav-link">
        <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, "font-weight": "bold", letterSpacing: 1 }}>
            Figgs
        </Typography>
        </Link>
        </UButton>

        <UButton>
        <Link to={"/home"} className="nav-link">
            <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, "font-weight": "bold", letterSpacing: 1 }}>
            Home
        </Typography>
            </Link>
        </UButton>
          {showModeratorBoard && (
            <li className="nav-item">
              <UButton to={"/mod"} className="nav-link">
              Moderator Board
              </UButton>
            </li>
          )}
           {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
              Admin Board
              </Link>
            </li>
          )}
           {currentUser && (
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
              User
              </Link>
            </li>
          )}
       
        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
              {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
            <UButton>
              <Link to={"/login"} className="nav-link">
              <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, "font-weight": "bold", letterSpacing: 1 }}>
                Login
                </Typography>
              </Link>
              </UButton>
            </li>
            <li className='nav-item'>
              <UButton>
              <Link to={"/register"} className="nav-link">
              <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, "font-weight": "bold", letterSpacing: 1 }}>
                Sign Up
                </Typography>
              </Link>
              </UButton>
         </li>
          </div>
        )}
   
            <Button variant="outlined" target="_blank" href="https://www.amazon.com/hz/wishlist/ls/1F0WL8J9XEG5L/ref=nav_wishlist_lists_1?_encoding=UTF8&type=wishlist" color="inherit" sx={{ "font-weight": "bold" }}>
              Donate
            </Button>
          </Toolbar>
        </AppBar>
     
    );
  }