import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {
  Globe,
  Compass,
  MapPin,
  Sparkles,
  Navigation,
  Play,
  Pause,
  RotateCcw,
  Sun,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Radio
} from 'lucide-react';
import { latLonToVector3, getSubSolarPointFromIso, formatCoords, LatLon } from '../utils/geo';

export interface HeritageHub {
  id: string;
  name: string;
  country: string;
  lat: number;
  lng: number;
  era: string;
  decade: '1910s' | '1920s' | '1950s' | '1960s' | '1970s' | '1980s' | '1990s';
  yearMin: number;
  yearMax: number;
  photoCount: number;
  heirlooms: string[];
  description: string;
  verifiedDates: string;
  keyPhoto: string;
  inodeStatus: string;
}

export const HERITAGE_HUBS: HeritageHub[] = [
  {
    id: 'santo-domingo',
    name: 'Santo Domingo',
    country: 'Dominican Republic',
    lat: 18.4861,
    lng: -69.9312,
    era: '1912 – 1955',
    decade: '1910s',
    yearMin: 1912,
    yearMax: 1955,
    photoCount: 342,
    heirlooms: ['Earliest 1912 Tintype Portrait', 'Embossed Studio Cardboard Mounts', '1938 Deckled Edge Silver Gelatin Prints'],
    description: 'Ancestral roots and family seat. Earliest cataloged photographs in the library, featuring studio portraits with die-cut scalloped borders.',
    verifiedDates: 'Jan 1912 – Aug 1955',
    keyPhoto: '/volume1/photos/archive_roots/roots_tintype_1912.tif',
    inodeStatus: 'ug-filesystem chtimes: 1912-01-14 verified'
  },
  {
    id: 'barcelona',
    name: 'Barcelona / Madrid',
    country: 'Spain',
    lat: 41.3879,
    lng: 2.1699,
    era: '1920 – 1935',
    decade: '1920s',
    yearMin: 1920,
    yearMax: 1935,
    photoCount: 185,
    heirlooms: ['European Emigration Passports', 'Sepia Postcard Margin Stamps', 'Formal Wedding Regalia'],
    description: 'Transatlantic ancestral lineage documentation and correspondence archives preceding relocation to the Caribbean.',
    verifiedDates: 'Jul 1920 – May 1935',
    keyPhoto: '/volume1/photos/spain_heritage/passport_record_1922.tif',
    inodeStatus: 'ug-filesystem chtimes: 1920-07-22 verified'
  },
  {
    id: 'new-york',
    name: 'New York City',
    country: 'United States',
    lat: 40.7128,
    lng: -74.0060,
    era: '1956 – 1968',
    decade: '1950s',
    yearMin: 1956,
    yearMax: 1968,
    photoCount: 628,
    heirlooms: ["Grandfather's 1958 Omega Watch (Tmin ≥ 1958)", 'Kodak Brownie Camera Negatives', '1957 Chevrolet Bel Air Tailfins'],
    description: "Primary heirloom calibration hub. Location where Grandfather acquired the 1958 Omega Seamaster, establishing the baseline Tmin anchor.",
    verifiedDates: 'Oct 1956 – Sep 1968',
    keyPhoto: '/volume1/photos/grandparents_archive_box1/heirloom_scan_014.tif',
    inodeStatus: 'ug-filesystem chtimes: 1958-06-18 verified'
  },
  {
    id: 'chicago',
    name: 'Chicago',
    country: 'United States',
    lat: 41.8781,
    lng: -87.6298,
    era: '1962 – 1975',
    decade: '1960s',
    yearMin: 1962,
    yearMax: 1975,
    photoCount: 415,
    heirlooms: ['Great Lakes Naval Enlistment Uniform', '1964 Ford Falcon Silhouette', 'Rotary Wall Phone (Western Electric 500)'],
    description: 'Military service and mid-century family home. Corroborated by automotive chrome trim and mid-century modern furniture indices.',
    verifiedDates: 'Mar 1962 – Nov 1975',
    keyPhoto: '/volume1/photos/chicago_service/navy_station_088.tif',
    inodeStatus: 'ug-filesystem chtimes: 1962-03-10 verified'
  },
  {
    id: 'miami',
    name: 'Miami',
    country: 'United States',
    lat: 25.7617,
    lng: -80.1918,
    era: '1978 – 1998',
    decade: '1970s',
    yearMin: 1978,
    yearMax: 1998,
    photoCount: 890,
    heirlooms: ['Polaroid SX-70 Instant Chemistry Pods', 'Orange 35mm Date Backs (91 12 25)', 'Mitten the Cat (First Appearance Dec 1991)'],
    description: 'Multi-generational winter reunions. The richest cluster of quartz date-back prints and consumer color film chemistry in the archive.',
    verifiedDates: 'Dec 1978 – Jan 1998',
    keyPhoto: '/volume1/photos/miami_holidays/christmas_cat_1991.jpg',
    inodeStatus: 'ug-filesystem chtimes: 1991-12-25 verified'
  },
  {
    id: 'los-angeles',
    name: 'Los Angeles',
    country: 'United States',
    lat: 34.0522,
    lng: -118.2437,
    era: '1984 – 2004',
    decade: '1980s',
    yearMin: 1984,
    yearMax: 2004,
    photoCount: 524,
    heirlooms: ["Sam's Red Schwinn Bicycle (June 1984)", "Pat's First Bike (Dec 1987)", 'Sony Handycam Video8 Cassettes'],
    description: 'Childhood milestones and bicycle dispute resolution evidence. Directly answers natural-language queries in the Family Heritage Oracle.',
    verifiedDates: 'Jun 1984 – Aug 2004',
    keyPhoto: '/volume1/photos/california_kids/sam_schwinn_1984.jpg',
    inodeStatus: 'ug-filesystem chtimes: 1984-06-12 verified'
  }
];

export interface HeritageArc {
  fromId: string;
  toId: string;
  label: string;
  era: string;
  color: number;
}

export const HERITAGE_ARCS: HeritageArc[] = [
  { fromId: 'barcelona', toId: 'santo-domingo', label: 'Transatlantic Emigration Voyage', era: '1920–1935', color: 0x38BDF8 },
  { fromId: 'santo-domingo', toId: 'new-york', label: 'Grandfather Relocation & Omega Anchor', era: '1956–1958', color: 0x10B981 },
  { fromId: 'new-york', toId: 'chicago', label: 'Great Lakes Naval Service Transit', era: '1962–1968', color: 0xF59E0B },
  { fromId: 'chicago', toId: 'miami', label: 'Southern Winter Migration', era: '1978–1985', color: 0xEC4899 },
  { fromId: 'new-york', toId: 'los-angeles', label: 'Pacific Coast Expansion (Schwinn Era)', era: '1984–1990', color: 0x8B5CF6 }
];

const EARTH_RADIUS = 100;

// Pre-allocated math helpers at module scope (Zero GC in render loop)
const _curDir = new THREE.Vector3();
const _targetDir = new THREE.Vector3();
const _zAxis = new THREE.Vector3(0, 0, 1);
const _qCur = new THREE.Quaternion();
const _qTarget = new THREE.Quaternion();
const _newDir = new THREE.Vector3();

function generateGreatCircleArc(
  coord1: LatLon,
  coord2: LatLon,
  baseRadius: number,
  arcAltitude: number,
  segments = 48
): THREE.Vector3[] {
  const v1 = new THREE.Vector3(...latLonToVector3(coord1.lat, coord1.lon, 1)).normalize();
  const v2 = new THREE.Vector3(...latLonToVector3(coord2.lat, coord2.lon, 1)).normalize();

  const dot = Math.min(1, Math.max(-1, v1.dot(v2)));
  const omega = Math.acos(dot);
  const points: THREE.Vector3[] = [];

  if (omega < 0.005) {
    return points;
  }

  const sinOmega = Math.sin(omega);
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const a = Math.sin((1 - t) * omega) / sinOmega;
    const b = Math.sin(t * omega) / sinOmega;
    const elevation = Math.sin(t * Math.PI) * arcAltitude;
    const pt = new THREE.Vector3()
      .addScaledVector(v1, a)
      .addScaledVector(v2, b)
      .normalize()
      .multiplyScalar(baseRadius + elevation);
    points.push(pt);
  }
  return points;
}

export default function HeritageGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedHubId, setSelectedHubId] = useState<string>('new-york');
  const [activeDecade, setActiveDecade] = useState<string>('all');
  const [showArcs, setShowArcs] = useState<boolean>(true);
  const [showTerminator, setShowTerminator] = useState<boolean>(true);
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [activeTimelineIdx, setActiveTimelineIdx] = useState<number>(2); // Default to NY
  const [isPlayingTimeline, setIsPlayingTimeline] = useState<boolean>(false);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const earthMeshRef = useRef<THREE.Mesh | null>(null);
  const markersGroupRef = useRef<THREE.Group | null>(null);
  const arcsGroupRef = useRef<THREE.Group | null>(null);
  const sunLightRef = useRef<THREE.DirectionalLight | null>(null);
  const targetCamPosRef = useRef<THREE.Vector3 | null>(null);
  const userOverrideRef = useRef<boolean>(false);
  const isRotatingRef = useRef<boolean>(true);

  isRotatingRef.current = isRotating;

  const selectedHub = useMemo(
    () => HERITAGE_HUBS.find((h) => h.id === selectedHubId) ?? HERITAGE_HUBS[0],
    [selectedHubId]
  );

  const filteredHubs = useMemo(() => {
    if (activeDecade === 'all') return HERITAGE_HUBS;
    return HERITAGE_HUBS.filter((h) => h.decade === activeDecade);
  }, [activeDecade]);

  // Three.js Scene Setup (Adapted from Near Hackathon Earth3D Engine)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 700;
    const height = container.clientHeight || 560;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x060910);
    sceneRef.current = scene;

    // Background Starfield (900 stars)
    const starGeo = new THREE.BufferGeometry();
    const starCoords: number[] = [];
    for (let i = 0; i < 900; i++) {
      const x = (Math.random() - 0.5) * 3200;
      const y = (Math.random() - 0.5) * 3200;
      const z = (Math.random() - 0.5) * 3200;
      if (Math.hypot(x, y, z) > 350) {
        starCoords.push(x, y, z);
      }
    }
    starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starCoords, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0x94A3B8,
      size: 1.4,
      transparent: true,
      opacity: 0.55
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // Camera
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.5, 4000);
    const initVec = latLonToVector3(selectedHub.lat, selectedHub.lng, 275);
    camera.position.set(...initVec);
    cameraRef.current = camera;

    // WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.rotateSpeed = 0.55;
    controls.zoomSpeed = 0.8;
    controls.enablePan = false;
    controls.minDistance = 135;
    controls.maxDistance = 500;
    controlsRef.current = controls;

    controls.addEventListener('start', () => {
      userOverrideRef.current = true;
      targetCamPosRef.current = null;
    });

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xCBD5E1, 0.6);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xFFF7ED, 2.2);
    sunLight.position.set(400, 120, 300);
    scene.add(sunLight);
    sunLightRef.current = sunLight;

    // Procedural Fallback Cartography Textures (Guaranteed zero 404 / void)
    const createFallbackDayTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 512;
      const ctx = canvas.getContext('2d')!;
      const grad = ctx.createLinearGradient(0, 0, 0, 512);
      grad.addColorStop(0, '#0F172A');
      grad.addColorStop(0.5, '#1E293B');
      grad.addColorStop(1, '#0F172A');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1024, 512);

      // Lat/Lon Graticule lines
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.16)';
      ctx.lineWidth = 1;
      for (let y = 0; y <= 512; y += 64) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(1024, y);
        ctx.stroke();
      }
      for (let x = 0; x <= 1024; x += 64) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 512);
        ctx.stroke();
      }
      const tex = new THREE.CanvasTexture(canvas);
      tex.colorSpace = THREE.SRGBColorSpace;
      return tex;
    };

    const createFallbackNightTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 512;
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = '#070B14';
      ctx.fillRect(0, 0, 1024, 512);
      const tex = new THREE.CanvasTexture(canvas);
      tex.colorSpace = THREE.SRGBColorSpace;
      return tex;
    };

    const fallbackDay = createFallbackDayTexture();
    const fallbackNight = createFallbackNightTexture();

    // Earth Shader with Day/Night Smoothstep Terminator & Ocean Specular
    const earthGeo = new THREE.SphereGeometry(EARTH_RADIUS, 72, 72);
    const earthMat = new THREE.ShaderMaterial({
      uniforms: {
        u_day_texture: { value: fallbackDay },
        u_night_texture: { value: fallbackNight },
        u_sun_pos: { value: new THREE.Vector3(1, 0.2, 0.4) },
        u_show_terminator: { value: 1.0 }
      },
      vertexShader: `
        varying vec3 vNormalWorld;
        varying vec3 vPositionWorld;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vNormalWorld = normalize(normalMatrix * normal);
          vPositionWorld = normalize(position);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D u_day_texture;
        uniform sampler2D u_night_texture;
        uniform vec3 u_sun_pos;
        uniform float u_show_terminator;
        varying vec3 vNormalWorld;
        varying vec3 vPositionWorld;
        varying vec2 vUv;

        void main() {
          vec3 dayColor = texture2D(u_day_texture, vUv).rgb;
          vec3 nightColor = texture2D(u_night_texture, vUv).rgb;

          // Sovereign aesthetic color grading
          vec3 luma = vec3(dot(dayColor, vec3(0.299, 0.587, 0.114)));
          dayColor = mix(luma, dayColor, 0.70) * 0.78;

          vec3 sunDir = normalize(u_sun_pos);
          float ndotl = dot(vPositionWorld, sunDir);
          float dayFactor = u_show_terminator > 0.5 ? smoothstep(-0.12, 0.12, ndotl) : 0.85;

          vec3 finalColor = mix(nightColor, dayColor, dayFactor);
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `
    });

    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    scene.add(earthMesh);
    earthMeshRef.current = earthMesh;

    // Atmospheric Rim Glow
    const atmosGeo = new THREE.SphereGeometry(EARTH_RADIUS * 1.018, 48, 48);
    const atmosMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.60 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.8);
          gl_FragColor = vec4(0.22, 0.58, 0.92, 1.0) * max(0.0, intensity) * 0.65;
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false
    });
    const atmosphereMesh = new THREE.Mesh(atmosGeo, atmosMat);
    scene.add(atmosphereMesh);

    // Equator Frame Reference Ring
    const equatorPts: THREE.Vector3[] = [];
    for (let i = 0; i <= 128; i++) {
      const a = (i / 128) * Math.PI * 2;
      equatorPts.push(new THREE.Vector3(Math.cos(a) * (EARTH_RADIUS * 1.003), 0, Math.sin(a) * (EARTH_RADIUS * 1.003)));
    }
    const eqGeo = new THREE.BufferGeometry().setFromPoints(equatorPts);
    const eqMat = new THREE.LineBasicMaterial({ color: 0x1E3A8A, transparent: true, opacity: 0.45 });
    const equatorLine = new THREE.Line(eqGeo, eqMat);
    scene.add(equatorLine);

    // Marker & Arc Groups
    const markersGroup = new THREE.Group();
    scene.add(markersGroup);
    markersGroupRef.current = markersGroup;

    const arcsGroup = new THREE.Group();
    scene.add(arcsGroup);
    arcsGroupRef.current = arcsGroup;

    // Asynchronously load NASA Blue Marble & Night textures
    const loader = new THREE.TextureLoader();
    loader.crossOrigin = 'anonymous';
    loader.load('https://unpkg.com/three-globe@2.31.1/example/img/earth-blue-marble.jpg', (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      earthMat.uniforms.u_day_texture.value = tex;
    });
    loader.load('https://unpkg.com/three-globe@2.31.1/example/img/earth-night.jpg', (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      earthMat.uniforms.u_night_texture.value = tex;
    });

    // Animation Loop with zero-GC SLERP camera damping
    let frameId = 0;
    const animate = () => {
      frameId = requestAnimationFrame(animate);

      // Camera Fly-To SLERP
      if (targetCamPosRef.current && cameraRef.current && controlsRef.current && !userOverrideRef.current) {
        const curDist = cameraRef.current.position.length();
        const targetDist = targetCamPosRef.current.length();

        _curDir.copy(cameraRef.current.position).normalize();
        _targetDir.copy(targetCamPosRef.current).normalize();

        _qCur.setFromUnitVectors(_zAxis, _curDir);
        _qTarget.setFromUnitVectors(_zAxis, _targetDir);

        _qCur.slerp(_qTarget, 0.055);
        _newDir.copy(_zAxis).applyQuaternion(_qCur).normalize();

        const newDist = THREE.MathUtils.lerp(curDist, targetDist, 0.055);
        cameraRef.current.position.copy(_newDir.multiplyScalar(newDist));
        controlsRef.current.update();

        if (cameraRef.current.position.distanceTo(targetCamPosRef.current) < 2.0) {
          targetCamPosRef.current = null;
        }
      } else if (controlsRef.current) {
        controlsRef.current.update();
      }

      // Slow Auto-Orbit when not focused
      if (isRotatingRef.current && !targetCamPosRef.current && controlsRef.current) {
        const angle = 0.0012;
        const x = camera.position.x;
        const z = camera.position.z;
        camera.position.x = x * Math.cos(angle) + z * Math.sin(angle);
        camera.position.z = -x * Math.sin(angle) + z * Math.cos(angle);
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 560;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      earthGeo.dispose();
      earthMat.dispose();
      atmosGeo.dispose();
      atmosMat.dispose();
      starGeo.dispose();
      starMat.dispose();
    };
  }, []);

  // Update Markers & Arcs on Data / Selection Change
  useEffect(() => {
    if (!markersGroupRef.current || !arcsGroupRef.current) return;
    const markersGroup = markersGroupRef.current;
    const arcsGroup = arcsGroupRef.current;

    // Clear previous
    while (markersGroup.children.length > 0) {
      const obj = markersGroup.children[0];
      markersGroup.remove(obj);
    }
    while (arcsGroup.children.length > 0) {
      const obj = arcsGroup.children[0];
      arcsGroup.remove(obj);
    }

    // 1. Render Hub Markers
    filteredHubs.forEach((hub) => {
      const isSelected = hub.id === selectedHubId;
      const coords = latLonToVector3(hub.lat, hub.lng, EARTH_RADIUS);
      const hubPos = new THREE.Vector3(...coords);

      const markerColor = isSelected ? 0x38BDF8 : 0x10B981;

      // Pin Head Sphere
      const headGeo = new THREE.SphereGeometry(isSelected ? 3.4 : 2.5, 16, 16);
      const headMat = new THREE.MeshBasicMaterial({ color: markerColor });
      const headMesh = new THREE.Mesh(headGeo, headMat);
      headMesh.position.copy(hubPos.clone().multiplyScalar(1.025));
      headMesh.userData = { hubId: hub.id };
      markersGroup.add(headMesh);

      // Pin Elevation Stem
      const stemGeo = new THREE.BufferGeometry().setFromPoints([
        hubPos,
        hubPos.clone().multiplyScalar(1.025)
      ]);
      const stemMat = new THREE.LineBasicMaterial({ color: markerColor, linewidth: 2 });
      const stemLine = new THREE.Line(stemGeo, stemMat);
      markersGroup.add(stemLine);

      // Pulsating Ground Ring
      const ringGeo = new THREE.RingGeometry(2.5, isSelected ? 5.2 : 3.8, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: markerColor,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: isSelected ? 0.9 : 0.6
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.position.copy(hubPos.clone().multiplyScalar(1.026));
      ringMesh.lookAt(hubPos.clone().multiplyScalar(2));
      markersGroup.add(ringMesh);
    });

    // 2. Render Great Circle Trajectory Arcs
    if (showArcs) {
      HERITAGE_ARCS.forEach((arc) => {
        const fromHub = HERITAGE_HUBS.find((h) => h.id === arc.fromId);
        const toHub = HERITAGE_HUBS.find((h) => h.id === arc.toId);
        if (!fromHub || !toHub) return;

        const arcPts = generateGreatCircleArc(
          { lat: fromHub.lat, lon: fromHub.lng },
          { lat: toHub.lat, lon: toHub.lng },
          EARTH_RADIUS * 1.01,
          24,
          56
        );

        if (arcPts.length < 2) return;

        const arcGeo = new THREE.BufferGeometry().setFromPoints(arcPts);
        const arcMat = new THREE.LineBasicMaterial({
          color: arc.color,
          transparent: true,
          opacity: 0.75,
          linewidth: 2
        });
        const arcLine = new THREE.Line(arcGeo, arcMat);
        arcsGroup.add(arcLine);
      });
    }
  }, [filteredHubs, selectedHubId, showArcs]);

  // Update Day/Night Terminator Position
  useEffect(() => {
    if (!earthMeshRef.current || !sunLightRef.current) return;
    const mat = earthMeshRef.current.material as THREE.ShaderMaterial;
    if (!mat || !mat.uniforms) return;

    mat.uniforms.u_show_terminator.value = showTerminator ? 1.0 : 0.0;

    // Use selected hub historical midpoint timestamp
    const dummyIso = `${selectedHub.yearMin + 2}-06-15T14:30:00Z`;
    const subSolar = getSubSolarPointFromIso(dummyIso);
    const sunPos = latLonToVector3(subSolar.lat, subSolar.lon, 400);

    sunLightRef.current.position.set(...sunPos);
    mat.uniforms.u_sun_pos.value.set(...sunPos).normalize();
  }, [selectedHub, showTerminator]);

  // Fly Camera to Selected Hub
  const flyToHub = useCallback((hub: HeritageHub) => {
    setSelectedHubId(hub.id);
    userOverrideRef.current = false;
    setIsRotating(false);

    const coords = latLonToVector3(hub.lat, hub.lng, 235);
    targetCamPosRef.current = new THREE.Vector3(...coords);
  }, []);

  // Timeline Step Event Handler
  const handleStepTimeline = (direction: -1 | 1) => {
    const nextIdx = (activeTimelineIdx + direction + HERITAGE_HUBS.length) % HERITAGE_HUBS.length;
    setActiveTimelineIdx(nextIdx);
    flyToHub(HERITAGE_HUBS[nextIdx]);
  };

  // Timeline Auto-Play Loop
  useEffect(() => {
    if (!isPlayingTimeline) return;
    const timer = setInterval(() => {
      setActiveTimelineIdx((prev) => {
        const next = (prev + 1) % HERITAGE_HUBS.length;
        flyToHub(HERITAGE_HUBS[next]);
        return next;
      });
    }, 4200);
    return () => clearInterval(timer);
  }, [isPlayingTimeline, flyToHub]);

  return (
    <div style={{ backgroundColor: '#070A10', borderRadius: '16px', border: '1px solid #1E293B', padding: '24px', color: '#F8FAFC' }}>
      {/* Top Command Center Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #1E293B', paddingBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ backgroundColor: '#0284C7', padding: '10px', borderRadius: '10px', display: 'flex' }}>
            <Globe size={24} color="#FFFFFF" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#F1F5F9' }}>
                Command Center: 3D Sovereign Heritage Globe
              </h2>
              <span style={{ fontSize: '10px', backgroundColor: '#065F46', color: '#6EE7B7', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>
                PROOFGATE 3D ENGINE
              </span>
            </div>
            <p style={{ margin: 0, fontSize: '12px', color: '#94A3B8' }}>
              Spatiotemporal Memory Mesh &bull; Great Circle Trajectory Arcs &bull; Inode GPS Clue Correlator
            </p>
          </div>
        </div>

        {/* Global Controls Rig */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => setShowTerminator(!showTerminator)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: showTerminator ? '#0F172A' : '#1E293B',
              color: showTerminator ? '#F59E0B' : '#94A3B8',
              border: '1px solid #334155',
              padding: '6px 12px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '11px',
              fontWeight: 600
            }}
          >
            <Sun size={13} />
            {showTerminator ? 'Day/Night: ACTIVE' : 'Day/Night: FLAT'}
          </button>

          <button
            onClick={() => setShowArcs(!showArcs)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: showArcs ? '#0F172A' : '#1E293B',
              color: showArcs ? '#38BDF8' : '#94A3B8',
              border: '1px solid #334155',
              padding: '6px 12px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '11px',
              fontWeight: 600
            }}
          >
            <Radio size={13} />
            {showArcs ? 'Arcs: VISIBLE' : 'Arcs: HIDDEN'}
          </button>

          <button
            onClick={() => setIsRotating(!isRotating)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: isRotating ? '#065F46' : '#1E293B',
              color: isRotating ? '#6EE7B7' : '#94A3B8',
              border: '1px solid #334155',
              padding: '6px 12px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '11px',
              fontWeight: 600
            }}
          >
            {isRotating ? <Pause size={13} /> : <Play size={13} />}
            {isRotating ? 'Auto-Orbit' : 'Manual'}
          </button>

          <button
            onClick={() => {
              userOverrideRef.current = false;
              setIsRotating(true);
              const vec = latLonToVector3(20, -40, 290);
              targetCamPosRef.current = new THREE.Vector3(...vec);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#1E293B',
              color: '#94A3B8',
              border: '1px solid #334155',
              padding: '6px 12px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '11px',
              fontWeight: 600
            }}
          >
            <RotateCcw size={13} />
            Global View
          </button>
        </div>
      </div>

      {/* 3-Column Enterprise Console Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr 340px', gap: '16px', height: '580px' }}>
        {/* Left Column: Organization Heritage Hubs List */}
        <div style={{ backgroundColor: '#0B0F19', borderRadius: '12px', border: '1px solid #1E293B', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94A3B8', fontWeight: 700 }}>
              Archival Nodes ({filteredHubs.length})
            </span>
            <span style={{ fontSize: '10px', color: '#38BDF8', fontWeight: 600 }}>1912 &rarr; Present</span>
          </div>

          {/* Era Filter Selector */}
          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
            {['all', '1910s', '1920s', '1950s', '1960s', '1970s', '1980s'].map((dec) => (
              <button
                key={dec}
                onClick={() => setActiveDecade(dec)}
                style={{
                  backgroundColor: activeDecade === dec ? '#0284C7' : '#1E293B',
                  color: activeDecade === dec ? '#FFFFFF' : '#94A3B8',
                  border: '1px solid #334155',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  fontSize: '10px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {dec === 'all' ? 'All' : dec}
              </button>
            ))}
          </div>

          {/* Hubs Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {filteredHubs.map((hub) => {
              const isSelected = selectedHubId === hub.id;
              return (
                <div
                  key={hub.id}
                  onClick={() => flyToHub(hub)}
                  style={{
                    backgroundColor: isSelected ? '#1E293B' : '#0F172A',
                    borderRadius: '8px',
                    border: isSelected ? '1px solid #38BDF8' : '1px solid #1E293B',
                    padding: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    borderLeft: isSelected ? '4px solid #38BDF8' : '4px solid #334155'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: isSelected ? '#FFFFFF' : '#E2E8F0' }}>
                      {hub.name}
                    </span>
                    <span style={{ fontSize: '10px', backgroundColor: '#0284C7', color: '#FFFFFF', padding: '1px 6px', borderRadius: '4px', fontWeight: 700 }}>
                      {hub.photoCount}
                    </span>
                  </div>
                  <div style={{ fontSize: '11px', color: '#94A3B8', marginBottom: '6px' }}>{hub.country} &bull; {hub.era}</div>
                  <div style={{ fontSize: '10px', color: '#38BDF8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    Anchor: {hub.heirlooms[0]}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Center Column: Unobstructed 3D Photorealistic Earth Canvas */}
        <div style={{ position: 'relative', backgroundColor: '#060910', borderRadius: '12px', border: '1px solid #1E293B', overflow: 'hidden' }}>
          {/* Active Target Banner (Top Overlay) */}
          <div style={{ position: 'absolute', top: '14px', left: '16px', zIndex: 10, display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(15, 23, 42, 0.85)', padding: '6px 14px', borderRadius: '20px', border: '1px solid #334155', backdropFilter: 'blur(8px)' }}>
            <Compass size={13} color="#38BDF8" className="animate-spin" />
            <span style={{ fontSize: '11px', color: '#F1F5F9', fontWeight: 600 }}>
              Focus: <span style={{ color: '#38BDF8' }}>{selectedHub.name}</span> ({formatCoords({ lat: selectedHub.lat, lon: selectedHub.lng })})
            </span>
          </div>

          {/* WebGL Performance Badge (Top-Right) */}
          <div style={{ position: 'absolute', top: '14px', right: '16px', zIndex: 10, display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(15, 23, 42, 0.85)', padding: '6px 12px', borderRadius: '20px', border: '1px solid #065F46', backdropFilter: 'blur(8px)' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981' }}></span>
            <span style={{ fontSize: '10px', color: '#6EE7B7', fontWeight: 700 }}>WebGL 60 FPS &bull; NASA Textures</span>
          </div>

          {/* Mount Div for Three.js Canvas */}
          <div ref={containerRef} style={{ width: '100%', height: '100%', cursor: 'grab' }} />

          {/* Orbit Controls Guidance (Bottom Overlay) */}
          <div style={{ position: 'absolute', bottom: '12px', left: '16px', zIndex: 10, fontSize: '10px', color: '#64748B', backgroundColor: 'rgba(6, 9, 16, 0.75)', padding: '4px 8px', borderRadius: '4px' }}>
            Click & drag to rotate &bull; Scroll to zoom &bull; Click node to focus
          </div>
        </div>

        {/* Right Column: Selected Node Forensic Dossier */}
        <div style={{ backgroundColor: '#0B0F19', borderRadius: '12px', border: '1px solid #1E293B', padding: '18px', display: 'flex', flexDirection: 'column', gap: '14px', overflowY: 'auto' }}>
          <div style={{ borderBottom: '1px solid #1E293B', paddingBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#38BDF8', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>
              <MapPin size={13} />
              <span>Forensic Node Dossier</span>
            </div>
            <h3 style={{ margin: '0 0 2px 0', fontSize: '18px', fontWeight: 700, color: '#FFFFFF' }}>
              {selectedHub.name}
            </h3>
            <span style={{ fontSize: '12px', color: '#94A3B8' }}>{selectedHub.country}</span>
          </div>

          {/* Historical Metrics */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <div style={{ backgroundColor: '#111827', padding: '10px', borderRadius: '8px', border: '1px solid #1F2937' }}>
              <span style={{ fontSize: '10px', color: '#9CA3AF' }}>Temporal Bounds</span>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#10B981', marginTop: '2px' }}>{selectedHub.verifiedDates}</div>
            </div>
            <div style={{ backgroundColor: '#111827', padding: '10px', borderRadius: '8px', border: '1px solid #1F2937' }}>
              <span style={{ fontSize: '10px', color: '#9CA3AF' }}>Indexed Scans</span>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#38BDF8', marginTop: '2px' }}>{selectedHub.photoCount} Files</div>
            </div>
          </div>

          {/* Contextual Description */}
          <div style={{ backgroundColor: '#111827', padding: '12px', borderRadius: '8px', border: '1px solid #1F2937' }}>
            <p style={{ margin: 0, fontSize: '11px', lineHeight: '1.5', color: '#CBD5E1' }}>
              {selectedHub.description}
            </p>
          </div>

          {/* Mined Clues & Heirloom Anchors */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <Sparkles size={13} color="#F59E0B" />
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#F1F5F9' }}>Mined Clues & Anchors</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {selectedHub.heirlooms.map((h, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: '#111827',
                    padding: '8px 10px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    color: '#E2E8F0',
                    borderLeft: '3px solid #0284C7',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Navigation size={11} color="#38BDF8" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hardware Inode Sync Proof */}
          <div style={{ marginTop: 'auto', backgroundColor: '#030712', padding: '10px 12px', borderRadius: '8px', border: '1px solid #1E293B' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10B981', fontSize: '10px', fontWeight: 700, marginBottom: '4px' }}>
              <CheckCircle2 size={12} />
              <span>Hardware Inode Restoration</span>
            </div>
            <div style={{ fontSize: '10px', color: '#94A3B8', fontFamily: 'monospace' }}>
              {selectedHub.inodeStatus}
            </div>
            <code style={{ fontSize: '9px', color: '#38BDF8', display: 'block', marginTop: '4px', wordBreak: 'break-all' }}>
              {selectedHub.keyPhoto}
            </code>
          </div>
        </div>
      </div>

      {/* Bottom Century Evidence Timeline Scrubber */}
      <div style={{ marginTop: '16px', backgroundColor: '#0B0F19', borderRadius: '12px', padding: '14px 20px', border: '1px solid #1E293B', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={() => setIsPlayingTimeline(!isPlayingTimeline)}
            style={{
              backgroundColor: isPlayingTimeline ? '#065F46' : '#0284C7',
              color: '#FFFFFF',
              border: 'none',
              padding: '6px 12px',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '11px',
              fontWeight: 700
            }}
          >
            {isPlayingTimeline ? <Pause size={13} /> : <Play size={13} />}
            {isPlayingTimeline ? 'Pause Walkthrough' : 'Play Timeline'}
          </button>

          <button
            onClick={() => handleStepTimeline(-1)}
            style={{ backgroundColor: '#1E293B', color: '#94A3B8', border: '1px solid #334155', padding: '6px', borderRadius: '6px', cursor: 'pointer' }}
          >
            <ChevronLeft size={14} />
          </button>
          <button
            onClick={() => handleStepTimeline(1)}
            style={{ backgroundColor: '#1E293B', color: '#94A3B8', border: '1px solid #334155', padding: '6px', borderRadius: '6px', cursor: 'pointer' }}
          >
            <ChevronRight size={14} />
          </button>

          <span style={{ fontSize: '11px', color: '#94A3B8' }}>
            Current Era: <strong style={{ color: '#F1F5F9' }}>{selectedHub.era}</strong> ({selectedHub.name})
          </span>
        </div>

        {/* Timeline Hub Nodes */}
        <div style={{ display: 'flex', gap: '8px', flex: 1, justifyContent: 'flex-end' }}>
          {HERITAGE_HUBS.map((hub, idx) => {
            const isSelected = selectedHub.id === hub.id;
            return (
              <button
                key={hub.id}
                onClick={() => {
                  setActiveTimelineIdx(idx);
                  flyToHub(hub);
                }}
                style={{
                  backgroundColor: isSelected ? '#0369A1' : '#111827',
                  color: isSelected ? '#FFFFFF' : '#94A3B8',
                  border: isSelected ? '1px solid #38BDF8' : '1px solid #1F2937',
                  padding: '5px 10px',
                  borderRadius: '6px',
                  fontSize: '10px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <span>{hub.yearMin}</span>
                <span>&bull;</span>
                <span>{hub.name.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
