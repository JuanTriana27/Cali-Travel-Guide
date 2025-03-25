import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import "./recorridoVirtual.css";

const RecorridoVirtual = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(new THREE.Scene());
  const modelRef = useRef();

  useEffect(() => {
    const currentMount = mountRef.current;
    const scene = sceneRef.current;
    let animationFrameId;

    // Cargar HDR
    new RGBELoader()
      .setDataType(THREE.FloatType)
      .load(
        process.env.PUBLIC_URL + "/models/Fondo.hdr",
        (texture) => {
          texture.mapping = THREE.EquirectangularReflectionMapping;
          scene.background = texture;
          scene.environment = texture;

          // Cargar modelo 3D
          new GLTFLoader().load(
            process.env.PUBLIC_URL + "/models/OBJMTL/untitled.gltf",
            (gltf) => {
              modelRef.current = gltf.scene;
              modelRef.current.position.set(0, 0, 0);
              scene.add(modelRef.current);

              const box = new THREE.Box3().setFromObject(modelRef.current);
              const center = box.getCenter(new THREE.Vector3());
              const size = box.getSize(new THREE.Vector3());

              // Nuevo cálculo de distancia (50% más cerca)
              const baseDistance = Math.max(size.x, size.z) * 1.25; // Reducción del 50%
              const cameraHeight = baseDistance * Math.sin(Math.PI / 6); // 30° de ángulo
              const cameraDepth = baseDistance * Math.cos(Math.PI / 6);

              camera.position.set(
                center.x,
                center.y + cameraHeight,
                center.z + cameraDepth
              );

              // Ajustar límites de los controles
              controls.minDistance = baseDistance * 0.5;
              controls.maxDistance = baseDistance * 3;
              controls.target.copy(center);
              controls.update();
            },
            undefined,
            (error) => console.error("Error loading model:", error)
          );
        },
        undefined,
        (error) => {
          console.error("Error loading HDR:", error);
          scene.background = new THREE.Color(0xcccccc);
        }
      );

    // Configuración de cámara con near plane reducido
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.01, // Near plane más pequeño para close-up
      1000
    );

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      logarithmicDepthBuffer: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    currentMount.appendChild(renderer.domElement);

    // Configurar controles orbitales
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.04;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.7;
    controls.minPolarAngle = Math.PI / 6;
    controls.maxPolarAngle = Math.PI / 2.2;

    // Sistema de luces mejorado para close-up
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(3, 5, 3);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    // Animación
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Manejo de redimensión
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      currentMount.removeChild(renderer.domElement);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="visor-3d"></div>;
};

export default RecorridoVirtual;