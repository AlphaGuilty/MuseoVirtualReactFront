import { useRef, useEffect } from "react";
import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import Swal from "sweetalert2";
import axios from "axios";
import controlesImage from "./controles.png";

const Geometry = () => {
  const mountRef = useRef(null); 

  useEffect(() => {    
    const roomWidth = 75;
    const roomHeight = 75;
    const floorY = -4.5;
    const roofY = 10.5;

    let picture1, picture2, picture3, picture4, picture5, picture6, picture7, picture8,
    model1, model2, model3, model4;
    

    // Data from the div as canvas
    const currentRef = mountRef.current;
    const { clientWidth: width, clientHeight: height } = currentRef;

    // Scene, Camera, and Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x393939);
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
    scene.add(camera);
    camera.position.set(0, 0, 5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);

    currentRef.appendChild(renderer.domElement);

    // Resize the canvas
    const resize = () => {
      renderer.setSize(currentRef.clientWidth, currentRef.clientHeight);
      camera.aspect = currentRef.clientWidth / currentRef.clientHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", resize);

    // Texture Loader
    const textureLoader = new THREE.TextureLoader();

    const ambientalLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientalLight);

    // Create a group for collision objects
    var collisionObjects = new THREE.Group();
    scene.add(collisionObjects);

    // Create a group for infp objects
    var infoObjects = new THREE.Group();
    scene.add(infoObjects);

    // Add Floor
    var textureFloor = textureLoader.load(
      "./textures/WoodFloor051_2K_Color.jpg"
    );
    var materialFloor = new THREE.MeshBasicMaterial({ map: textureFloor });
    var geometryFloor = new THREE.PlaneGeometry(roomWidth, roomHeight, 1, 1);
    var planeFloor = new THREE.Mesh(geometryFloor, materialFloor);
    planeFloor.position.y = floorY;
    planeFloor.rotation.x = -Math.PI / 2;
    scene.add(planeFloor);

    // Add Roof
    var textureRoof = textureLoader.load(
      "./textures/Plaster001_2K_Color.jpg"
    );
    var materialRoof = new THREE.MeshBasicMaterial({ map: textureRoof });
    var geometryRoof = new THREE.PlaneGeometry(roomWidth, roomHeight, 1, 1);
    var planeRoof = new THREE.Mesh(geometryRoof, materialRoof);
    planeRoof.position.y = roofY;
    planeRoof.rotation.x = Math.PI / 2;
    scene.add(planeRoof);

    // Add Walls
    var textureWall = textureLoader.load(
      "./textures/Bricks030_2K_Color.jpg"
    );
    textureWall.wrapS = THREE.RepeatWrapping;
    textureWall.wrapT = THREE.RepeatWrapping;
    textureWall.repeat.set(5, 1);
    var materialWall = new THREE.MeshBasicMaterial({ map: textureWall });

    var geometryWall1 = new THREE.PlaneGeometry(
      roomWidth,
      roofY - floorY,
      1,
      1
    );
    var planeWall1 = new THREE.Mesh(geometryWall1, materialWall);
    planeWall1.position.y = (floorY + roofY) / 2;
    planeWall1.position.z = -roomHeight / 2;
    collisionObjects.add(planeWall1);

    var geometryWall2 = new THREE.PlaneGeometry(
      roomWidth,
      roofY - floorY,
      1,
      1
    );
    var planeWall2 = new THREE.Mesh(geometryWall2, materialWall);
    planeWall2.position.y = (floorY + roofY) / 2;
    planeWall2.position.z = roomHeight / 2;
    planeWall2.rotation.y = Math.PI;
    collisionObjects.add(planeWall2);

    var geometryWall3 = new THREE.PlaneGeometry(
      roomHeight,
      roofY - floorY,
      1,
      1
    );
    var planeWall3 = new THREE.Mesh(geometryWall3, materialWall);
    planeWall3.position.y = (floorY + roofY) / 2;
    planeWall3.position.x = roomWidth / 2;
    planeWall3.rotation.y = -Math.PI / 2;
    collisionObjects.add(planeWall3);

    var geometryWall4 = new THREE.PlaneGeometry(
      roomHeight,
      roofY - floorY,
      1,
      1
    );
    var planeWall4 = new THREE.Mesh(geometryWall4, materialWall);
    planeWall4.position.y = (floorY + roofY) / 2;
    planeWall4.position.x = -roomWidth / 2;
    planeWall4.rotation.y = Math.PI / 2;
    collisionObjects.add(planeWall4);

    const loadInfoObjects = () => {
      //Load Picture 1
      const picture1Texture = textureLoader.load(process.env.REACT_APP_API_URL+"/images/"+picture1.imagen);
      const picture1Material = new THREE.MeshBasicMaterial({ map: picture1Texture });
      const picture1Geometry = new THREE.PlaneGeometry(picture1.ancho, picture1.alto);
      const picture1Mesh = new THREE.Mesh(picture1Geometry, picture1Material);
      picture1Mesh.position.set(-roomWidth/4, (floorY + roofY) / 2, (-roomHeight/2)+0.1); 
      picture1Mesh.userData = {
        name: picture1.nombre,
        description: picture1.descripcion,
      };
      infoObjects.add(picture1Mesh);

      //Load Picture 2
      const picture2Texture = textureLoader.load(process.env.REACT_APP_API_URL+"/images/"+picture2.imagen);
      const picture2Material = new THREE.MeshBasicMaterial({ map: picture2Texture });
      const picture2Geometry = new THREE.PlaneGeometry(picture2.ancho, picture2.alto);
      const picture2Mesh = new THREE.Mesh(picture2Geometry, picture2Material);
      picture2Mesh.position.set(roomWidth/4, (floorY + roofY) / 2, (-roomHeight/2)+0.1); 
      picture2Mesh.userData = {
        name: picture2.nombre,
        description: picture2.descripcion,
      };
      infoObjects.add(picture2Mesh);

      //Load Picture 3
      const picture3Texture = textureLoader.load(process.env.REACT_APP_API_URL+"/images/"+picture3.imagen);
      const picture3Material = new THREE.MeshBasicMaterial({ map: picture3Texture });
      const picture3Geometry = new THREE.PlaneGeometry(picture3.ancho, picture3.alto);
      const picture3Mesh = new THREE.Mesh(picture3Geometry, picture3Material);
      picture3Mesh.position.set(-roomWidth/4, (floorY + roofY) / 2, (roomHeight/2)-0.1); 
      picture3Mesh.rotation.y = Math.PI;
      picture3Mesh.userData = {
        name: picture3.nombre,
        description: picture3.descripcion,
      };
      infoObjects.add(picture3Mesh);

      //Load Picture 4
      const picture4Texture = textureLoader.load(process.env.REACT_APP_API_URL+"/images/"+picture4.imagen);
      const picture4Material = new THREE.MeshBasicMaterial({ map: picture4Texture });
      const picture4Geometry = new THREE.PlaneGeometry(picture4.ancho, picture4.alto);
      const picture4Mesh = new THREE.Mesh(picture4Geometry, picture4Material);
      picture4Mesh.position.set(roomWidth/4, (floorY + roofY) / 2, (roomHeight/2)-0.1); 
      picture4Mesh.rotation.y = Math.PI;
      picture4Mesh.userData = {
        name: picture4.nombre,
        description: picture4.descripcion,
      };
      infoObjects.add(picture4Mesh);

      //Load Picture 5
      const picture5Texture = textureLoader.load(process.env.REACT_APP_API_URL+"/images/"+picture5.imagen);
      const picture5Material = new THREE.MeshBasicMaterial({ map: picture5Texture });
      const picture5Geometry = new THREE.PlaneGeometry(picture5.ancho, picture5.alto);
      const picture5Mesh = new THREE.Mesh(picture5Geometry, picture5Material);
      picture5Mesh.position.set((-roomWidth/2)+0.1, (floorY + roofY) / 2, -roomHeight/4); 
      picture5Mesh.rotation.y = Math.PI / 2;
      picture5Mesh.userData = {
        name: picture5.nombre,
        description: picture5.descripcion,
      };
      infoObjects.add(picture5Mesh);

      //Load Picture 6
      const picture6Texture = textureLoader.load(process.env.REACT_APP_API_URL+"/images/"+picture6.imagen);
      const picture6Material = new THREE.MeshBasicMaterial({ map: picture6Texture });
      const picture6Geometry = new THREE.PlaneGeometry(picture6.ancho, picture6.alto);
      const picture6Mesh = new THREE.Mesh(picture6Geometry, picture6Material);
      picture6Mesh.position.set((-roomWidth/2)+0.1, (floorY + roofY) / 2, roomHeight/4); 
      picture6Mesh.rotation.y = Math.PI / 2;
      picture6Mesh.userData = {
        name: picture6.nombre,
        description: picture6.descripcion,
      };
      infoObjects.add(picture6Mesh);

      //Load Picture 7
      const picture7Texture = textureLoader.load(process.env.REACT_APP_API_URL+"/images/"+picture7.imagen);
      const picture7Material = new THREE.MeshBasicMaterial({ map: picture7Texture });
      const picture7Geometry = new THREE.PlaneGeometry(picture7.ancho, picture7.alto);
      const picture7Mesh = new THREE.Mesh(picture7Geometry, picture7Material);
      picture7Mesh.position.set((roomWidth/2)-0.1, (floorY + roofY) / 2, -roomHeight/4); 
      picture7Mesh.rotation.y = -Math.PI / 2;
      picture7Mesh.userData = {
        name: picture7.nombre,
        description: picture7.descripcion,
      };
      infoObjects.add(picture7Mesh);

      //Load Picture 8
      const picture8Texture = textureLoader.load(process.env.REACT_APP_API_URL+"/images/"+picture8.imagen);
      const picture8Material = new THREE.MeshBasicMaterial({ map: picture8Texture });
      const picture8Geometry = new THREE.PlaneGeometry(picture8.ancho, picture8.alto);
      const picture8Mesh = new THREE.Mesh(picture8Geometry, picture8Material);
      picture8Mesh.position.set((roomWidth/2)-0.1, (floorY + roofY) / 2, roomHeight/4); 
      picture8Mesh.rotation.y = -Math.PI / 2;
      picture8Mesh.userData = {
        name: picture8.nombre,
        description: picture8.descripcion,
      };
      infoObjects.add(picture8Mesh);
    }

    const loadModels = () => {
      // Load FBX Model 1
      const fbxLoader = new FBXLoader();
      fbxLoader.load(
        process.env.REACT_APP_API_URL+"/model/"+model1.model3D,
        function (fbx) {
          fbx.traverse(function (child) {
            if (child.isMesh) {
              var textureLoader = new THREE.TextureLoader();
              var texture = textureLoader.load(process.env.REACT_APP_API_URL+"/model/"+model1.textura);
              child.material.map = texture;

              child.userData = {
                name: model1.nombre,
                description: model1.descripcion,
              };
            }
          });
      
          fbx.scale.set(model1.size, model1.size, model1.size);
          fbx.position.set(-roomHeight/4, model1.altura, -roomWidth/4);
          fbx.rotation.y = model1.rotacion
          infoObjects.add(fbx);
        },
        undefined,
        function (error) {
          console.error(error);
        }
      );

      // Load FBX Model 2
      fbxLoader.load(
        process.env.REACT_APP_API_URL+"/model/"+model2.model3D,
        function (fbx) {
          fbx.traverse(function (child) {
            if (child.isMesh) {
              var textureLoader = new THREE.TextureLoader();
              var texture = textureLoader.load(process.env.REACT_APP_API_URL+"/model/"+model2.textura);
              console.log(process.env.REACT_APP_API_URL+"/model/"+model2.textura);
              child.material.map = texture;

              child.userData = {
                name: model2.nombre,
                description: model2.descripcion,
              };
            }
          });
      
          fbx.scale.set(model2.size, model2.size, model2.size);
          fbx.position.set(roomHeight/4, model2.altura, -roomWidth/4);
          fbx.rotation.y = model2.rotacion
          infoObjects.add(fbx);
        },
        undefined,
        function (error) {
          console.error(error);
        }
      );

      // Load FBX Model 3
      fbxLoader.load(
        process.env.REACT_APP_API_URL+"/model/" + model3.model3D,
        function (fbx) {
          fbx.traverse(function (child) {
            if (child.isMesh) {
              var textureLoader = new THREE.TextureLoader();
              var texture = textureLoader.load(
                process.env.REACT_APP_API_URL+"/model/" + model3.textura
              );
              child.material.map = texture;
      
              child.userData = {
                name: model3.nombre,
                description: model3.descripcion,
              };
            }
          });
      
          fbx.scale.set(model3.size, model3.size, model3.size);
          fbx.position.set(-roomHeight/4, model3.altura, roomWidth/4);
          fbx.rotation.y = model3.rotacion;
          infoObjects.add(fbx);
        },
        undefined,
        function (error) {
          console.error(error);
        }
      );
      
      // Load FBX Model 4
      fbxLoader.load(
        process.env.REACT_APP_API_URL+"/model/" + model4.model3D,
        function (fbx) {
          fbx.traverse(function (child) {
            if (child.isMesh) {
              var textureLoader = new THREE.TextureLoader();
              var texture = textureLoader.load(
                process.env.REACT_APP_API_URL+"/model/" + model4.textura
              );
              child.material.map = texture;
      
              child.userData = {
                name: model4.nombre,
                description: model4.descripcion,
              };
            }
          });
      
          fbx.scale.set(model4.size, model4.size, model4.size);
          fbx.position.set(roomHeight/4, model4.altura, roomWidth/4);
          fbx.rotation.y = model4.rotacion;
          infoObjects.add(fbx);
        },
        undefined,
        function (error) {
          console.error(error);
        }
      );     
          
    }

    //Load Info from DB
    Promise.all([
      axios.get(process.env.REACT_APP_API_URL+"/"),
      axios.get(process.env.REACT_APP_API_URL+"/model")
    ])
      .then(async ([pictureResponse, modelResponse]) => {
        const pictures = pictureResponse.data;
        const models = modelResponse.data;

        picture1 = pictures[0];
        picture2 = pictures[1];
        picture3 = pictures[2];
        picture4 = pictures[3];
        picture5 = pictures[4];
        picture6 = pictures[5];
        picture7 = pictures[6];
        picture8 = pictures[7];

        model1 = models[0];
        model2 = models[1];
        model3 = models[2];
        model4 = models[3]; 

        loadInfoObjects();
        loadModels();
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });

    Swal.fire({
      title: "¡Bienvenido!",
      imageUrl: "../../../controles.png",
      text: "Haz clic en una imagen o modelo para tener más información",
      confirmButtonText: "Cerrar"
    });

    // Add click event listener for object selection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    let enableObjectDetection = true;

    function onMouseClick(event) {
    // Calculate normalized device coordinates
    mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

    // Cast a ray from the camera to the clicked position
    raycaster.setFromCamera(mouse, camera);

    // Find intersected objects in infoObjects
    const infoIntersects = raycaster.intersectObjects(infoObjects.children, true);

    
    if (!enableObjectDetection) {
      return;
    }

    if (infoIntersects.length > 0) {
      const selectedObject = infoIntersects[0].object;

      // Obtener la información personalizada del objeto
      const { name, description } = selectedObject.userData;
      console.log(selectedObject);

      // Mostrar información en el pop-up
      Swal.fire({
        title: `${name}`,
        html: `<div style="text-align: justify;">${description}</div>`,
        icon: "info",
        confirmButtonText: "Close"
      }).then(async (result) => {
        // Reactivar la detección de objetos después de cerrar el pop-up
        await delay(250);
        enableObjectDetection = true;
      });

      // Desactivar la detección de objetos mientras se muestra el pop-up
      setTimeout(console.log, 3000);
      enableObjectDetection = false;
    }
  }

// Función de retraso usando async/await
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

    window.addEventListener("click", onMouseClick, false);

    // Add key event listeners for camera movement
    var movementVector = new THREE.Vector3();
    var keyState = {};
    window.addEventListener("keydown", function (event) {
      keyState[event.code] = true;
    });
    window.addEventListener("keyup", function (event) {
      keyState[event.code] = false;
    });

    function animate() {
      requestAnimationFrame(animate);

      // Handle camera rotation
      if (keyState["KeyQ"]) {
        camera.rotation.y += 0.05;
      }
      if (keyState["KeyE"]) {
        camera.rotation.y -= 0.05;
      }

      // Handle camera movement
      movementVector.set(0, 0, 0);
      if (keyState["KeyW"]) {
        movementVector.z -= 0.45;
      }
      if (keyState["KeyS"]) {
        movementVector.z += 0.45;
      }
      if (keyState["KeyA"]) {
        movementVector.x -= 0.45;
      }
      if (keyState["KeyD"]) {
        movementVector.x += 0.45;
      }
      movementVector.applyQuaternion(camera.quaternion);
      camera.position.add(movementVector);

      // Create a ray from the camera position in the movement direction
      var ray = new THREE.Raycaster(
        camera.position,
        movementVector.clone().normalize()
      );
      var rayRight = new THREE.Raycaster(
        camera.position,
        movementVector
          .clone()
          .normalize()
          .applyAxisAngle(new THREE.Vector3(0, 1, 0), -Math.PI / 6)
      );
      var rayLeft = new THREE.Raycaster(
        camera.position,
        movementVector
          .clone()
          .normalize()
          .applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 6)
      );

      // Check for intersections with the collision objects
      var intersects = ray.intersectObjects(collisionObjects.children);
      var rightIntersections = rayRight.intersectObjects(
        collisionObjects.children
      );
      var leftIntersections = rayLeft.intersectObjects(
        collisionObjects.children
      );

      if (intersects.length > 0) {
        // Get the distance between the intersection point and the camera
        var distance = intersects[0].point.distanceTo(camera.position);

        // Stop the camera if it's too close to the intersection point
        if (distance < 1) {
          camera.position.sub(movementVector);
        }
      }

      if (rightIntersections.length > 0) {
        // Get the distance between the intersection point and the camera
        var distance = rightIntersections[0].point.distanceTo(camera.position);

        // Stop the camera if it's too close to the intersection point
        if (distance < 1) {
          camera.position.sub(movementVector);
        }
      }

      if (leftIntersections.length > 0) {
        // Get the distance between the intersection point and the camera
        var distance = leftIntersections[0].point.distanceTo(camera.position);

        // Stop the camera if it's too close to the intersection point
        if (distance < 1) {
          camera.position.sub(movementVector);
        }
      }

      // Check for intersections with the collision objects
      var intersects = ray.intersectObjects(infoObjects.children);
      var rightIntersections = rayRight.intersectObjects(
        infoObjects.children
      );
      var leftIntersections = rayLeft.intersectObjects(
        infoObjects.children
      );

      if (intersects.length > 0) {
        // Get the distance between the intersection point and the camera
        var distance = intersects[0].point.distanceTo(camera.position);

        // Stop the camera if it's too close to the intersection point
        if (distance < 1) {
          camera.position.sub(movementVector);
        }
      }

      if (rightIntersections.length > 0) {
        // Get the distance between the intersection point and the camera
        var distance = rightIntersections[0].point.distanceTo(camera.position);

        // Stop the camera if it's too close to the intersection point
        if (distance < 1) {
          camera.position.sub(movementVector);
        }
      }

      if (leftIntersections.length > 0) {
        // Get the distance between the intersection point and the camera
        var distance = leftIntersections[0].point.distanceTo(camera.position);

        // Stop the camera if it's too close to the intersection point
        if (distance < 1) {
          camera.position.sub(movementVector);
        }
      }

      renderer.render(scene, camera);
    }

    animate();

    // Clean up
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("click", onMouseClick);
      currentRef.removeChild(renderer.domElement);
    };
  });

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <div className="Contenedor3D" ref={mountRef} style={{ width: "100%", height: "100%" }}></div>
      <img src={controlesImage} alt="Controles" style={{ position: "absolute", bottom: "20px", right: "20px", opacity: "0.7" , zIndex: "9999" }} />
    </div>
  );
};

export default Geometry;
