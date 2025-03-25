import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import "./recorridoVirtual.css";

const RecorridoVirtual = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(new THREE.Scene());
  
  useEffect(() => {
    const currentMount = mountRef.current;
    const scene = sceneRef.current;

    // Cargar HDR
    new RGBELoader()
      .setDataType(THREE.FloatType)
      .load(
        process.env.PUBLIC_URL + "/models/Fondo.hdr",
        (texture) => {
          texture.mapping = THREE.EquirectangularReflectionMapping;
          scene.background = texture;
          scene.environment = texture;
        },
        undefined,
        (error) => {
          console.error("Error loading HDR:", error);
          scene.background = new THREE.Color(0xcccccc);
        }
      );

    // Configuración básica de Three.js
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 5);
    
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    currentMount.appendChild(renderer.domElement);
    
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Animación
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      currentMount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="visor-3d"></div>;
};

export default RecorridoVirtual;