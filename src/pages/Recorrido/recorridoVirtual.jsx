import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faCube, faWalking, faSun } from '@fortawesome/free-solid-svg-icons';
import nipplejs from 'nipplejs';
import "./recorridoVirtual.css";

const RecorridoVirtual = () => {
  // Eliminamos setMenuOpen ya que no se usa
  const mountRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(new THREE.Scene());
  const cameraRef = useRef(null);
  const orbitControlsRef = useRef(null);
  const pointerLockRef = useRef(null);
  const raycasterRef = useRef(new THREE.Raycaster());
  const planeRef = useRef(null);

  const [movimientoActivo, setMovimientoActivo] = useState(false);
  const [luces, setLuces] = useState({
    ambiental: false,
    direccional: false,
    puntual: false
  });
  const movement = useRef({ forward: false, backward: false, left: false, right: false });
  // Vector para el joystick (móvil)
  const movementVector = useRef(new THREE.Vector3(0, 0, 0));

  // Detección de dispositivo móvil
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  useEffect(() => {
    // Guardamos la referencia actual del contenedor para usarla en el cleanup
    const currentMount = mountRef.current;

    const scene = sceneRef.current;
    scene.background = new THREE.Color(0xeeeeee);

    // Configuración de la cámara
    const camera = new THREE.PerspectiveCamera(
      75, window.innerWidth / window.innerHeight, 0.1, 1000
    );
    camera.position.set(0, 1.6, 5);
    cameraRef.current = camera;

    // Configuración del renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    currentMount.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Configuración de OrbitControls (usado en modo no pointer lock)
    const orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.enableDamping = true;
    orbitControlsRef.current = orbitControls;

    // Configuración de PointerLockControls para movimiento estilo juego (escritorio)
    const pointerLock = new PointerLockControls(camera, renderer.domElement);
    pointerLockRef.current = pointerLock;
    scene.add(pointerLock.getObject());

    // Crear un plano base para colisiones y ajuste de altura
    const planeGeometry = new THREE.PlaneGeometry(20, 20);
    const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    plane.receiveShadow = true;
    scene.add(plane);
    planeRef.current = plane;

    // Configurar el joystick para móviles
    let joystickManager;
    if (isMobile) {
      joystickManager = nipplejs.create({
        zone: document.getElementById('joystickContainer'),
        mode: 'static',
        position: { left: '50px', bottom: '50px' },
        color: 'blue'
      });

      joystickManager.on('move', (evt, data) => {
        if (data && data.angle) {
          const angle = data.angle.radian;
          // Se normaliza la fuerza; la distancia máxima se considera 50 (ajústalo si es necesario)
          const force = Math.min(data.distance, 50) / 50;
          movementVector.current.set(
            Math.cos(angle) * force,
            0,
            Math.sin(angle) * force
          );
        }
      });
      joystickManager.on('end', () => {
        movementVector.current.set(0, 0, 0);
      });
    }

    // Para escritorio: al hacer click se activa pointer lock si el movimiento está activo
    const handleClick = () => {
      if (!isMobile && movimientoActivo) {
        pointerLock.lock();
      }
    };
    renderer.domElement.addEventListener('click', handleClick);

    // Ciclo de animación
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (movimientoActivo) {
        const speed = 3; // Velocidad en m/s
        const distance = speed * delta;
        let controlObject;
        if (pointerLock.isLocked) {
          controlObject = pointerLock.getObject();
        } else {
          controlObject = camera;
        }

        if (isMobile) {
          // Movimiento según el joystick
          const move = movementVector.current.clone().multiplyScalar(distance);
          controlObject.position.add(move);
        } else if (pointerLock.isLocked) {
          // Movimiento en escritorio con teclado
          const forward = new THREE.Vector3();
          camera.getWorldDirection(forward);
          forward.y = 0;
          forward.normalize();

          const right = new THREE.Vector3();
          right.crossVectors(forward, camera.up).normalize();

          const moveVectorDesktop = new THREE.Vector3();
          if (movement.current.forward) moveVectorDesktop.add(forward);
          if (movement.current.backward) moveVectorDesktop.sub(forward);
          if (movement.current.right) moveVectorDesktop.add(right);
          if (movement.current.left) moveVectorDesktop.sub(right);

          if (moveVectorDesktop.lengthSq() > 0) {
            moveVectorDesktop.normalize().multiplyScalar(distance);
            controlObject.position.add(moveVectorDesktop);
          }
        }

        // Ajustar la altura para "pegar" al suelo usando raycaster
        const pos = pointerLock.isLocked ? pointerLock.getObject().position : camera.position;
        raycasterRef.current.set(pos, new THREE.Vector3(0, -1, 0));
        const intersects = raycasterRef.current.intersectObject(planeRef.current);
        if (intersects.length > 0) {
          pos.y = intersects[0].point.y + 1.6;
        }
      }

      // Desactivar OrbitControls cuando pointer lock está activo
      orbitControls.enabled = !pointerLock.isLocked;
      orbitControls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup: usamos la variable currentMount para evitar que mountRef.current haya cambiado
    return () => {
      if (currentMount && rendererRef.current) {
        currentMount.removeChild(rendererRef.current.domElement);
      }
      renderer.domElement.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleKey);
      document.removeEventListener('keyup', handleKey);
      if (isMobile && joystickManager) joystickManager.destroy();
      renderer.dispose();
    };
  }, [movimientoActivo, isMobile]);

  // Actualiza el estado de las teclas para escritorio
  const handleKey = (e, isKeyDown) => {
    switch (e.key.toLowerCase()) {
      case 'w': movement.current.forward = isKeyDown; break;
      case 's': movement.current.backward = isKeyDown; break;
      case 'a': movement.current.left = isKeyDown; break;
      case 'd': movement.current.right = isKeyDown; break;
      default: break;
    }
  };

  useEffect(() => {
    const keyDownHandler = (e) => handleKey(e, true);
    const keyUpHandler = (e) => handleKey(e, false);
    document.addEventListener('keydown', keyDownHandler);
    document.addEventListener('keyup', keyUpHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
      document.removeEventListener('keyup', keyUpHandler);
    };
  }, []);

  const toggleLuz = (tipo) => {
    const nuevaConfig = { ...luces, [tipo]: !luces[tipo] };
    setLuces(nuevaConfig);
    const scene = sceneRef.current;
    switch (tipo) {
      case 'ambiental':
        const ambientLight = scene.getObjectByName('ambientLight');
        if (ambientLight) scene.remove(ambientLight);
        if (nuevaConfig.ambiental) {
          const newLight = new THREE.AmbientLight(0xffffff, 0.5);
          newLight.name = 'ambientLight';
          scene.add(newLight);
        }
        break;
      case 'direccional':
        const dirLight = scene.getObjectByName('dirLight');
        if (dirLight) scene.remove(dirLight);
        if (nuevaConfig.direccional) {
          const newLight = new THREE.DirectionalLight(0xffffff, 1);
          newLight.name = 'dirLight';
          newLight.position.set(5, 10, 5);
          newLight.castShadow = true;
          scene.add(newLight);
        }
        break;
      default:
        break;
    }
  };

  const addFigura = () => {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(Math.random() * 0xffffff),
      metalness: 0.3,
      roughness: 0.8
    });
    const cube = new THREE.Mesh(geometry, material);
    cube.castShadow = true;
    cube.position.set(
      Math.random() * 10 - 5,
      0.5,
      Math.random() * 10 - 5
    );
    sceneRef.current.add(cube);
  };

  return (
    <div className="contenedor-escena">
      <div className="menu-escena">
        <div className="opciones-menu">
          <button
            className={`boton-luz ${luces.ambiental ? 'activo' : ''}`}
            onClick={() => toggleLuz('ambiental')}
          >
            <FontAwesomeIcon icon={faSun} />
            <span>Luz Ambiental</span>
          </button>
          <button
            className={`boton-luz ${luces.direccional ? 'activo' : ''}`}
            onClick={() => toggleLuz('direccional')}
          >
            <FontAwesomeIcon icon={faLightbulb} />
            <span>Luz Direccional</span>
          </button>
          <button className="boton-figura" onClick={addFigura}>
            <FontAwesomeIcon icon={faCube} />
            <span>Añadir Cubo</span>
          </button>
          <button
            className={`boton-movimiento ${movimientoActivo ? 'activo' : ''}`}
            onClick={() => setMovimientoActivo(!movimientoActivo)}
          >
            <FontAwesomeIcon icon={faWalking} />
            <span>Movimiento WASD</span>
          </button>
        </div>
      </div>
      {/* Contenedor para el joystick (solo en móviles) */}
      <div id="joystickContainer" style={{
        position: 'absolute',
        bottom: '20px',
        left: '20px',
        width: '100px',
        height: '100px',
        zIndex: 10
      }}></div>
      <div ref={mountRef} className="visor-3d"></div>
    </div>
  );
};

export default RecorridoVirtual;
