import * as THREE from "three";
import { generateStars } from "./starsss.js";

function isMobileOrTablet() {
  const userAgent = navigator.userAgent.toLowerCase();
  return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/.test(userAgent);
}

let isPortrait = false;
if (isMobileOrTablet()) {
  console.log("Device is mobile or tablet");
  isPortrait = true
} else {
  console.log("Device is desktop or laptop");
}

let width = window.innerWidth;
let height = window.innerHeight;

function initSatelliteCursor(size = 32) {
  const sat = new Image();
  sat.src = "./assets/sat.gif";
  let cursor = document.createElement("div");
  cursor.style.position = "fixed";
  cursor.style.width = `${size}px`;
  cursor.style.height = `${size}px`;
  cursor.style.backgroundImage = `url(${sat.src})`;
  cursor.style.backgroundSize = "contain";
  cursor.style.pointerEvents = "none";
  cursor.style.zIndex = "9999";
  document.body.appendChild(cursor);

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX - size / 2 + "px";
    cursor.style.top = e.clientY - size / 2 + "px";
  });
}

let cameraZ = 2;
if (isPortrait) {     // Portrait mode
  cameraZ = 3.5;
} else {              // Landscape Mode
  initSatelliteCursor(150);
}

const canvas = document.querySelector("#canvas");
canvas.width = width;
canvas.height = height;
let scene, camera, renderer, earthMain, stars;
function setupBG() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
  camera.position.z = cameraZ;
  renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize(width, height);

  let sun = new THREE.DirectionalLight(0xffffff, 5);
  sun.position.set(-3, 3, 3); // Top-left position
  scene.add(sun);

  let hemisphereLight = new THREE.HemisphereLight("#ffffff", "#8888ff", 0.5);
  scene.add(hemisphereLight);

  const textureLoader = new THREE.TextureLoader();
  const night = textureLoader.load("./assets/earth_night.jpg");
  // const day = textureLoader.load("./assets/earth_day_8k.jpg");
  let geometry = new THREE.IcosahedronGeometry(1, 10);
  let material = new THREE.MeshStandardMaterial({
    map: night,
  });
  let earth = new THREE.Mesh(geometry, material);
  earthMain = new THREE.Group();
  earthMain.add(earth);
  earthMain.rotation.z = -23.4 * (Math.PI / 180);
  scene.add(earthMain);

  stars = generateStars(1500);
  scene.add(stars);
}
setupBG();

const intro = document.querySelector("#intro");
const about = document.querySelector("#about");
const services = document.querySelector("#servicesAll");
const s1 = document.querySelector("#service1");
const s2 = document.querySelector("#service2");
const s3 = document.querySelector("#service3");
const s4 = document.querySelector("#service4");
const projects = document.querySelector("#projects");
const collabs = document.querySelector("#collabs");
const contact = document.querySelector("#contact");
const header = document.querySelector("#header");
const footer = document.querySelector("#footer");
const menu_D = document.querySelector("#header-links");
const menu_M = document.querySelector("#side-menu-btn");
const menu_Tray = document.querySelector("#side-menu-tray");
const menu_TrayClose = document.querySelector("#close-menu");

if (isPortrait) {
  menu_D.style.display = "none";
  menu_M.style.display = "block";

  menu_M.addEventListener("click", () => {
    console.log("side menu OPENED");
    menu_Tray.style.right = "0px";
  });
  menu_TrayClose.addEventListener("click", () => {
    console.log("side menu CLOSED");
    menu_Tray.style.right = "-200px";
  });
}

let currentSection = 0;
const totalSections = 9;
function nextSection() {
  // console.log("nextSection");
  currentSection++;
  // console.log(currentSection);
  header.style.top = "0px";
  footer.style.bottom = "0px";

  switch (currentSection) {
    case 1:
      intro.style.top = "0px";
      camera.position.z = 5;
      break;
    case 2:
      about.style.top = "0px";
      break;
    case 3:
      services.style.top = "0px";
      break;
    case 4:
      s1.style.display = "none";
      s2.style.display = "block";
      break;
    case 5:
      s2.style.display = "none";
      s3.style.display = "block";
      break;
    case 6:
      s3.style.display = "none";
      s4.style.display = "block";
      break;
    case 7:
      projects.style.top = "0px";
      break;
    case 8:
      collabs.style.top = "0px";
      break;
    case 9:
      contact.style.top = "0px";
      break;
  }
}
function previousSection() {
  // console.log("previousSection");
  // console.log(currentSection);

  switch (currentSection) {
    case 0:
      header.style.top = "-50px";
      footer.style.bottom = "-60px";
      camera.position.z = cameraZ;
      currentSection--;
      break;
    case 1:
      intro.style.top = "100vh";
      currentSection--;
      break;
    case 2:
      about.style.top = "100vh";
      currentSection--;
      break;
    case 3:
      services.style.top = "100vh";
      currentSection--;
      break;
    case 4:
      s1.style.display = "block";
      s2.style.display = "none";
      currentSection--;
      break;
    case 5:
      s2.style.display = "block";
      s3.style.display = "none";
      currentSection--;
      break;
    case 6:
      s3.style.display = "block";
      s4.style.display = "none";
      currentSection--;
      break;
    case 7:
      projects.style.top = "100vh";
      currentSection--;
      break;
    case 8:
      collabs.style.top = "100vh";
      currentSection--;
      break;
    case 9:
      contact.style.top = "100vh";
      currentSection--;
      break;
  }
}

// Handle mouse wheel scrolling
addEventListener(
  "wheel",
  (e) => {
    e.preventDefault();
    if (e.deltaY > 0) {
      if (currentSection < totalSections) {
        nextSection();
      }
    } else {
      if ((currentSection) => 0) {
        previousSection();
      }
    }
  },
  { passive: false }
);

// Handle touch scrolling
let touchStartY = 0;
addEventListener(
  "touchstart",
  (e) => {
    touchStartY = e.touches[0].clientY;
  },
  { passive: false }
);
addEventListener(
  "touchmove",
  (e) => {
    e.preventDefault();

    console.log(currentSection);

    const touchY = e.touches[0].clientY;
    const deltaY = touchStartY - touchY;
    const threshold = height / 10; // Minimum swipe distance to trigger section change
    // console.log(threshold);
    // console.log(Math.abs(deltaY));

    if (Math.abs(deltaY) > threshold) {
      if (deltaY > 0) {
        if (currentSection < totalSections && touchStartY > touchY) {
          nextSection();
          touchStartY = touchY; // Reset start position after section change
        }
      } else {
        if (currentSection > 0 && touchStartY < touchY) {
          previousSection();
          touchStartY = touchY; // Reset start position after section change
        }
      }
    }
  },
  { passive: false }
);

function animate() {
  requestAnimationFrame(animate);
  earthMain.rotation.y += 0.003;
  stars.tick();
  renderer.render(scene, camera);
}
animate();

addEventListener("resize", () => {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.render(scene, camera);
});
