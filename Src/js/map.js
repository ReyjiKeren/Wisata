// Imports removed for global script usage

const ISLANDS_DATA = [
    {
        "id": "sumatra",
        "name": "Sumatra",
        "color": "#16C6FF",
        "description": "Wilayah barat liar Indonesia, rumah bagi orangutan, gunung berapi, dan danau supervolcan Toba yang masif.",
        "headerImage": "https://tse2.mm.bing.net/th?q=Sumatra%20Rainforest%20Landscape&w=1200&h=600&c=7&rs=1"
    },
    {
        "id": "java",
        "name": "Jawa",
        "color": "#16C6FF",
        "description": "Jantung nusantara, ramai dengan budaya, sejarah, candi kuno seperti Borobudur, dan kota-kota modern.",
        "headerImage": "https://tse2.mm.bing.net/th?q=Java%20Indonesia%20Landscape%20Temple&w=1200&h=600&c=7&rs=1"
    },
    {
        "id": "kalimantan",
        "name": "Kalimantan",
        "color": "#16C6FF",
        "description": "Hutan hujan kuno, satwa liar beragam termasuk orangutan, dan petualangan sungai yang menakjubkan.",
        "headerImage": "https://tse2.mm.bing.net/th?q=Kalimantan%20Rainforest%20River&w=1200&h=600&c=7&rs=1"
    },
    {
        "id": "sulawesi",
        "name": "Sulawesi",
        "color": "#16C6FF",
        "description": "Pulau berbentuk K yang unik, terkenal dengan kekayaan laut, tempat menyelam, dan budaya dataran tinggi.",
        "headerImage": "https://tse2.mm.bing.net/th?q=Sulawesi%20Landscape%20Toraja&w=1200&h=600&c=7&rs=1"
    },
    {
        "id": "bali",
        "name": "Bali",
        "color": "#FFC616",
        "description": "Pulau Dewata, terkenal di dunia karena pantai, pura, kehidupan malam, dan keseniannya.",
        "headerImage": "https://tse2.mm.bing.net/th?q=Bali%20Pura%20Ulun%20Danu&w=1200&h=600&c=7&rs=1"
    },
    {
        "id": "lombok",
        "name": "Nusa Tenggara",
        "color": "#16C6FF",
        "description": "Tetangga Bali yang lebih tenang, dikenal dengan Gunung Rinjani, air terjun, dan Kepulauan Gili.",
        "headerImage": "https://tse2.mm.bing.net/th?q=Komodo%20Island%20Landscape&w=1200&h=600&c=7&rs=1"
    },
    {
        "id": "flores",
        "name": "Flores (NTT)",
        "color": "#16C6FF",
        "description": "Rumah bagi danau tiga warna Kelimutu dan gerbang menuju Taman Nasional Komodo.",
        "headerImage": "https://tse2.mm.bing.net/th?q=Kelimutu%20Crater%20Lake&w=1200&h=600&c=7&rs=1"
    },
    {
        "id": "maluku",
        "name": "Maluku",
        "color": "#16C6FF",
        "description": "Kepulauan Rempah-rempah yang bersejarah dengan pantai perawan dan lokasi menyelam.",
        "headerImage": "https://tse2.mm.bing.net/th?q=Banda%20Islands%20Indonesia&w=1200&h=600&c=7&rs=1"
    },
    {
        "id": "papua",
        "name": "Papua",
        "color": "#16C6FF",
        "description": "Batas timur terakhir dengan hutan belantara yang belum terjamah, budaya suku asli, dan keajaiban Raja Ampat.",
        "headerImage": "https://tse2.mm.bing.net/th?q=Raaja%20Ampat%20Piaynemo&w=1200&h=600&c=7&rs=1"
    }
];

const DESTINATIONS_DATA = {
    "sumatra": [
        { "name": "Danau Toba", "type": "Alam", "image": "https://tse2.mm.bing.net/th?q=Danau%20Toba%20Landscape%20High%20Quality&w=800&c=7&rs=1" },
        { "name": "Bukit Lawang", "type": "Satwa", "image": "https://tse2.mm.bing.net/th?q=Bukit%20Lawang%20Orangutan%20HD&w=800&c=7&rs=1" },
        { "name": "Kepulauan Mentawai", "type": "Selancar", "image": "https://tse2.mm.bing.net/th?q=Mentawai%20Islands%20Surf%20Photography&w=800&c=7&rs=1" },
        { "name": "Ngarai Sianok", "type": "Alam", "image": "https://tse2.mm.bing.net/th?q=Ngarai%20Sianok%20View&w=800&c=7&rs=1" },
        { "name": "Jembatan Ampera", "type": "Kota", "image": "https://tse2.mm.bing.net/th?q=Ampera%20Bridge%20Night%20HD&w=800&c=7&rs=1" }
    ],
    "java": [
        { "name": "Candi Borobudur", "type": "Budaya", "image": "https://tse2.mm.bing.net/th?q=Borobudur%20Sunrise%20HD&w=800&c=7&rs=1" },
        { "name": "Gunung Bromo", "type": "Petualangan", "image": "https://tse2.mm.bing.net/th?q=Mount%20Bromo%20Landscape&w=800&c=7&rs=1" },
        { "name": "Malioboro, Yogyakarta", "type": "Kota", "image": "https://tse2.mm.bing.net/th?q=Malioboro%20Street%20Night&w=800&c=7&rs=1" },
        { "name": "Kawah Ijen", "type": "Alam", "image": "https://tse2.mm.bing.net/th?q=Kawah%20Ijen%20Blue%20Fire%20HD&w=800&c=7&rs=1" },
        { "name": "Candi Prambanan", "type": "Budaya", "image": "https://tse2.mm.bing.net/th?q=Prambanan%20Temple%20Sunset&w=800&c=7&rs=1" }
    ],
    "kalimantan": [
        { "name": "Tanjung Puting", "type": "Satwa", "image": "https://tse2.mm.bing.net/th?q=Tanjung%20Puting%20Orangutan&w=800&c=7&rs=1" },
        { "name": "Kepulauan Derawan", "type": "Bahari", "image": "https://tse2.mm.bing.net/th?q=Derawan%20Island%20Paradise&w=800&c=7&rs=1" },
        { "name": "Pasar Terapung", "type": "Budaya", "image": "https://tse2.mm.bing.net/th?q=Lok%20Baintan%20Floating%20Market&w=800&c=7&rs=1" },
        { "name": "Danau Kakaban", "type": "Alam", "image": "https://tse2.mm.bing.net/th?q=Kakaban%20Lake%20Jellyfish&w=800&c=7&rs=1" }
    ],
    "sulawesi": [
        { "name": "Tana Toraja", "type": "Budaya", "image": "https://tse2.mm.bing.net/th?q=Tana%20Toraja%20Tongkonan&w=800&c=7&rs=1" },
        { "name": "Taman Laut Bunaken", "type": "Menyelam", "image": "https://tse2.mm.bing.net/th?q=Bunaken%20Underwater%20Coral&w=800&c=7&rs=1" },
        { "name": "Wakatobi", "type": "Alam", "image": "https://tse2.mm.bing.net/th?q=Wakatobi%20National%20Park&w=800&c=7&rs=1" },
        { "name": "Pulau Padar", "type": "Bahari", "image": "https://tse2.mm.bing.net/th?q=Padar%20Island%20View%20HD&w=800&c=7&rs=1" }
    ],
    "bali": [
        { "name": "Ubud Monkey Forest", "type": "Alam", "image": "https://tse2.mm.bing.net/th?q=Ubud%20Monkey%20Forest%20Green&w=800&c=7&rs=1" },
        { "name": "Pura Uluwatu", "type": "Budaya", "image": "https://tse2.mm.bing.net/th?q=Uluwatu%20Kecak%20Dance%20Sunset&w=800&c=7&rs=1" },
        { "name": "Nusa Penida", "type": "Pantai", "image": "https://tse2.mm.bing.net/th?q=Kelingking%20Beach%20HD&w=800&c=7&rs=1" },
        { "name": "Tanah Lot", "type": "Pura", "image": "https://tse2.mm.bing.net/th?q=Tanah%20Lot%20Temple&w=800&c=7&rs=1" }
    ],
    "lombok": [
        { "name": "Gunung Rinjani", "type": "Petualangan", "image": "https://tse2.mm.bing.net/th?q=Mount%20Rinjani%20Summit&w=800&c=7&rs=1" },
        { "name": "Gili Trawangan", "type": "Pesta & Pantai", "image": "https://tse2.mm.bing.net/th?q=Gili%20Trawangan%20Beach%20Aerial&w=800&c=7&rs=1" },
        { "name": "Pantai Pink", "type": "Alam", "image": "https://tse2.mm.bing.net/th?q=Pink%20Beach%20Lombok%20Drone&w=800&c=7&rs=1" },
        { "name": "Desa Sade", "type": "Budaya", "image": "https://tse2.mm.bing.net/th?q=Sade%20Village%20Sasak&w=800&c=7&rs=1" }
    ],
    "flores": [
        { "name": "Taman Nasional Komodo", "type": "Satwa", "image": "https://tse2.mm.bing.net/th?q=Komodo%20Park%20Landscape&w=800&c=7&rs=1" },
        { "name": "Danau Kelimutu", "type": "Alam", "image": "https://tse2.mm.bing.net/th?q=Kelimutu%20Lakes%20Colors&w=800&c=7&rs=1" },
        { "name": "Labuan Bajo", "type": "Gerbang", "image": "https://tse2.mm.bing.net/th?q=Labuan%20Bajo%20Sunset%20Harbor&w=800&c=7&rs=1" },
        { "name": "Wae Rebo", "type": "Budaya", "image": "https://tse2.mm.bing.net/th?q=Wae%20Rebo%20Village%20Mist&w=800&c=7&rs=1" }
    ],
    "maluku": [
        { "name": "Banda Neira", "type": "Sejarah", "image": "https://tse2.mm.bing.net/th?q=Banda%20Neira%20Volcano&w=800&c=7&rs=1" },
        { "name": "Pantai Ora", "type": "Alam", "image": "https://tse2.mm.bing.net/th?q=Ora%20Beach%20Maldives%20Indonesia&w=800&c=7&rs=1" },
        { "name": "Kepulauan Kei", "type": "Pantai", "image": "https://tse2.mm.bing.net/th?q=Kei%20Islands%20White%20Sand&w=800&c=7&rs=1" }
    ],
    "papua": [
        { "name": "Raja Ampat", "type": "Menyelam", "image": "https://tse2.mm.bing.net/th?q=Raja%20Ampat%20Piaynemo&w=800&c=7&rs=1" },
        { "name": "Lembah Baliem", "type": "Budaya", "image": "https://tse2.mm.bing.net/th?q=Baliem%20Valley%20Tribe&w=800&c=7&rs=1" },
        { "name": "Taman Nasional Lorentz", "type": "Alam", "image": "https://tse2.mm.bing.net/th?q=Puncak%20Jaya%20Snow&w=800&c=7&rs=1" },
        { "name": "Jayapura City", "type": "Kota", "image": "https://tse2.mm.bing.net/th?q=Jayapura%20City%20Night&w=800&c=7&rs=1" }
    ]
};

class MapApp {
    constructor() {
        this.container = document.getElementById('canvas-container');
        this.tooltip = document.getElementById('map-tooltip');
        this.tooltipTitle = document.getElementById('tooltip-title');
        this.sidePanel = document.getElementById('side-panel');
        this.closePanelBtn = document.getElementById('close-panel');

        this.islandsData = ISLANDS_DATA;
        this.destinationsData = DESTINATIONS_DATA;
        this.objects = [];
        this.currentHovered = null;

        this.init();
    }

    init() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x0A0F1F);
        this.scene.fog = new THREE.FogExp2(0x0A0F1F, 0.02);

        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(0, 10, 20);
        this.camera.lookAt(0, 0, 0);

        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.container.appendChild(this.renderer.domElement);

        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.minDistance = 5;
        this.controls.maxDistance = 60;
        this.controls.maxPolarAngle = Math.PI / 2 - 0.1;

        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        this.scene.add(ambientLight);

        const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
        dirLight.position.set(10, 20, 10);
        this.scene.add(dirLight);

        const pointLight = new THREE.PointLight(0x16C6FF, 1.5, 50);
        pointLight.position.set(0, 10, 0);
        this.scene.add(pointLight);

        // Load Map
        this.loadGeoJSON();

        // Raycaster
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();

        // Events
        window.addEventListener('resize', this.onWindowResize.bind(this));
        window.addEventListener('mousemove', this.onMouseMove.bind(this));
        window.addEventListener('click', this.onMouseClick.bind(this));

        // UI
        this.setupUIEvents();

        this.animate();
    }

    setupUIEvents() {
        const zoomInBtn = document.getElementById('zoom-in');
        if (zoomInBtn) zoomInBtn.addEventListener('click', () => {
            const newZ = Math.max(this.controls.minDistance, this.camera.position.z * 0.7);
            gsap.to(this.camera.position, { duration: 0.8, z: newZ, onUpdate: () => this.controls.update() });
        });

        const zoomOutBtn = document.getElementById('zoom-out');
        if (zoomOutBtn) zoomOutBtn.addEventListener('click', () => {
            const newZ = Math.min(this.controls.maxDistance, this.camera.position.z * 1.3);
            gsap.to(this.camera.position, { duration: 0.8, z: newZ, onUpdate: () => this.controls.update() });
        });

        const resetBtn = document.getElementById('reset-cam');
        if (resetBtn) resetBtn.addEventListener('click', () => {
            gsap.to(this.camera.position, { duration: 1.5, x: 0, y: 10, z: 20, onUpdate: () => this.controls.update() });
            gsap.to(this.controls.target, { duration: 1.5, x: 0, y: 0, z: 0 });
        });

        if (this.closePanelBtn) this.closePanelBtn.addEventListener('click', () => this.togglePanel(false));

        const closePanelMain = document.getElementById('close-panel-main');
        if (closePanelMain) closePanelMain.addEventListener('click', () => this.togglePanel(false));
    }

    async loadGeoJSON() {
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'fixed inset-0 flex items-center justify-center bg-brand-navy z-[60] text-brand-cyan font-bold text-xl';
        loadingDiv.innerText = 'MEMUAT PETA...';
        document.body.appendChild(loadingDiv);

        try {
            const [indoRes, worldRes] = await Promise.all([
                fetch('https://raw.githubusercontent.com/superpikar/indonesia-geojson/master/indonesia-province-simple.json'),
                fetch('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson')
            ]);

            const indoData = await indoRes.json();
            const worldData = await worldRes.json();

            // Center the map projection common for both
            const projection = d3.geoMercator()
                .center([118, -2]) // Center of Indonesia
                .scale(35)
                .translate([0, 0]);

            // Render World Background (Ghost)
            this.generateWorldBackground(worldData, projection);

            // Render Indonesia (Main)
            this.generateMapFromGeoJSON(indoData, projection);

            // Add sea plane after map to handle render order
            const planeGeometry = new THREE.PlaneGeometry(300, 150);
            const planeMaterial = new THREE.MeshPhongMaterial({
                color: 0x050810,
                shininess: 100,
                transparent: true,
                opacity: 0.9,
                side: THREE.DoubleSide
            });
            const plane = new THREE.Mesh(planeGeometry, planeMaterial);
            plane.rotation.x = -Math.PI / 2;
            plane.position.y = -0.5;
            this.scene.add(plane);

            loadingDiv.remove();
        } catch (error) {
            console.error('Error loading map:', error);
            loadingDiv.innerText = 'GAGAL MEMUAT PETA. Sila Refresh.';
        }
    }

    generateWorldBackground(geojson, projection) {
        geojson.features.forEach(feature => {
            // SKIP Indonesia to avoid overlap
            if (feature.id === "IDN" || feature.properties.name === "Indonesia") return;

            if (feature.geometry.type === "Polygon") {
                feature.geometry.coordinates.forEach(coords => {
                    this.createGhostMesh(coords, projection);
                });
            } else if (feature.geometry.type === "MultiPolygon") {
                feature.geometry.coordinates.forEach(polygon => {
                    polygon.forEach(coords => {
                        this.createGhostMesh(coords, projection);
                    });
                });
            }
        });
    }

    createGhostMesh(coords, projection) {
        const shape = new THREE.Shape();
        coords.forEach((coord, i) => {
            const [x, y] = projection(coord);
            if (i === 0) shape.moveTo(x, -y);
            else shape.lineTo(x, -y);
        });

        const geometry = new THREE.ExtrudeGeometry(shape, {
            depth: 0.1,
            bevelEnabled: false
        });

        // Transparent / Ghost styling
        const material = new THREE.MeshBasicMaterial({
            color: 0x16C6FF,
            transparent: true,
            opacity: 0.03, // Very faint
            side: THREE.DoubleSide
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.x = -Math.PI / 2;
        mesh.position.y = -0.2; // Slightly below main map to enhance depth

        this.scene.add(mesh);
    }

    generateMapFromGeoJSON(geojson, projection) {
        // Projection passed from parent
        const path = d3.geoPath().projection(projection);

        geojson.features.forEach(feature => {
            const provinceName = feature.properties.Propinsi; // Adjust Key if needed based on inspection

            if (feature.geometry.type === "Polygon") {
                feature.geometry.coordinates.forEach(coords => {
                    this.createTerritoryMesh(coords, projection, provinceName);
                });
            } else if (feature.geometry.type === "MultiPolygon") {
                feature.geometry.coordinates.forEach(polygon => {
                    polygon.forEach(coords => {
                        this.createTerritoryMesh(coords, projection, provinceName);
                    });
                });
            }
        });
    }

    createTerritoryMesh(coords, projection, name) {
        const shape = new THREE.Shape();

        coords.forEach((coord, i) => {
            const [x, y] = projection(coord);
            // In Three.js, Y is up, but map projection Y is down (screen). Invert Y.
            if (i === 0) shape.moveTo(x, -y);
            else shape.lineTo(x, -y);
        });

        const geometry = new THREE.ExtrudeGeometry(shape, {
            depth: 0.2, // Thickness
            bevelEnabled: true,
            bevelSegments: 2,
            bevelSize: 0.02,
            bevelThickness: 0.02
        });

        // Determine Region/Island Group for Color & Data
        const regionId = this.getRegionIdFromName(name);
        const islandData = this.islandsData.find(i => i.id === regionId);

        const color = islandData ? islandData.color : 0x16C6FF;

        const material = new THREE.MeshPhongMaterial({
            color: 0x0A0F1F,
            emissive: color,
            emissiveIntensity: 0.2,
            shininess: 50,
            flatShading: false
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.x = -Math.PI / 2; // Lay flat (Front face up, North away from camera)

        mesh.userData = {
            id: regionId, // Use the region ID (e.g., 'sumatra') rather than province name for the main logic
            province: name,
            name: islandData ? islandData.name : name, // Display name
            data: islandData
        };

        this.scene.add(mesh);
        this.objects.push(mesh);
    }

    getRegionIdFromName(provinceName) {
        if (!provinceName) return null;
        const up = provinceName.toUpperCase();

        if (up.includes("SUMATERA") || up.includes("ACEH") || up.includes("RIAU") || up.includes("JAMBI") || up.includes("LAMPUNG") || up.includes("BENGKULU") || up.includes("BANGKA") || up.includes("MEDAN") || up.includes("PADANG") || up.includes("PALEMBANG")) return "sumatra";
        if (up.includes("JAWA") || up.includes("YOGYAKARTA") || up.includes("DKI") || up.includes("BANTEN") || up.includes("JAKARTA")) return "java";
        if (up.includes("KALIMANTAN")) return "kalimantan";
        if (up.includes("SULAWESI") || up.includes("GORONTALO") || up.includes("KENDARI") || up.includes("MANADO") || up.includes("MAKASSAR")) return "sulawesi";
        if (up.includes("BALI")) return "bali";

        // NTB often refers to Lombok/Sumbawa
        // Fix: GeoJSON has typo "NUSATENGGARA BARAT"
        if (up.includes("NUSA TENGGARA BARAT") || up.includes("NUSATENGGARA BARAT") || up.includes("NTB") || up.includes("LOMBOK") || up.includes("SUMBAWA")) return "lombok";

        // NTT often refers to Flores/Komodo
        if (up.includes("NUSA TENGGARA TIMUR") || up.includes("NTT") || up.includes("FLORES") || up.includes("KUPANG")) return "flores";

        if (up.includes("MALUKU") || up.includes("AMBON")) return "maluku";

        // Papua (Handles "IRIAN JAYA" variants)
        if (up.includes("PAPUA") || up.includes("IRIAN") || up.includes("SORONG") || up.includes("JAYAPURA") || up.includes("BARAT D")) return "papua";

        return "other";
    }

    onMouseMove(event) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        gsap.to(this.tooltip, {
            left: event.clientX + 15,
            top: event.clientY + 15,
            duration: 0.2
        });

        this.raycast();
    }

    raycast() {
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.objects);

        if (intersects.length > 0) {
            const object = intersects[0].object;
            const data = object.userData;

            if (this.currentHovered !== object) {
                // Dim previous
                if (this.currentHovered) {
                    gsap.to(this.currentHovered.material, { emissiveIntensity: 0.2 });
                    this.tooltip.style.opacity = 0;
                }

                this.currentHovered = object;
                document.body.style.cursor = 'pointer';

                // Glow current
                gsap.to(object.material, { emissiveIntensity: 0.8, duration: 0.3 });

                // Tooltip
                if (this.tooltipTitle) {
                    // Show Province name if available, else Island name
                    this.tooltipTitle.innerText = data.province ? `${data.province}` : data.name;
                }
                if (this.tooltip) this.tooltip.style.opacity = 1;
            }
        } else {
            if (this.currentHovered) {
                gsap.to(this.currentHovered.material, { emissiveIntensity: 0.2, duration: 0.3 });
                this.currentHovered = null;
                document.body.style.cursor = 'default';
                if (this.tooltip) this.tooltip.style.opacity = 0;
            }
        }
    }

    onMouseClick(event) {
        if (this.currentHovered) {
            const data = this.currentHovered.userData;
            // Only open panel if we have data for this region
            if (data.id && data.id !== "other") {
                this.openPanel(data.id, data.name);

                // --- ZOOM TO ISLAND LOGIC ---
                const mesh = this.currentHovered;

                // Calculate center of the mesh in World Coordinates
                if (!mesh.geometry.boundingBox) mesh.geometry.computeBoundingBox();
                const center = new THREE.Vector3();
                mesh.geometry.boundingBox.getCenter(center);
                mesh.localToWorld(center);

                // Define offset for the camera (how close to zoom)
                // Adjust these values based on preference. 
                // Since map is flat on XZ plane, we want to be above (Y) and south (Z) of it.
                const zoomOffset = 8; // Distance from center
                const heightOffset = 5; // Height above map

                gsap.to(this.camera.position, {
                    duration: 1.5,
                    x: center.x,
                    y: center.y + heightOffset,
                    z: center.z + zoomOffset,
                    ease: "power2.inOut",
                    onUpdate: () => this.controls.update()
                });

                // Animate controls target to look at the island center
                gsap.to(this.controls.target, {
                    duration: 1.5,
                    x: center.x,
                    y: center.y,
                    z: center.z,
                    ease: "power2.inOut"
                });
            }
        }
    }

    openPanel(islandId, islandName) {
        const island = this.islandsData.find(i => i.id === islandId);
        const destinations = this.destinationsData[islandId];

        const titleEl = document.getElementById('panel-title');
        const descEl = document.getElementById('panel-desc');
        const imgEl = document.getElementById('panel-image');

        if (titleEl) titleEl.innerText = island ? island.name : islandName;
        if (descEl) descEl.innerText = island ? island.description : "Jelajahi destinasi menakjubkan ini.";

        if (imgEl) imgEl.src = island && island.headerImage ? island.headerImage : `https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200`;

        const listContainer = document.getElementById('destinations-list');
        if (listContainer) {
            listContainer.innerHTML = '';

            if (destinations) {
                destinations.forEach(dest => {
                    const item = document.createElement('div');
                    item.className = 'relative overflow-hidden bg-brand-cyan/5 border border-brand-cyan/20 p-3 rounded-lg cursor-pointer group flex gap-3 items-center transition-all duration-500 hover:border-brand-cyan hover:shadow-[0_0_15px_rgba(22,198,255,0.3)]';

                    // Background Image Overlay (Hidden by default, shown on Hover/Active)
                    const bgTemplate = `
                        <div class="dest-bg absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                             <div class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style="background-image: url('${dest.image}')"></div>
                             <div class="absolute inset-0 bg-brand-navy/80 backdrop-blur-[2px]"></div>
                        </div>
                    `;

                    item.innerHTML = `
                        ${bgTemplate}
                         <div class="relative z-10 w-16 h-16 rounded-md overflow-hidden shrink-0 border border-brand-cyan/30 transition-colors">
                            <img src="${dest.image}" alt="${dest.name}" class="w-full h-full object-cover">
                        </div>
                        <div class="relative z-10 flex-1">
                            <h4 class="font-bold text-white text-sm group-hover:text-brand-cyan transition-colors drop-shadow-md">${dest.name}</h4>
                            <span class="text-[10px] text-brand-cyan px-2 py-0.5 rounded-full border border-brand-cyan/30 inline-block mt-1 bg-brand-navy/50 backdrop-blur-sm">${dest.type}</span>
                        </div>
                    `;

                    // Click Event for "Selected" state
                    item.addEventListener('click', () => {
                        // Reset all others
                        const allItems = listContainer.querySelectorAll('.dest-bg');
                        allItems.forEach(bg => {
                            bg.classList.remove('opacity-100'); // Remove persistent active state
                            bg.classList.add('opacity-0');      // Return to hidden (hover will naturally take over via CSS)
                        });

                        // Set Active
                        const bg = item.querySelector('.dest-bg');
                        if (bg) {
                            bg.classList.remove('opacity-0');
                            bg.classList.add('opacity-100');
                        }

                        // Show Details Modal
                        this.showDestinationDetail(dest);
                    });

                    listContainer.appendChild(item);
                });
            } else {
                listContainer.innerHTML = '<p class="text-gray-400 text-sm italic">Belum ada data destinasi.</p>';
            }
        }

        this.togglePanel(true);
    }

    showDestinationDetail(dest) {
        const modal = document.getElementById('destination-detail-modal');
        const img = document.getElementById('dest-detail-img');
        const title = document.getElementById('dest-detail-title');
        const type = document.getElementById('dest-detail-type');
        const desc = document.getElementById('dest-detail-desc');
        const price = document.getElementById('dest-detail-price');

        if (!modal) return;

        // Populate Data
        if (img) img.src = dest.image;
        if (title) title.innerText = dest.name;
        if (type) type.innerText = dest.type;

        // Dummy Data Generators (Rich Text)
        const descriptions = [
            "Surga tersembunyi yang menawarkan pemandangan alam spektakuler. Destinasi ini menjadi favorit para traveler yang mencari ketenangan sekaligus petualangan. Dikelilingi oleh keindahan alami yang masih terjaga, tempat ini menawarkan spot foto yang instagramable di setiap sudutnya. Jangan lewatkan kesempatan untuk mencicipi kuliner khas di sekitar area ini yang pastinya menggugah selera.",
            "Salah satu ikon pariwisata Indonesia yang mendunia. Tempat ini menyimpan nilai sejarah dan budaya yang tinggi, berpadu harmonis dengan lanskap modern yang tertata rapi. Ideal untuk liburan keluarga maupun solo traveler yang ingin mengeksplorasi kekayaan nusantara. Waktu terbaik berkunjung adalah saat pagi hari untuk mengejar sunrise yang magis.",
            "Rasakan sensasi petualangan yang berbeda di sini! Dengan kontur alam yang unik dan ekosistem yang beragam, destinasi ini menawarkan pengalaman edukasi sekaligus rekreasi. Sangat cocok bagi pecinta fotografi alam dan mereka yang ingin lari sejenak dari rutinitas perkotaan. Penduduk lokal yang ramah akan menyambut Anda dengan hangat.",
            "Permata tersembunyi di jantung nusantara. Keindahan arsitektur alami dan buatan manusia menyatu menciptakan harmoni visual yang memukau. Destinasi ini sering menjadi lokasi syuting film dan pre-wedding karena suasananya yang romantis dan dramatis. Pastikan baterai kamera Anda penuh karena keindahannya tak habis-habis untuk diabadikan."
        ];
        // Persistent-ish random based on unique char codes of name
        const charSum = dest.name.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
        const descIndex = charSum % descriptions.length;

        if (desc) desc.innerText = descriptions[descIndex];

        const randomPrice = (Math.floor(Math.random() * 50) + 5) * 5000;
        if (price) price.innerText = `Rp ${randomPrice.toLocaleString('id-ID')}`;

        // Show Modal (GSAP Animation)
        modal.classList.remove('hidden');

        // 1. Reset initial states
        gsap.set(modal, { opacity: 0 });
        gsap.set('#dest-modal-content', { scale: 0.5, opacity: 0 });
        gsap.set('#dest-detail-img', { scale: 1.2, opacity: 0 });

        // Target content elements
        const contentElements = [
            '#dest-detail-title',
            '#dest-detail-type', // The container of type & rating
            '#dest-detail-type + span', // Rating span if needed, but the parent div is better or just strict selectors
            '#dest-detail-desc',
            '#dest-modal-content .grid',
            '#dest-modal-content button:not(.absolute)' // Action button
        ];
        // Clean selection of direct children of the content side
        // Let's simpler target by ID or class if possible
        const textElements = document.querySelectorAll('#dest-modal-content h3, #dest-modal-content .flex.items-center, #dest-modal-content p, #dest-modal-content .grid, #dest-modal-content button:not(.absolute)');

        gsap.set(textElements, { y: 20, opacity: 0 });

        // 2. Animate Sequence
        const tl = gsap.timeline();

        tl.to(modal, { duration: 0.3, opacity: 1 })
            .to('#dest-modal-content', { duration: 0.5, scale: 1, opacity: 1, ease: "back.out(1.7)" }, "-=0.1")
            .to('#dest-detail-img', { duration: 0.8, scale: 1, opacity: 1, ease: "power2.out" }, "-=0.3")
            .to(textElements, {
                duration: 0.4,
                y: 0,
                opacity: 1,
                stagger: 0.1,
                ease: "power2.out"
            }, "-=0.4");
    }

    togglePanel(show) {
        if (!this.sidePanel) return;
        if (show) {
            this.sidePanel.classList.remove('translate-x-full');
        } else {
            this.sidePanel.classList.add('translate-x-full');
            // Reset Camera when panel closes
            gsap.to(this.camera.position, { duration: 1.5, x: 0, y: 10, z: 20, onUpdate: () => this.controls.update() });
            gsap.to(this.controls.target, { duration: 1.5, x: 0, y: 0, z: 0 });
        }
    }

    addFloatingRocks() {
        const rockGeometry = new THREE.DodecahedronGeometry(1, 0);

        for (let i = 0; i < 80; i++) {
            const rockMaterial = new THREE.MeshPhongMaterial({
                color: Math.random() > 0.5 ? 0x16C6FF : 0x0A0F1F, // Cyan or Dark Navy
                emissive: 0x16C6FF,
                emissiveIntensity: Math.random() * 0.2, // Subtle glow
                flatShading: true,
                transparent: true,
                opacity: 0.4 + Math.random() * 0.4
            });

            const mesh = new THREE.Mesh(rockGeometry, rockMaterial);

            // Spread around the center
            const radius = 25 + Math.random() * 60;
            const angle = Math.random() * Math.PI * 2;

            // Varied heights but keeping some "horizon" feel
            const yOffset = (Math.random() - 0.5) * 30;

            mesh.position.x = Math.cos(angle) * radius;
            mesh.position.y = yOffset;
            mesh.position.z = Math.sin(angle) * radius; // Mix of front/back

            // Random scale
            const s = Math.random() * 1.5;
            mesh.scale.set(s, s, s);

            // Store rotation speed
            mesh.userData = {
                rotX: (Math.random() - 0.5) * 0.01,
                rotY: (Math.random() - 0.5) * 0.01
            };

            this.scene.add(mesh);
            this.rocks.push(mesh);
        }
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));

        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }
}

window.mapApp = new MapApp();
