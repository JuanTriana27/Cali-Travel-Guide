import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb, faWalking, faSun } from "@fortawesome/free-solid-svg-icons";
import nipplejs from "nipplejs";
import "./recorridoVirtual.css";

const RecorridoVirtual = () => {
  const mountRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(new THREE.Scene());
  const cameraRef = useRef(null);
  const orbitControlsRef = useRef(null);
  const pointerLockRef = useRef(null);
  const modelRef = useRef();

  const [movimientoActivo, setMovimientoActivo] = useState(false);
  const [luces, setLuces] = useState({
    ambiental: false,
    direccional: false,
    puntual: false,
  });
  const movement = useRef({ forward: false, backward: false, left: false, right: false });
  const movementVector = useRef(new THREE.Vector3(0, 0, 0));

  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  useEffect(() => {
    THREE.Cache.enabled = true;
    const currentMount = mountRef.current;
    const scene = sceneRef.current;
    scene.background = new THREE.Color(0xeeeeee);

    // Configuración de cámara
    const camera = new THREE.PerspectiveCamera(
      75, window.innerWidth / window.innerHeight, 0.1, 1000
    );
    cameraRef.current = camera;

    // Configuración del renderer con optimizaciones
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    currentMount.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Controles
    const orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.enableDamping = true;
    orbitControlsRef.current = orbitControls;

    const pointerLock = new PointerLockControls(camera, renderer.domElement);
    pointerLockRef.current = pointerLock;
    scene.add(pointerLock.getObject());

    // Cargar modelo con optimizaciones
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/examples/js/libs/draco/');
    loader.setDRACOLoader(dracoLoader);

    loader.load(
      "/models/GLTF/Cristo.gltf",
      (gltf) => {
        const model = gltf.scene;
        modelRef.current = model;
    
        // Eliminar transformaciones de centrado y usar posición original
        model.position.set(0, 0, 0);  // <-- Fuerza posición en origen
        model.scale.set(0.2, 0.2, 0.2);
    
        // Optimización de sombras
        model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            
            // Optimizar materiales
            if (child.material) {
              child.material.anisotropy = renderer.capabilities.getMaxAnisotropy();
              child.material.needsUpdate = true;
            }
          }
        });
    
        // Posicionar cámara frente al modelo
        camera.position.set(20, 1.6, 50);
        camera.lookAt(20, 1.6, 50);
        pointerLock.getObject().position.copy(camera.position);
    
        scene.add(model);
      },
      undefined,
      (error) => console.error("Error loading model:", error)
    );

    // Sistema de movimiento
    let joystickManager;
    const clock = new THREE.Clock();
    
    if (isMobile) {
      joystickManager = nipplejs.create({
        zone: document.getElementById("joystickContainer"),
        mode: "static",
        position: { left: "50px", bottom: "50px" },
        color: "blue",
      });

      joystickManager.on("move", (evt, data) => {
        if (data?.angle) {
          const angle = data.angle.radian;
          const force = Math.min(data.distance, 50) / 50;
          movementVector.current.set(
            Math.cos(angle) * force,
            0,
            Math.sin(angle) * force
          );
        }
      });

      joystickManager.on("end", () => {
        movementVector.current.set(0, 0, 0);
      });
    }

    const handleClick = () => {
      if (!isMobile && movimientoActivo) {
        pointerLock.lock();
      }
    };
    renderer.domElement.addEventListener("click", handleClick);

    // Animación optimizada
    const animate = () => {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (movimientoActivo) {
        const speed = 3;
        const distance = speed * delta;
        const controlObject = pointerLock.isLocked ? pointerLock.getObject() : camera;

        if (isMobile) {
          const move = movementVector.current.clone().multiplyScalar(distance);
          controlObject.position.add(move);
        } else if (pointerLock.isLocked) {
          const forward = new THREE.Vector3();
          camera.getWorldDirection(forward);
          forward.y = 0;
          forward.normalize();

          const right = new THREE.Vector3();
          right.crossVectors(forward, camera.up).normalize();

          const moveVector = new THREE.Vector3();
          if (movement.current.forward) moveVector.add(forward);
          if (movement.current.backward) moveVector.sub(forward);
          if (movement.current.right) moveVector.add(right);
          if (movement.current.left) moveVector.sub(right);

          if (moveVector.lengthSq() > 0.001) {
            moveVector.normalize().multiplyScalar(distance);
            controlObject.position.add(moveVector);
          }
        }
      }

      orbitControls.enabled = !pointerLock.isLocked;
      orbitControls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Limpieza optimizada
    return () => {
      // Eliminar modelo y recursos
      if (modelRef.current) {
        modelRef.current.traverse((child) => {
          if (child.isMesh) {
            child.geometry.dispose();
            if (child.material) {
              Array.isArray(child.material) 
                ? child.material.forEach(m => m.dispose())
                : child.material.dispose();
            }
          }
        });
        scene.remove(modelRef.current);
      }

      // Eliminar luces
      scene.children.forEach(child => {
        if (child.isLight) {
          child.dispose();
          scene.remove(child);
        }
      });

      // Eliminar controles y renderer
      if (currentMount && rendererRef.current) {
        currentMount.removeChild(rendererRef.current.domElement);
      }
      renderer.dispose();
      document.removeEventListener("click", handleClick);
      if (isMobile && joystickManager) joystickManager.destroy();
    };
  }, [movimientoActivo, isMobile]);

  // Manejo de teclado
  const handleKey = (e, isKeyDown) => {
    switch (e.key.toLowerCase()) {
      case "w": movement.current.forward = isKeyDown; break;
      case "s": movement.current.backward = isKeyDown; break;
      case "a": movement.current.left = isKeyDown; break;
      case "d": movement.current.right = isKeyDown; break;
      default: break;
    }
  };

  useEffect(() => {
    const keyDownHandler = (e) => handleKey(e, true);
    const keyUpHandler = (e) => handleKey(e, false);
    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("keyup", keyUpHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
      document.removeEventListener("keyup", keyUpHandler);
    };
  }, []);

  // Sistema de iluminación optimizado
  const toggleLuz = (tipo) => {
    const nuevaConfig = { ...luces, [tipo]: !luces[tipo] };
    setLuces(nuevaConfig);
    const scene = sceneRef.current;

    const handleLight = (name, lightCreator) => {
      const existingLight = scene.getObjectByName(name);
      if (existingLight) {
        scene.remove(existingLight);
        existingLight.dispose();
      }
      if (nuevaConfig[tipo]) scene.add(lightCreator());
    };

    switch (tipo) {
      case "ambiental":
        handleLight("ambientLight", () => {
          const light = new THREE.AmbientLight(0xffffff, 0.5);
          light.name = "ambientLight";
          return light;
        });
        break;

      case "direccional":
        handleLight("dirLight", () => {
          const light = new THREE.DirectionalLight(0xffffff, 1);
          light.name = "dirLight";
          light.position.set(5, 10, 5);
          light.castShadow = true;
          light.shadow.mapSize.width = 1024;
          light.shadow.mapSize.height = 1024;
          light.shadow.camera.near = 0.5;
          light.shadow.camera.far = 50;
          return light;
        });
        break;

      default: break;
    }
  };

  return (
    <div className="contenedor-escena">
      <div className="menu-escena">
        <div className="opciones-menu">
          <button
            className={`boton-luz ${luces.ambiental ? "activo" : ""}`}
            onClick={() => toggleLuz("ambiental")}
          >
            <FontAwesomeIcon icon={faSun} />
            <span>Luz Ambiental</span>
          </button>
          <button
            className={`boton-luz ${luces.direccional ? "activo" : ""}`}
            onClick={() => toggleLuz("direccional")}
          >
            <FontAwesomeIcon icon={faLightbulb} />
            <span>Luz Direccional</span>
          </button>
          <button
            className={`boton-movimiento ${movimientoActivo ? "activo" : ""}`}
            onClick={() => setMovimientoActivo(!movimientoActivo)}
          >
            <FontAwesomeIcon icon={faWalking} />
            <span>Movimiento WASD</span>
          </button>
        </div>
      </div>
      <div id="joystickContainer" className="joystick-container"></div>
      <div ref={mountRef} className="visor-3d"></div>
    </div>
  );
};

export default RecorridoVirtual;