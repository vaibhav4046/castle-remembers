import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';

// ============================================================
// The Castle That Remembers
// A full explorable wizarding castle - great hall, library,
// dormitory, kitchens, dungeons, owlery, astronomy tower,
// entrance hall, common room and courtyard. Sixteen keepsakes
// hold the memories you whisper to them, and whisper back.
// All 3D props generated with Manycore Lux3D (Aholo).
// ============================================================

const ASSET_MANIFEST = [
  // ---- Great Hall ----
  { id: 'fireplace',        h: 3.0, x: 0,    z: -6.2, rotY: 0,           room: 'hall' },
  { id: 'dining-table',     h: 1.15, x: 0,   z: -0.5, rotY: 0,           room: 'hall' },
  { id: 'chandelier',       h: 2.0, x: 0,    z: -0.5, rotY: 0, y: 3.4,   room: 'hall' },
  { id: 'throne',           h: 2.1, x: -4.5, z: -5.6, rotY: 0,           room: 'hall' },
  { id: 'wall-window',      h: 2.4, x: -8.6, z: -3.5, rotY: Math.PI/2, y: 1.6, room: 'hall' },
  { id: 'door',             h: 2.6, x: 6.5,  z: 6.8,  rotY: 0,           room: 'hall' },
  { id: 'archway',          h: 3.4, x: -8,   z: 6.6,  rotY: 0,           room: 'hall' },
  { id: 'grandfather-clock',h: 2.5, x: 7.8,  z: -6.2, rotY: 0,           room: 'hall',
    keepsake: true, label: 'the grandfather clock', reach: 3.2 },
  { id: 'stained-glass-window', h: 3.2, x: 3.5, z: -6.75, rotY: 0, y: 1.4, room: 'hall',
    keepsake: true, label: 'the stained-glass window', reach: 3.4 },
  // ---- Library ----
  { id: 'bookshelf',        h: 2.6, x: -21,  z: -3.5, rotY: Math.PI/2,   room: 'library' },
  { id: 'bookshelf#2',      src: 'bookshelf', h: 2.6, x: -21, z: 0,   rotY: Math.PI/2, room: 'library' },
  { id: 'bookshelf#3',      src: 'bookshelf', h: 2.6, x: -21, z: 3.5, rotY: Math.PI/2, room: 'library' },
  { id: 'bookshelf#4',      src: 'bookshelf', h: 2.6, x: -12, z: -5.5, rotY: 0, room: 'library' },
  { id: 'armchair',         h: 1.2, x: -13,  z: 2.5,  rotY: -Math.PI/4,  room: 'library' },
  { id: 'desk',             h: 1.1, x: -15.5, z: -2.5, rotY: Math.PI/2,  room: 'library' },
  { id: 'picture-frame',    h: 0.45, on: 'desk', dx: -0.35, dz: 0, rotY: Math.PI/2, room: 'library',
    keepsake: true, label: 'the picture frame', reach: 2.6 },
  { id: 'key',              h: 0.16, on: 'desk', dx: 0.3, dz: 0.2, rotY: 0, room: 'library',
    keepsake: true, label: 'the old iron key', reach: 2.6 },
  // ---- Dormitory (tower bedroom) ----
  { id: 'bed',              h: 1.5, x: 19,   z: -3.5, rotY: -Math.PI/2,  room: 'bedroom' },
  { id: 'bed#2',            src: 'bed', h: 1.5, x: 19, z: 2.5, rotY: -Math.PI/2, room: 'bedroom' },
  { id: 'vanity',           h: 1.6, x: 12,   z: -4.8, rotY: Math.PI/2,   room: 'bedroom' },
  { id: 'treasure-chest',   h: 0.95, x: 13,  z: 3,    rotY: Math.PI/4,   room: 'bedroom',
    keepsake: true, label: 'the treasure chest', reach: 2.8 },
  { id: 'music-box',        h: 0.3, on: 'vanity', dx: 0.25, dz: 0, rotY: 0, room: 'bedroom',
    keepsake: true, label: 'the music box', reach: 2.6 },
  { id: 'hand-mirror',      h: 0.38, on: 'vanity', dx: -0.3, dz: 0.15, rotY: Math.PI/2, room: 'bedroom',
    keepsake: true, label: 'the hand mirror', reach: 2.6 },
  // ---- Kitchens ----
  { id: 'hearth',           h: 2.4, x: -11,  z: 15.8, rotY: Math.PI,     room: 'kitchen' },
  { id: 'pantry-shelf',     h: 2.0, x: -3.2, z: 15.8, rotY: Math.PI,     room: 'kitchen' },
  { id: 'pantry-shelf#2',   src: 'pantry-shelf', h: 2.0, x: -3.2, z: 7.2, rotY: 0, room: 'kitchen' },
  // ---- Courtyard ----
  { id: 'fountain',         h: 2.8, x: 8.5,  z: 13.5, rotY: 0,           room: 'courtyard' },
  { id: 'bench',            h: 1.0, x: 4.5,  z: 17,   rotY: Math.PI,     room: 'courtyard' },
  { id: 'tower',            h: 9.0, x: 14,   z: 22.5, rotY: 0,           room: 'entrance' },
  { id: 'broomstick',       h: 1.6, x: 2.9,  z: 18.2, rotY: 0.5,         room: 'courtyard',
    keepsake: true, label: 'the weathered broomstick', reach: 2.6 },
  { id: 'gargoyle',         h: 1.4, x: 2.6,  z: 7.4,  rotY: Math.PI/4,   room: 'courtyard',
    keepsake: true, label: 'the stone gargoyle', reach: 2.6 },
  // ---- Entrance Hall ----
  { id: 'door#2',           src: 'door', h: 3.4, x: 8.5, z: 30.7, rotY: Math.PI, room: 'entrance' },
  { id: 'archway#2',        src: 'archway', h: 4.2, x: 8.5, z: 19.4, rotY: 0, room: 'entrance' },
  { id: 'suit-of-armor',    h: 2.1, x: 3.4,  z: 29.6, rotY: Math.PI,     room: 'entrance',
    keepsake: true, label: 'the suit of armor', reach: 2.8 },
  { id: 'suit-of-armor#2',  src: 'suit-of-armor', h: 2.1, x: 13.6, z: 29.6, rotY: Math.PI, room: 'entrance' },
  { id: 'candelabra',       h: 1.7, x: 3.2,  z: 20.4, rotY: 0,           room: 'entrance',
    keepsake: true, label: 'the silver candelabra', reach: 2.6 },
  { id: 'candelabra#2',     src: 'candelabra', h: 1.7, x: 13.8, z: 20.4, rotY: 0, room: 'entrance' },
  // ---- Trophy Corridor ----
  { id: 'suit-of-armor#3',  src: 'suit-of-armor', h: 2.1, x: 17, z: 9.2,  rotY: 0, room: 'corridor' },
  { id: 'suit-of-armor#4',  src: 'suit-of-armor', h: 2.1, x: 17, z: 15.8, rotY: Math.PI, room: 'corridor' },
  { id: 'picture-frame#2',  src: 'picture-frame', h: 1.4, x: 15.4, z: 11, rotY: Math.PI/2, y: 1.5, room: 'corridor' },
  { id: 'picture-frame#3',  src: 'picture-frame', h: 1.4, x: 15.4, z: 14, rotY: Math.PI/2, y: 1.5, room: 'corridor' },
  // ---- Common Room ----
  { id: 'armchair#2',       src: 'armchair', h: 1.2, x: 22,  z: 12,  rotY: Math.PI/3,  room: 'common' },
  { id: 'armchair#3',       src: 'armchair', h: 1.2, x: 22,  z: 14.5,rotY: Math.PI/2.2, room: 'common' },
  { id: 'fireplace#2',      src: 'fireplace', h: 2.4, x: 29.8, z: 12.5, rotY: -Math.PI/2, room: 'common' },
  { id: 'bookshelf#5',      src: 'bookshelf', h: 2.6, x: 25, z: 8.6, rotY: Math.PI, room: 'common' },
  { id: 'lantern#2',        src: 'lantern', h: 0.4, x: 25, z: 12.5, y: 0, rotY: 0, room: 'common' },
  // ---- Potions Dungeon ----
  { id: 'cauldron',         h: 1.3, x: -7,   z: 21,   rotY: 0,           room: 'dungeon',
    keepsake: true, label: 'the bubbling cauldron', reach: 3.0 },
  { id: 'pantry-shelf#3',   src: 'pantry-shelf', h: 2.0, x: -11.5, z: 21, rotY: Math.PI/2, room: 'dungeon' },
  { id: 'pantry-shelf#4',   src: 'pantry-shelf', h: 2.0, x: -2.5, z: 21, rotY: -Math.PI/2, room: 'dungeon' },
  // ---- Owlery ----
  { id: 'owl',              h: 0.55, x: -8,  z: -12,  rotY: 0.4, y: 1.3, room: 'owlery',
    keepsake: true, label: 'the tawny owl', reach: 2.8 },
  { id: 'owl#2',            src: 'owl', h: 0.5, x: -10.5, z: -14.5, rotY: -0.7, y: 1.6, room: 'owlery' },
  { id: 'owl#3',            src: 'owl', h: 0.45, x: -5, z: -15, rotY: 2.2, y: 1.15, room: 'owlery' },
  // ---- Astronomy Tower ----
  { id: 'globe',            h: 1.4, x: 15,   z: -11,  rotY: 0,           room: 'astronomy',
    keepsake: true, label: 'the celestial globe', reach: 3.0 },
  // ---- Tabletop keepsakes (Great Hall) ----
  { id: 'lantern',          h: 0.4, on: 'dining-table', dx: 0.9, dz: 0.3, rotY: 0, room: 'hall',
    keepsake: true, label: 'the brass lantern', reach: 2.6 },
  { id: 'teacup',           h: 0.16, on: 'dining-table', dx: -0.7, dz: -0.2, rotY: 0, room: 'hall',
    keepsake: true, label: 'the porcelain teacup', reach: 2.6 },
];

// Walkable rectangles, in room order (slight overlaps at doorways)
const ROOM_RECTS = [
  { x1: -9,   z1: -7,   x2: 9,    z2: 7 },     // 0 Great Hall
  { x1: -21.6,z1: -6,   x2: -8.6, z2: 6 },     // 1 Library
  { x1: 8.6,  z1: -6,   x2: 21.6, z2: 6 },     // 2 Dormitory
  { x1: -12,  z1: 6.6,  x2: -2,   z2: 16.6 },  // 3 Kitchens
  { x1: 2,    z1: 6.6,  x2: 15,   z2: 19 },    // 4 Courtyard
  { x1: 2,    z1: 18.6, x2: 15,   z2: 31 },    // 5 Entrance Hall
  { x1: 14.6, z1: 8,    x2: 19,   z2: 17 },    // 6 Trophy Corridor
  { x1: 18.6, z1: 8,    x2: 31,   z2: 17 },    // 7 Common Room
  { x1: -12,  z1: 16.2, x2: -2,   z2: 26 },    // 8 Potions Dungeon
  { x1: -13,  z1: -17,  x2: -3,   z2: -6.2 },  // 9 Owlery
  { x1: 10,   z1: -16,  x2: 20,   z2: -5.6 },  // 10 Astronomy Tower
];
const ROOM_META = [
  { name: 'hall',      h: 6,   ceil: true,  floor: 0x54452f },
  { name: 'library',   h: 5,   ceil: true,  floor: 0x4a3b2c },
  { name: 'bedroom',   h: 5,   ceil: true,  floor: 0x4f4040 },
  { name: 'kitchen',   h: 4.5, ceil: true,  floor: 0x504c44 },
  { name: 'courtyard', h: 1.3, ceil: false, floor: 0x3f4a3a },
  { name: 'entrance',  h: 7,   ceil: true,  floor: 0x565a5e },
  { name: 'corridor',  h: 4,   ceil: true,  floor: 0x4c4438 },
  { name: 'common',    h: 5,   ceil: true,  floor: 0x5a4030 },
  { name: 'dungeon',   h: 3.5, ceil: true,  floor: 0x3a4238 },
  { name: 'owlery',    h: 5.5, ceil: false, floor: 0x46413a },
  { name: 'astronomy', h: 1.1, ceil: false, floor: 0x3c3f4c },
];

// Wall runs [x1,z1,x2,z2,height] (visual shell; movement clamped by ROOM_RECTS)
const WALLS = [
  // Great Hall (h 6)
  [-9,-7, -8,-7, 6], [-5,-7, 9,-7, 6],                // north, gap up to owlery x -8..-5
  [-9,-7, -9,-1.5, 6], [-9,1.5, -9,7, 6],             // west, gap to library
  [9,-7, 9,-1.5, 6], [9,1.5, 9,7, 6],                 // east, gap to dormitory
  [-9,7, -7,7, 6], [-4,7, 5.3,7, 6], [7.7,7, 9,7, 6], // south, gaps to kitchens + courtyard
  // Library (h 5)
  [-21.6,-6, -12.5,-6, 5], [-9.5,-6, -8.6,-6, 5],     // north, gap up to owlery x -12.5..-9.5
  [-21.6,6, -8.6,6, 5], [-21.6,-6, -21.6,6, 5],
  // Dormitory (h 5)
  [8.6,-6, 13.2,-6, 5], [16.4,-6, 21.6,-6, 5],        // north, gap up to astronomy x 13.2..16.4
  [8.6,6, 21.6,6, 5], [21.6,-6, 21.6,6, 5],
  // Kitchens (h 4.5)
  [-12,6.6, -7,6.6, 4.5], [-4,6.6, -2,6.6, 4.5],
  [-12,16.6, -9.2,16.6, 4.5], [-6.2,16.6, -2,16.6, 4.5], // south, gap down to dungeon x -9.2..-6.2
  [-12,6.6, -12,16.6, 4.5], [-2,6.6, -2,16.6, 4.5],
  // Courtyard low walls (h 1.3)
  [2,6.6, 5.3,6.6, 1.3], [7.7,6.6, 15,6.6, 1.3],
  [2,19, 6.8,19, 1.3], [10.2,19, 15,19, 1.3],          // south, gap to entrance x 6.8..10.2
  [2,6.6, 2,19, 1.3],
  [15,6.6, 15,10.2, 1.3], [15,13.8, 15,19, 1.3],       // east, gap to corridor z 10.2..13.8
  // Entrance Hall (h 7)
  [2,31, 15,31, 7], [2,19, 2,31, 7], [15,19, 15,31, 7],
  // Trophy Corridor (h 4)
  [15,8, 19,8, 4], [15,17, 19,17, 4],
  // Common Room (h 5)
  [19,8, 31,8, 5], [19,17, 31,17, 5], [31,8, 31,17, 5],
  [19,8, 19,10.2, 5], [19,13.8, 19,17, 5],             // west, gap to corridor z 10.2..13.8
  // Potions Dungeon (h 3.5)
  [-12,26, -2,26, 3.5], [-12,16.6, -12,26, 3.5], [-2,16.6, -2,26, 3.5],
  // Owlery (open, h 2.2 parapet; south side walled by hall+library)
  [-13,-17, -3,-17, 2.2], [-13,-17, -13,-6.2, 2.2], [-3,-17, -3,-6.2, 2.2],
  // Astronomy Tower (open, h 1.1 parapet)
  [10,-16, 20,-16, 1.1], [10,-16, 10,-6, 1.1], [20,-16, 20,-6, 1.1],
  [10,-6, 13.2,-6, 1.1], [16.4,-6, 20,-6, 1.1],
];

// Warm light sources [x,y,z,intensity,distance]
const LIGHTS = [
  [0, 2.2, -5.6, 2.2, 10],     // fireplace
  [0, 3.6, -0.5, 1.6, 9],      // chandelier
  [-8, 2.5, 6.0, 1.0, 7],      // hall south torch
  [3.5, 2.6, -6.2, 0.9, 6],    // stained glass glow
  [-15.5, 2.2, -2.5, 1.3, 8],  // library desk candle
  [-21, 2.6, 0, 0.9, 7],       // library shelf candle
  [12, 1.8, -4.8, 1.2, 7],     // vanity candles
  [19, 1.6, -3.5, 0.8, 6],     // bedside
  [-11, 2.0, 15.2, 2.0, 9],    // kitchen hearth
  [-8, 2.8, -11.6, 1.1, 9],    // owlery lantern
  [15, 2.8, -10.8, 1.1, 9],    // astronomy lantern
  [-3.2, 2.2, 15.4, 0.8, 6],   // pantry candle
  [8.5, 2.6, 13.5, 1.1, 10],   // courtyard brazier
  [7.8, 2.2, -5.8, 0.7, 5],    // clock corner
  [8.5, 3.2, 25, 1.8, 12],     // entrance hall candles
  [17, 2.4, 12.5, 0.9, 7],     // corridor sconce
  [29, 2.0, 12.5, 2.0, 9],     // common room fireplace
  [22, 2.2, 13, 0.8, 6],       // common room lamp
  [-7, 1.6, 21, 1.4, 8],       // dungeon cauldron glow
  [-8, 3.0, -12, 0.7, 8],      // owlery moon shaft
  [15, 2.2, -11, 0.9, 9],      // astronomy tower starlight
];

// ------------------------------------------------------------

const app = document.getElementById('app');
const loaderEl = document.getElementById('loader');
const barEl = document.getElementById('bar');
const statusEl = document.getElementById('load-status');
const hud = document.getElementById('hud');
const promptEl = document.getElementById('prompt');
const toastEl = document.getElementById('toast');
const titleCard = document.getElementById('title-card');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalStatus = document.getElementById('modal-status');
const modalText = document.getElementById('modal-text');
const btnRecord = document.getElementById('btn-record');
const btnStop = document.getElementById('btn-stop');
const btnClose = document.getElementById('btn-close');

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0b0a16);
scene.fog = new THREE.FogExp2(0x0b0a16, 0.02);

const camera = new THREE.PerspectiveCamera(70, innerWidth / innerHeight, 0.1, 160);
camera.position.set(8.5, 1.7, 28);   // spawn in the Entrance Hall

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.5;
app.appendChild(renderer.domElement);

addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

// --- Atmosphere lights (day-night cycle driven) ---
const hemi = new THREE.HemisphereLight(0x41527a, 0x2b2016, 0.95);
scene.add(hemi);
scene.add(new THREE.AmbientLight(0x3d4a66, 0.4));
const moon = new THREE.DirectionalLight(0x8fa3cc, 0.6);
moon.position.set(20, 30, 25);
scene.add(moon);
const sun = new THREE.DirectionalLight(0xffe3b3, 0.0);
sun.position.set(-25, 35, -10);
scene.add(sun);
for (const [x, y, z, i, d] of LIGHTS) {
  const pl = new THREE.PointLight(0xffb066, i * 1.8, d * 1.4, 1.8);
  pl.position.set(x, y, z);
  scene.add(pl);
}
const fireLights = scene.children.filter(o => o.isPointLight);

// --- Sky: stars + moon disc (visible in open rooms) ---
{
  const starGeo = new THREE.BufferGeometry();
  const N = 900, pos = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    const th = Math.random() * Math.PI * 2, ph = Math.acos(Math.random() * 0.85);
    const r = 90;
    pos[i*3] = r * Math.sin(ph) * Math.cos(th);
    pos[i*3+1] = r * Math.cos(ph) + 4;
    pos[i*3+2] = r * Math.sin(ph) * Math.sin(th);
  }
  starGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xcfd8ff, size: 0.35, sizeAttenuation: true, transparent: true, opacity: 0.9 }));
  stars.name = 'stars';
  scene.add(stars);
  const moonDisc = new THREE.Mesh(new THREE.CircleGeometry(3.2, 32),
    new THREE.MeshBasicMaterial({ color: 0xe8ecf4, fog: false }));
  moonDisc.position.set(46, 52, 60);
  moonDisc.lookAt(8, 0, 12);
  scene.add(moonDisc);
}

// --- Castle shell ---
const stoneMat = new THREE.MeshStandardMaterial({ color: 0x5f5952, roughness: 0.95 });
const ceilMat = new THREE.MeshStandardMaterial({ color: 0x39332c, roughness: 1 });
ROOM_RECTS.forEach((r, i) => {
  const meta = ROOM_META[i];
  const w = r.x2 - r.x1, d = r.z2 - r.z1;
  const floor = new THREE.Mesh(new THREE.BoxGeometry(w + 0.4, 0.2, d + 0.4),
    new THREE.MeshStandardMaterial({ color: meta.floor, roughness: 0.9 }));
  floor.position.set((r.x1 + r.x2) / 2, -0.1, (r.z1 + r.z2) / 2);
  scene.add(floor);
  if (meta.ceil) {
    const c = new THREE.Mesh(new THREE.BoxGeometry(w + 0.4, 0.2, d + 0.4), ceilMat);
    c.position.set((r.x1 + r.x2) / 2, meta.h, (r.z1 + r.z2) / 2);
    scene.add(c);
  }
});
const ground = new THREE.Mesh(new THREE.PlaneGeometry(260, 260),
  new THREE.MeshStandardMaterial({ color: 0x1c221c, roughness: 1 }));
ground.rotation.x = -Math.PI / 2;
ground.position.y = -0.22;
scene.add(ground);

for (const [x1, z1, x2, z2, h] of WALLS) {
  const len = Math.hypot(x2 - x1, z2 - z1);
  const wall = new THREE.Mesh(new THREE.BoxGeometry(len, h, 0.4), stoneMat);
  wall.position.set((x1 + x2) / 2, h / 2, (z1 + z2) / 2);
  wall.rotation.y = -Math.atan2(z2 - z1, x2 - x1);
  scene.add(wall);
}

// --- Procedural set dressing ---
// Owl perches (wooden posts under each placed owl)
const woodMat = new THREE.MeshStandardMaterial({ color: 0x4d3a26, roughness: 0.9 });
for (const def of ASSET_MANIFEST.filter(d => (d.src || d.id) === 'owl')) {
  const post = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.12, def.y || 1.2, 8), woodMat);
  post.position.set(def.x, (def.y || 1.2) / 2, def.z);
  scene.add(post);
}
// Floating candles: Great Hall + Entrance Hall
const candleGroup = new THREE.Group();
const candleData = [];
{
  const waxMat = new THREE.MeshStandardMaterial({ color: 0xe6d9b8, roughness: 0.6 });
  const flameMat = new THREE.MeshBasicMaterial({ color: 0xffc266 });
  const spots = [];
  for (let i = 0; i < 26; i++) spots.push({ x: -7.5 + Math.random() * 15, z: -6 + Math.random() * 12, y: 3.1 + Math.random() * 1.6, s: 0.8 + Math.random() * 0.5 });
  for (let i = 0; i < 16; i++) spots.push({ x: 3 + Math.random() * 11, z: 20 + Math.random() * 10, y: 3.6 + Math.random() * 2.2, s: 0.9 + Math.random() * 0.6 });
  for (const sp of spots) {
    const candle = new THREE.Group();
    const wax = new THREE.Mesh(new THREE.CylinderGeometry(0.035 * sp.s, 0.045 * sp.s, 0.42 * sp.s, 8), waxMat);
    const flame = new THREE.Mesh(new THREE.ConeGeometry(0.03 * sp.s, 0.12 * sp.s, 8), flameMat);
    flame.position.y = 0.27 * sp.s;
    candle.add(wax, flame);
    candle.position.set(sp.x, sp.y, sp.z);
    candleGroup.add(candle);
    candleData.push({ obj: candle, flame, baseY: sp.y, ph: Math.random() * Math.PI * 2, amp: 0.08 + Math.random() * 0.1 });
  }
  scene.add(candleGroup);
}
// Dust motes drifting through the castle
let dustGeo, dustPts;
{
  dustGeo = new THREE.BufferGeometry();
  const N = 500, pos = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    pos[i*3] = -24 + Math.random() * 58;
    pos[i*3+1] = 0.3 + Math.random() * 5.5;
    pos[i*3+2] = -18 + Math.random() * 50;
  }
  dustGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  dustPts = new THREE.Points(dustGeo, new THREE.PointsMaterial({ color: 0xd8c9a3, size: 0.03, transparent: true, opacity: 0.5 }));
  scene.add(dustPts);
}
// Fountain water spray
let sprayGeo, sprayPts, sprayVel;
{
  const N = 160;
  sprayGeo = new THREE.BufferGeometry();
  const pos = new Float32Array(N * 3);
  sprayVel = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    pos[i*3] = 8.5; pos[i*3+1] = 2.4; pos[i*3+2] = 13.5;
    const a = Math.random() * Math.PI * 2, v = 0.6 + Math.random() * 0.9;
    sprayVel[i*3] = Math.cos(a) * v * 0.55;
    sprayVel[i*3+1] = 1.6 + Math.random() * 1.2;
    sprayVel[i*3+2] = Math.sin(a) * v * 0.55;
  }
  sprayGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  sprayPts = new THREE.Points(sprayGeo, new THREE.PointsMaterial({ color: 0x9fc4d8, size: 0.05, transparent: true, opacity: 0.75 }));
  scene.add(sprayPts);
}
// Cauldron bubbles (green, rise from the cauldron spot)
let bubbleGeo, bubblePts, bubbleVel;
{
  const N = 60;
  bubbleGeo = new THREE.BufferGeometry();
  const pos = new Float32Array(N * 3);
  bubbleVel = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    pos[i*3] = -7 + (Math.random() - 0.5) * 0.8;
    pos[i*3+1] = 0.9 + Math.random() * 0.4;
    pos[i*3+2] = 21 + (Math.random() - 0.5) * 0.8;
    bubbleVel[i] = 0.25 + Math.random() * 0.5;
  }
  bubbleGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  bubblePts = new THREE.Points(bubbleGeo, new THREE.PointsMaterial({ color: 0x7de88a, size: 0.06, transparent: true, opacity: 0.8 }));
  scene.add(bubblePts);
  const potionGlow = new THREE.PointLight(0x66dd77, 1.2, 6, 1.8);
  potionGlow.position.set(-7, 1.4, 21);
  potionGlow.name = 'potionGlow';
  scene.add(potionGlow);
}

// --- Loading the props ---
const loader = new GLTFLoader();
loader.setMeshoptDecoder(MeshoptDecoder);
const placed = {};
const interactables = [];
const keepsakes = {};

const uniqueSrcs = [...new Set(ASSET_MANIFEST.map(a => a.src || a.id))];
let loadedCount = 0;

function loadOne(src) {
  return new Promise((resolve) => {
    loader.load(`./assets2/${src}.glb`,
      g => { loadedCount++; barEl.style.width = `${(loadedCount / uniqueSrcs.length) * 100}%`;
             statusEl.textContent = `${loadedCount} of ${uniqueSrcs.length} props remembered...`;
             resolve(g); },
      undefined,
      e => { console.warn('load failed', src); loadedCount++; resolve(null); });
  });
}

function normalizeAndPlace(obj, def) {
  const box = new THREE.Box3().setFromObject(obj);
  const size = box.getSize(new THREE.Vector3());
  const s = def.h / (size.y || 1);
  obj.scale.setScalar(s);
  obj.updateMatrixWorld(true);
  const box2 = new THREE.Box3().setFromObject(obj);
  const c = box2.getCenter(new THREE.Vector3());

  let px = def.x, pz = def.z, py = def.y || 0;
  if (def.on) {
    const parent = placed[def.on];
    const pbox = new THREE.Box3().setFromObject(parent.object);
    const pc = pbox.getCenter(new THREE.Vector3());
    px = pc.x + (def.dx || 0);
    pz = pc.z + (def.dz || 0);
    py = pbox.max.y;
  }
  obj.position.x += px - c.x;
  obj.position.z += pz - c.z;
  obj.position.y += py - box2.min.y;
  obj.rotation.y = def.rotY || 0;
  scene.add(obj);
  obj.updateMatrixWorld(true);
  placed[def.id] = { object: obj, box: new THREE.Box3().setFromObject(obj) };

  if (def.keepsake) {
    keepsakes[def.id] = { root: obj, label: def.label, reach: def.reach || 2.8, def };
    obj.traverse(m => {
      if (m.isMesh) {
        m.material = m.material.clone();
        m.userData.keepsakeId = def.id;
        interactables.push(m);
      }
    });
  }
}

async function buildCastle() {
  const gltfMap = {};
  for (const src of uniqueSrcs) gltfMap[src] = await loadOne(src);
  for (const def of ASSET_MANIFEST) {
    const g = gltfMap[def.src || def.id];
    if (!g) continue;
    const inst = (def.src ? g.scene.clone(true) : g.scene);
    normalizeAndPlace(inst, def);
  }
  statusEl.textContent = 'The castle is awake.';
  setTimeout(() => {
    loaderEl.style.opacity = '0';
    setTimeout(() => loaderEl.remove(), 1100);
    hud.style.display = 'block';
    setTimeout(() => { titleCard.style.opacity = '0'; }, 7000);
  }, 400);
}

// --- Procedural audio: the castle's voice ---
let AC = null, windGain = null;
function audio() {
  if (!AC) {
    AC = new (window.AudioContext || window.webkitAudioContext)();
    // continuous wind bed
    const len = AC.sampleRate * 2, buf = AC.createBuffer(1, len, AC.sampleRate);
    const d = buf.getChannelData(0);
    let last = 0;
    for (let i = 0; i < len; i++) { last = last * 0.98 + (Math.random() * 2 - 1) * 0.02; d[i] = last * 6; }
    const src = AC.createBufferSource(); src.buffer = buf; src.loop = true;
    const f = AC.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 320;
    windGain = AC.createGain(); windGain.gain.value = 0.05;
    src.connect(f).connect(windGain).connect(AC.destination);
    src.start();
  }
  if (AC.state === 'suspended') AC.resume();
  return AC;
}
function crackle() {   // fireplace pop
  const ac = audio();
  const t0 = ac.currentTime;
  const len = ac.sampleRate * 0.08, buf = ac.createBuffer(1, len, ac.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3);
  const src = ac.createBufferSource(); src.buffer = buf;
  const g = ac.createGain(); g.gain.value = 0.12 + Math.random() * 0.12;
  const f = ac.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 900 + Math.random() * 1800;
  src.connect(f).connect(g).connect(ac.destination);
  src.start(t0);
}
function chime(hour) {   // grandfather clock
  const ac = audio();
  for (let n = 0; n < hour; n++) {
    const t0 = ac.currentTime + n * 1.1;
    const o = ac.createOscillator(), g = ac.createGain();
    o.type = 'sine'; o.frequency.value = 392;
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(0.22, t0 + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + 1.0);
    o.connect(g).connect(ac.destination);
    o.start(t0); o.stop(t0 + 1.05);
  }
}
function hoot() {        // owl
  const ac = audio();
  const t0 = ac.currentTime;
  [[0, 0.16], [0.28, 0.3]].forEach(([off, dur]) => {
    const o = ac.createOscillator(), g = ac.createGain();
    o.type = 'sine'; o.frequency.setValueAtTime(340, t0 + off);
    o.frequency.linearRampToValueAtTime(300, t0 + off + dur);
    g.gain.setValueAtTime(0.0001, t0 + off);
    g.gain.exponentialRampToValueAtTime(0.08, t0 + off + 0.03);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + off + dur);
    o.connect(g).connect(ac.destination);
    o.start(t0 + off); o.stop(t0 + off + dur + 0.05);
  });
}
function pluck(freq, t0, vol = 0.12) {  // music-box note
  const ac = audio();
  const o = ac.createOscillator(), g = ac.createGain();
  o.type = 'triangle'; o.frequency.value = freq;
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(vol, t0 + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.9);
  o.connect(g).connect(ac.destination);
  o.start(t0); o.stop(t0 + 0.95);
}
function musicBoxTune() {
  const ac = audio();
  const notes = [523.25, 659.25, 783.99, 1046.5, 783.99, 659.25, 880, 783.99, 659.25, 523.25];
  notes.forEach((f, i) => pluck(f, ac.currentTime + i * 0.34));
}
function footstep() {
  const ac = audio();
  const t0 = ac.currentTime;
  const len = ac.sampleRate * 0.05, buf = ac.createBuffer(1, len, ac.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 4);
  const src = ac.createBufferSource(); src.buffer = buf;
  const g = ac.createGain(); g.gain.value = 0.045;
  const f = ac.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 480;
  src.connect(f).connect(g).connect(ac.destination);
  src.start(t0);
}

// --- Movement + look ---
const keys = {};
let yaw = 0, pitch = 0;   // spawn facing into the castle (-z)
let stepDist = 0;
addEventListener('keydown', e => { keys[e.code] = true; });
addEventListener('keyup', e => { keys[e.code] = false; });
renderer.domElement.addEventListener('click', () => {
  audio();
  if (modal.style.display !== 'flex') renderer.domElement.requestPointerLock();
});
addEventListener('mousemove', e => {
  if (document.pointerLockElement !== renderer.domElement) return;
  yaw -= e.movementX * 0.0022;
  pitch = Math.max(-1.4, Math.min(1.4, pitch - e.movementY * 0.0022));
});

function clampToRooms(nx, nz, px, pz) {
  const m = 0.35;
  for (const r of ROOM_RECTS) {
    if (nx > r.x1 + m && nx < r.x2 - m && nz > r.z1 + m && nz < r.z2 - m) return [nx, nz];
  }
  for (const r of ROOM_RECTS) {
    if (nx > r.x1 + m && nx < r.x2 - m && pz > r.z1 + m && pz < r.z2 - m) return [nx, pz];
    if (px > r.x1 + m && px < r.x2 - m && nz > r.z1 + m && nz < r.z2 - m) return [px, nz];
  }
  return [px, pz];
}

// --- Keepsake interaction + memories ---
const raycaster = new THREE.Raycaster();
const centerVec = new THREE.Vector2(0, 0);
let hoveredKeepsake = null;
let modalKeepsake = null;
let recorder = null, recChunks = [];
let audioEl = null;

const memKey = id => `castle-memory-${id}`;
const hasMemory = id => !!localStorage.getItem(memKey(id));

function setGlow(id, on) {
  const k = keepsakes[id];
  if (!k) return;
  k.root.traverse(m => {
    if (m.isMesh && m.material.emissive) {
      m.material.emissive.setHex(on ? 0x513d16 : (hasMemory(id) ? 0x1c1508 : 0x000000));
    }
  });
}

function toast(msg, ms = 2600) {
  toastEl.textContent = msg;
  toastEl.style.display = 'block';
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toastEl.style.display = 'none', ms);
}

function playMemory(id) {
  const raw = localStorage.getItem(memKey(id));
  if (!raw) return false;
  try {
    const mem = JSON.parse(raw);
    const k = keepsakes[id];
    if (mem.type === 'audio') {
      if (audioEl) { audioEl.pause(); audioEl = null; }
      audioEl = new Audio(mem.data);
      audioEl.play().catch(() => {});
      toast(`${k ? k.label : 'The keepsake'} whispers your memory back to you...`);
    } else {
      const u = new SpeechSynthesisUtterance(mem.text);
      u.rate = 0.85; u.pitch = 0.7; u.volume = 0.9;
      speechSynthesis.cancel();
      speechSynthesis.speak(u);
      toast(`${k ? k.label : 'The keepsake'} whispers your memory back to you...`);
    }
    return true;
  } catch { return false; }
}

function openModal(id) {
  modalKeepsake = id;
  const k = keepsakes[id];
  modalTitle.textContent = k.label.replace(/^the /, '').replace(/\b\w/g, ch => ch.toUpperCase());
  modalDesc.textContent = hasMemory(id)
    ? 'It already holds a whisper. Listen, or leave a new one.'
    : 'It is waiting. Whisper a memory and it will keep it safe.';
  modalStatus.textContent = '';
  modalStatus.className = '';
  modalText.style.display = 'none';
  modalText.value = '';
  btnRecord.disabled = false;
  btnStop.disabled = true;
  modal.style.display = 'flex';
  document.exitPointerLock?.();
  if (hasMemory(id)) playMemory(id);
}

function closeModal() {
  stopRecording(false);
  modal.style.display = 'none';
  modalKeepsake = null;
}

async function startRecording() {
  const id = modalKeepsake;
  if (!id) return;
  modalText.style.display = 'none';
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    recChunks = [];
    recorder = new MediaRecorder(stream);
    recorder.ondataavailable = e => { if (e.data.size) recChunks.push(e.data); };
    recorder.onstop = async () => {
      stream.getTracks().forEach(t => t.stop());
      const blob = new Blob(recChunks, { type: recorder.mimeType || 'audio/webm' });
      if (blob.size < 100) { modalStatus.textContent = 'Nothing was heard. Try again.'; return; }
      const fr = new FileReader();
      fr.onload = () => {
        localStorage.setItem(memKey(id), JSON.stringify({ type: 'audio', data: fr.result, at: Date.now() }));
        setGlow(id, false);
        modalStatus.textContent = 'Sealed. The castle will remember.';
        toast('The keepsake now holds your whisper.');
      };
      fr.readAsDataURL(blob);
    };
    recorder.start();
    btnRecord.disabled = true;
    btnStop.disabled = false;
    modalStatus.textContent = 'Listening... whisper now.';
    modalStatus.className = 'recording';
  } catch {
    modalText.style.display = 'block';
    modalText.focus();
    btnRecord.disabled = true;
    btnStop.disabled = false;
    modalStatus.textContent = 'No ear to hear you here - write your memory, then Seal it.';
  }
}

function stopRecording(save) {
  if (recorder && recorder.state === 'recording') {
    if (!save) { recorder.onstop = null; }
    recorder.stop();
    recorder = null;
  } else if (modalText.style.display === 'block' && save) {
    const text = modalText.value.trim();
    if (text && modalKeepsake) {
      localStorage.setItem(memKey(modalKeepsake), JSON.stringify({ type: 'text', text, at: Date.now() }));
      setGlow(modalKeepsake, false);
      modalStatus.textContent = 'Sealed. The castle will remember.';
      toast('The keepsake now holds your whisper.');
    }
  }
  btnRecord.disabled = false;
  btnStop.disabled = true;
  if (modalStatus.className === 'recording') modalStatus.className = '';
}

btnRecord.addEventListener('click', startRecording);
btnStop.addEventListener('click', () => stopRecording(true));
btnClose.addEventListener('click', closeModal);

addEventListener('keydown', e => {
  if (e.code === 'KeyE' && modal.style.display !== 'flex' && hoveredKeepsake) {
    openModal(hoveredKeepsake);
  } else if (e.code === 'Escape' && modal.style.display === 'flex') {
    closeModal();
  }
});

// --- Main loop ---
const clock = new THREE.Clock();
let nextCrackle = 2, nextHoot = 14, lastChimeHour = -1;
function animate() {
  requestAnimationFrame(animate);
  const dt = Math.min(clock.getDelta(), 0.05);
  const t = clock.elapsedTime;

  // look
  camera.rotation.set(0, 0, 0);
  camera.rotateY(yaw);
  camera.rotateX(pitch);

  // move (+ footsteps)
  if (document.pointerLockElement === renderer.domElement) {
    const speed = keys.ShiftLeft ? 5.2 : 3.0;
    const f = new THREE.Vector3(-Math.sin(yaw), 0, -Math.cos(yaw));
    const r = new THREE.Vector3(-f.z, 0, f.x);
    const mv = new THREE.Vector3();
    if (keys.KeyW) mv.add(f);
    if (keys.KeyS) mv.sub(f);
    if (keys.KeyD) mv.add(r);
    if (keys.KeyA) mv.sub(r);
    if (mv.lengthSq() > 0) {
      mv.normalize().multiplyScalar(speed * dt);
      const [nx, nz] = clampToRooms(camera.position.x + mv.x, camera.position.z + mv.z, camera.position.x, camera.position.z);
      stepDist += Math.hypot(nx - camera.position.x, nz - camera.position.z);
      camera.position.x = nx;
      camera.position.z = nz;
      if (stepDist > 1.6) { stepDist = 0; if (AC) footstep(); }
    }
  }

  // firelight flicker
  for (let i = 0; i < fireLights.length; i++) {
    const L = fireLights[i];
    L.intensity = L.userData.base ??= L.intensity;
    L.intensity = L.userData.base * (0.9 + 0.18 * Math.sin(t * 9 + i * 1.7) * Math.sin(t * 5.3 + i));
  }

  // floating candles bob + flames shiver
  for (const c of candleData) {
    c.obj.position.y = c.baseY + Math.sin(t * 0.7 + c.ph) * c.amp;
    c.flame.scale.setScalar(1 + 0.25 * Math.sin(t * 11 + c.ph * 3));
  }

  // dust drifts
  {
    const p = dustGeo.attributes.position.array;
    for (let i = 0; i < p.length; i += 3) {
      p[i] += Math.sin(t * 0.2 + i) * 0.0006;
      p[i+1] -= 0.0012;
      if (p[i+1] < 0.2) p[i+1] = 5.8;
    }
    dustGeo.attributes.position.needsUpdate = true;
  }

  // fountain spray
  {
    const p = sprayGeo.attributes.position.array;
    for (let i = 0; i < p.length; i += 3) {
      p[i] += sprayVel[i] * dt;
      p[i+1] += sprayVel[i+1] * dt;
      p[i+2] += sprayVel[i+2] * dt;
      sprayVel[i+1] -= 4.6 * dt;
      if (p[i+1] < 0.35) {
        p[i] = 8.5; p[i+1] = 2.4; p[i+2] = 13.5;
        const a = Math.random() * Math.PI * 2, v = 0.6 + Math.random() * 0.9;
        sprayVel[i] = Math.cos(a) * v * 0.55;
        sprayVel[i+1] = 1.6 + Math.random() * 1.2;
        sprayVel[i+2] = Math.sin(a) * v * 0.55;
      }
    }
    sprayGeo.attributes.position.needsUpdate = true;
  }

  // cauldron bubbles
  {
    const p = bubbleGeo.attributes.position.array;
    for (let i = 0; i < p.length; i += 3) {
      p[i+1] += bubbleVel[i / 3] * dt;
      p[i] += Math.sin(t * 3 + i) * 0.001;
      if (p[i+1] > 2.1) {
        p[i] = -7 + (Math.random() - 0.5) * 0.8;
        p[i+1] = 0.9;
        p[i+2] = 21 + (Math.random() - 0.5) * 0.8;
      }
    }
    bubbleGeo.attributes.position.needsUpdate = true;
  }
  const pg = scene.getObjectByName('potionGlow');
  if (pg) pg.intensity = 1.1 + 0.5 * Math.sin(t * 2.4);

  // celestial globe spins slowly
  if (placed['globe']) placed['globe'].object.rotation.y += dt * 0.12;
  // owls ruffle now and then
  for (const id of ['owl', 'owl#2', 'owl#3']) {
    if (placed[id]) placed[id].object.rotation.z = Math.sin(t * 1.3 + id.length) * 0.04;
  }

  // day-night: 6-minute cycle, night-favoured
  {
    const cyc = (Math.sin(t * (Math.PI * 2 / 360) - 1.2) + 1) / 2;   // 0..1 daylight amount
    const day = Math.max(0, cyc - 0.25) / 0.75;                       // bias toward night
    sun.intensity = day * 1.3;
    moon.intensity = 0.6 - day * 0.25;
    hemi.intensity = 0.95 + day * 0.45;
    const sky = new THREE.Color().lerpColors(new THREE.Color(0x0b0a16), new THREE.Color(0x87a5c9), day * 0.9);
    scene.background = sky;
    scene.fog.color = sky;
    const stars = scene.getObjectByName('stars');
    if (stars) stars.material.opacity = 0.9 * (1 - day);
  }

  // ambient events
  if (AC && t > nextCrackle) { nextCrackle = t + 0.7 + Math.random() * 3.4; crackle(); }
  if (AC && t > nextHoot) { nextHoot = t + 18 + Math.random() * 30; hoot(); }
  if (AC) {
    const hr = new Date().getHours() % 12 || 12;
    const nowMin = new Date().getMinutes();
    if (nowMin === 0 && lastChimeHour !== hr) { lastChimeHour = hr; chime(hr); }
  }

  // music box plays while its keepsake glows with a memory and you stand near
  if (AC && placed['music-box'] && hasMemory('music-box')) {
    const d2 = camera.position.distanceTo(placed['music-box'].object.position);
    if (d2 < 4 && (!animate._mbNext || t > animate._mbNext)) { animate._mbNext = t + 12; musicBoxTune(); }
  }

  // keepsake hover
  raycaster.setFromCamera(centerVec, camera);
  const hits = raycaster.intersectObjects(interactables, false);
  let newHover = null;
  if (hits.length) {
    const id = hits[0].object.userData.keepsakeId;
    const k = keepsakes[id];
    if (k && hits[0].distance <= k.reach) newHover = id;
  }
  if (newHover !== hoveredKeepsake) {
    if (hoveredKeepsake) setGlow(hoveredKeepsake, false);
    hoveredKeepsake = newHover;
    if (hoveredKeepsake) {
      setGlow(hoveredKeepsake, true);
      const k = keepsakes[hoveredKeepsake];
      promptEl.textContent = hasMemory(hoveredKeepsake)
        ? `E - touch ${k.label} (it holds a whisper)`
        : `E - whisper to ${k.label}`;
      promptEl.style.display = 'block';
    } else {
      promptEl.style.display = 'none';
    }
  }

  renderer.render(scene, camera);
}

buildCastle();
animate();

// Demo/QA tour hook (invisible to players): lets a scripted reviewer reposition
// the camera and dismiss overlays so every room can be captured for the video.
window.__castle = {
  roomCenters: ROOM_RECTS.map(r => [(r.x1 + r.x2) / 2, (r.z1 + r.z2) / 2]),
  setView(x, y, z, yw, pt) { camera.position.set(x, y, z); yaw = yw; pitch = pt; },
  keepsakeInfo() {
    const v = new THREE.Vector3();
    return Object.entries(keepsakes).map(([id, k]) => {
      k.root.getWorldPosition(v);
      return { id, label: k.label, reach: k.reach, x: +v.x.toFixed(2), y: +v.y.toFixed(2), z: +v.z.toFixed(2) };
    });
  },
  hideOverlays() {
    for (const id of ['title-card', 'loader', 'modal', 'help']) {
      const el = document.getElementById(id);
      if (el) el.style.display = 'none';
    }
  },
};
