import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import "./recorridoVirtual.css";

const RecorridoVirtual = () => {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const scene = useRef(new THREE.Scene());
  const modelRef = useRef();
  const camera = useRef();
  const controls = useRef();
  const renderer = useRef();

  useEffect(() => {
    const currentContainer = containerRef.current;

    // Configuración inicial
    const width = currentContainer.clientWidth;
    const height = currentContainer.clientHeight;

    // Inicializar renderizador
    renderer.current = new THREE.WebGLRenderer({
      antialias: true,
      logarithmicDepthBuffer: true,
      alpha: true
    });
    renderer.current.setSize(width, height);
    renderer.current.setPixelRatio(window.devicePixelRatio);
    currentContainer.appendChild(renderer.current.domElement);

    // Configurar cámara
    camera.current = new THREE.PerspectiveCamera(
      60,
      width / height,
      0.01,
      1000
    );

    // Cargar HDR
    new RGBELoader()
      .setDataType(THREE.FloatType)
      .load(
        process.env.PUBLIC_URL + "/models/Fondo.hdr",
        (texture) => {
          texture.mapping = THREE.EquirectangularReflectionMapping;
          scene.current.background = texture;
          scene.current.environment = texture;

          // Cargar modelo 3D
          new GLTFLoader().load(
            process.env.PUBLIC_URL + "/models/GLTF/CristoRey.gltf",
            (gltf) => {
              modelRef.current = gltf.scene;
              modelRef.current.position.set(0, 0, 0);
              scene.current.add(modelRef.current);

              const box = new THREE.Box3().setFromObject(modelRef.current);
              const center = box.getCenter(new THREE.Vector3());
              const size = box.getSize(new THREE.Vector3());

              // Cálculo de posición de cámara
              const baseDistance = Math.max(size.x, size.z) * 1.25;
              const cameraHeight = baseDistance * Math.sin(Math.PI / 6);
              const cameraDepth = baseDistance * Math.cos(Math.PI / 6);

              camera.current.position.set(
                center.x,
                center.y + cameraHeight,
                center.z + cameraDepth
              );

              // Configurar controles orbitales
              controls.current = new OrbitControls(camera.current, renderer.current.domElement);
              controls.current.enableDamping = true;
              controls.current.dampingFactor = 0.04;
              controls.current.autoRotate = true;
              controls.current.autoRotateSpeed = 0.7;
              controls.current.minDistance = baseDistance * 0.5;
              controls.current.maxDistance = baseDistance * 3;
              controls.current.target.copy(center);
              controls.current.update();
            },
            undefined,
            (error) => console.error("Error loading model:", error)
          );
        },
        undefined,
        (error) => {
          console.error("Error loading HDR:", error);
          scene.current.background = new THREE.Color(0xcccccc);
        }
      );

    // Sistema de luces
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    scene.current.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(3, 5, 3);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.current.add(directionalLight);

    // Animación
    const animate = () => {
      requestAnimationFrame(animate);
      if (controls.current) controls.current.update();
      renderer.current.render(scene.current, camera.current);
    };
    animate();

    // Manejo de redimensión
    const handleResize = () => {
      const newWidth = currentContainer.clientWidth;
      const newHeight = currentContainer.clientHeight;

      camera.current.aspect = newWidth / newHeight;
      camera.current.updateProjectionMatrix();
      renderer.current.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Limpieza
    return () => {
      window.removeEventListener('resize', handleResize);
      currentContainer.removeChild(renderer.current.domElement);
      renderer.current.dispose();
      if (controls.current) controls.current.dispose();
    };
  }, []);

  return (
    <div className="contenedor-escena">
      <header className="ar-header">
        <h1>{t('recorridoVirtual.title')}</h1>
        <p>{t('recorridoVirtual.subtitle')}</p>
      </header>

      <div className="scanner-container" ref={containerRef}>
        <div className="scanner-overlay">
          <div className="scanning-animation"></div>
        </div>
      </div>
    </div>
  );
};

export default RecorridoVirtual;