import React, { useRef } from 'react';
import GroundTexture from '../../textures/groundTexture.jpg';
import EarthClear from '../../textures/earth_noClouds.jpg';
import Clouds from '../../textures/clouds.jpeg';

import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

export function Earth(props){

    const [clouds,
        earthClear,
        groundTexture] = useLoader(
        TextureLoader, 
        [Clouds, EarthClear, GroundTexture]
        );

    const earthRef = useRef();
    const cloudsRef = useRef();

    useFrame(( { clock } )=>{
        const elapsedTime = clock.getElapsedTime();
        earthRef.current.rotation.y = elapsedTime / 8;
        cloudsRef.current.rotation.y = elapsedTime / 8
    })
    
    return <>

        {/* <ambientLight intensity={0.8} /> */}
        <pointLight 
        color='#f6f3ea' 
        position={[10, 7, 17]} 
        intensity={3.1} 
        />

        <Stars 
        radius={300} 
        depth={60} 
        count={20000} 
        factor={9} 
        saturation={0} 
        fade={true}/>

        <mesh position={[0,0,-4]} ref={cloudsRef}>
            <sphereGeometry args={[3.025, 32, 32]} />
            <meshPhongMaterial 
            map={clouds}
            transparent={true}
            depthWrite={true} 
            opacity={0.6}
            side={THREE.DoubleSide} />
        </mesh>

        <mesh position={[0,0,-4]} ref={earthRef}>
            <sphereGeometry args={[3, 32, 32]} />
            <meshPhongMaterial color='red' />
            <meshStandardMaterial 
            map={earthClear} 
            normalMap={groundTexture}
            metalness={0.6}
            roughness={0.3}/>
            <OrbitControls 
                enableZoom={true} 
                enablePan={true}
                enableRotate={true}
                zoomSpeed={0.6}
                panSpeed={0.5}
                rotateSpeed={0.4} />
        </mesh>
    </>

}