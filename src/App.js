import React, { useState, useEffect, Suspense } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import AuthService from "./services/auth.service";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardAdmin from "./components/BoardAdmin";
import BoardModerator from "./components/BoardModerator";
import BoardUser from "./components/BoardUser";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import styled from "styled-components";
import { Earth } from "./components/earth";



const CanvasContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: black;
  `;

const App = () => {


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
   
    <CanvasContainer>
  
      <nav className="navbar navbar-expand navbar-dark bg-dark" sx={{ 'margin-right': '5' }}>
     
        <Link to={"/"} className="navbar-brand">
          Figgs
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
            Home
            </Link>
          </li>
          {showModeratorBoard && (
            <li className="nav-item">
              <Link to={"/mod"} className="nav-link">
              Moderator Board
              </Link>
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
        </div>
     
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
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
          
        )}
  
      </nav>

        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/user" element={<BoardUser/>} />
          <Route path="/mod" element={<BoardModerator/>} />
          <Route path="/admin" element={<BoardAdmin/>} />
        </Routes>
        <Canvas   
          camera={{ position: [5, 0, 12], fov: 50, isPerspectiveCamera: true}}
            style={{
              backgroundColor: 'black',
              width: window.innerWidth,
              height: (window.innerHeight - 20),
            }}
          >
            {/* <ambientLight intensity={0.80} /> */}
            {/* <directionalLight intensity={0.6} /> */}
            {/* <gridHelper args={[10,10]} position={[0,-5,0]}/> */}
          <Suspense fallback={null}>
            <Earth />
          </Suspense>
          <OrbitControls />
        </Canvas>
    </CanvasContainer>
  
  );
};

export default App;
