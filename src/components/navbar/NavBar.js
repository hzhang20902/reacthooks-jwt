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
    background-color: darkblue;
    color: white;
    font-size: 1px;
    border-radius: 3px
    margin-right: 1%;
    cursor: pointer;
    border: 1px solid transparent;
    transition: all 250ms ease-in-out;

    &:hover {
        background-color: white;
        color: white;
        border: 1px solid white;
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
  <Box sx={{flexGrow: 1,}}>
  <AppBar>
    <Toolbar variant='dense' sx={{ backgroundColor: "darkblue" }}>
      {/* <MenuButton />
      */}
    <UButton>
      <Link to={"/"} className="nav-link">
      <Typography
          variant="h6"
          sx={{ flexGrow: 1, "font-weight": "bold", letterSpacing: 1 }}>
          Figgs
      </Typography>
      </Link>
      </UButton>

      <UButton>
      <Link to={"/home"} className="nav-link">
          <Typography
          variant="h6"
          sx={{ flexGrow: 1, letterSpacing: 1 }}>
          Home
      </Typography>
          </Link>
      </UButton>
        {showModeratorBoard && (
  
          <UButton>
            <Link to={"/mod"} className="nav-link">
            <Typography
          variant="h6"
          sx={{ flexGrow: 1, letterSpacing: 1 }}>
            Moderator Board
            </Typography>
            </Link>
            </UButton>
          
        )}
          {showAdminBoard && (
         <UButton>
            <Link to={"/admin"} className="nav-link">
            <Typography
          variant="h6"
          sx={{ flexGrow: 1, letterSpacing: 1 }}>
            Admin Board
            </Typography>
            </Link>
            </UButton>
        )}
          {currentUser && (
            <UButton>
            <Link to={"/user"} className="nav-link">
            <Typography
          variant="h6"
          sx={{ flexGrow: 1, letterSpacing: 1 }}>
            About
            </Typography>
            </Link>
            </UButton>
        )}
      
      {currentUser ? (
        <>
          <UButton>
            <Link to={"/profile"} className="nav-link">
            <Typography
          variant="h6"
          sx={{ flexGrow: 1,  letterSpacing: 1 }}>
            {currentUser.username}
            </Typography>
            </Link>
            </UButton>
          <UButton>
          <Typography
          variant="h6"
          sx={{ flexGrow: 1, "font-weight": "bold", letterSpacing: 1 }}>
            <a href="/login" className="nav-link" onClick={logOut}>
              LogOut
            </a>
            </Typography>
          </UButton>
          </>
      ) : (
        <>
        <UButton>
            <Link to={"/login"} className="nav-link">
            <Typography variant="h6" 
            sx={{ flexGrow: 1, letterSpacing: 1 }}>
              Login
              </Typography>
            </Link>
            </UButton>

            <UButton>
            <Link to={"/register"} className="nav-link">
            <Typography variant="h6" 
            sx={{ flexGrow: 1, letterSpacing: 1 }}>
              Sign Up
              </Typography>
            </Link>
            </UButton>
        </>
      )}

          <Button 
          
          target="_blank" 
          href="https://www.amazon.com/hz/wishlist/ls/1F0WL8J9XEG5L/ref=nav_wishlist_lists_1?_encoding=UTF8&type=wishlist" 
        
          sx={{ "font-weight": "bold",
          "alignSelf": 'stretch' }}>
            Donate
          </Button>
    </Toolbar>
  </AppBar>
  </Box>
  );
}