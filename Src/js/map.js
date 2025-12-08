// Imports removed for global script usage

const ISLANDS_DATA = [
    {
        "id": "sumatra",
        "name": "Sumatra",
        "color": "#16C6FF",
        "description": "Wilayah barat liar Indonesia, rumah bagi orangutan, gunung berapi, dan danau supervolcan Toba yang masif.",
        "headerImage": "https://images.unsplash.com/photo-1549723528-662580644026?q=80&w=1200"
    },
    {
        "id": "java",
        "name": "Jawa",
        "color": "#16C6FF",
        "description": "Jantung nusantara, ramai dengan budaya, sejarah, candi kuno seperti Borobudur, dan kota-kota modern.",
        "headerImage": "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?q=80&w=1200"
    },
    {
        "id": "kalimantan",
        "name": "Kalimantan",
        "color": "#16C6FF",
        "description": "Hutan hujan kuno, satwa liar beragam termasuk orangutan, dan petualangan sungai yang menakjubkan.",
        "headerImage": "https://images.unsplash.com/photo-1516466723877-e462d73004e9?q=80&w=1200"
    },
    {
        "id": "sulawesi",
        "name": "Sulawesi",
        "color": "#16C6FF",
        "description": "Pulau berbentuk K yang unik, terkenal dengan kekayaan laut, tempat menyelam, dan budaya dataran tinggi.",
        "headerImage": "https://images.unsplash.com/photo-1579758554271-e03d420c242e?q=80&w=1200"
    },
    {
        "id": "bali",
        "name": "Bali",
        "color": "#FFC616",
        "description": "Pulau Dewata, terkenal di dunia karena pantai, pura, kehidupan malam, dan keseniannya.",
        "headerImage": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1200"
    },
    {
        "id": "lombok", // Mapping NTB to Lombok for simplicity in this demo context
        "name": "Nusa Tenggara",
        "color": "#16C6FF",
        "description": "Tetangga Bali yang lebih tenang, dikenal dengan Gunung Rinjani, air terjun, dan Kepulauan Gili.",
        "headerImage": "https://images.unsplash.com/photo-1590483864551-7667a996dc03?q=80&w=1200"
    },
    {
        "id": "flores", // Part of NTT 
        "name": "Flores (NTT)",
        "color": "#16C6FF",
        "description": "Rumah bagi danau tiga warna Kelimutu dan gerbang menuju Taman Nasional Komodo.",
        "headerImage": "https://images.unsplash.com/photo-1540101666614-23956cb56e29?q=80&w=1200"
    },
    {
        "id": "maluku",
        "name": "Maluku",
        "color": "#16C6FF",
        "description": "Kepulauan Rempah-rempah yang bersejarah dengan pantai perawan dan lokasi menyelam.",
        "headerImage": "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?q=80&w=1200"
    },
    {
        "id": "papua",
        "name": "Papua",
        "color": "#16C6FF",
        "description": "Perbatasan paling timur dengan alam yang belum terjamah, burung cendrawasih, dan kekayaan budaya suku.",
        "headerImage": "https://images.unsplash.com/photo-1579758554271-e03d420c242e?q=80&w=1200"
    }
];

const DESTINATIONS_DATA = {
    "sumatra": [
        { "name": "Danau Toba", "type": "Alam", "image": "https://images.unsplash.com/photo-1549723528-662580644026?q=80&w=600" },
        { "name": "Bukit Lawang", "type": "Satwa", "image": "https://images.unsplash.com/photo-1563851086-5389e6eb7bc2?q=80&w=600" },
        { "name": "Kepulauan Mentawai", "type": "Selancar", "image": "https://images.unsplash.com/photo-1590483864551-7667a996dc03?q=80&w=600" },
        { "name": "Ngarai Sianok", "type": "Alam", "image": "https://images.unsplash.com/photo-1628169128038-f9e0b8782cc9?q=80&w=600" },
        { "name": "Palembang", "type": "Kota", "image": "https://images.unsplash.com/photo-1627301078759-4d6d629f6202?q=80&w=600" }
    ],
    "java": [
        { "name": "Candi Borobudur", "type": "Budaya", "image": "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?q=80&w=600" },
        { "name": "Gunung Bromo", "type": "Petualangan", "image": "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?q=80&w=600" },
        { "name": "Yogyakarta", "type": "Kota", "image": "https://images.unsplash.com/photo-1584346133934-a3afd2a1d44f?q=80&w=600" },
        { "name": "Kawah Ijen", "type": "Alam", "image": "https://images.unsplash.com/photo-1510497539054-d83d1c93a0b1?q=80&w=600" },
        { "name": "Candi Prambanan", "type": "Budaya", "image": "https://images.unsplash.com/photo-1604812674849-c454e4c27a94?q=80&w=600" }
    ],
    "kalimantan": [
        { "name": "Tanjung Puting", "type": "Satwa", "image": "https://images.unsplash.com/photo-1516466723877-e462d73004e9?q=80&w=600" },
        { "name": "Kepulauan Derawan", "type": "Bahari", "image": "https://images.unsplash.com/photo-1621251347648-692795f3366c?q=80&w=600" },
        { "name": "Pasar Terapung", "type": "Budaya", "image": "https://images.unsplash.com/photo-1616576856000-dc08eb675c2e?q=80&w=600" },
        { "name": "Pulau Kakaban", "type": "Alam", "image": "https://images.unsplash.com/photo-1596423985799-282672ea4c94?q=80&w=600" }
    ],
    "sulawesi": [
        { "name": "Tana Toraja", "type": "Budaya", "image": "https://images.unsplash.com/photo-1579758554271-e03d420c242e?q=80&w=600" },
        { "name": "Taman Laut Bunaken", "type": "Menyelam", "image": "https://images.unsplash.com/photo-1596767351648-5c4d372e9d28?q=80&w=600" },
        { "name": "Wakatobi", "type": "Alam", "image": "https://images.unsplash.com/photo-1563278853-c97728fd3323?q=80&w=600" },
        { "name": "Kepulauan Togean", "type": "Bahari", "image": "https://images.unsplash.com/photo-1548231908-410a300c3b01?q=80&w=600" }
    ],
    "bali": [
        { "name": "Ubud", "type": "Budaya", "image": "https://images.unsplash.com/photo-1558253109-17d47225110d?q=80&w=600" },
        { "name": "Uluwatu", "type": "Pantai", "image": "https://images.unsplash.com/photo-1596811466031-155708849b28?q=80&w=600" },
        { "name": "Nusa Penida", "type": "Pulau", "image": "https://images.unsplash.com/photo-1532053150005-4c07a3c31671?q=80&w=600" },
        { "name": "Seminyak", "type": "Gaya Hidup", "image": "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=600" },
        { "name": "Tanah Lot", "type": "Pura", "image": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=600" }
    ],
    "lombok": [
        { "name": "Gunung Rinjani", "type": "Petualangan", "image": "https://images.unsplash.com/photo-1590483864551-7667a996dc03?q=80&w=600" },
        { "name": "Gili Trawangan", "type": "Pesta", "image": "https://images.unsplash.com/photo-1573790387438-4da905039392?q=80&w=600" },
        { "name": "Pantai Pink", "type": "Alam", "image": "https://images.unsplash.com/photo-1628169128038-f9e0b8782cc9?q=80&w=600" },
        { "name": "Desa Sade", "type": "Budaya", "image": "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?q=80&w=600" }
    ],
    "flores": [
        { "name": "Taman Nasional Komodo", "type": "Satwa", "image": "https://images.unsplash.com/photo-1540101666614-23956cb56e29?q=80&w=600" },
        { "name": "Danau Kelimutu", "type": "Alam", "image": "https://images.unsplash.com/photo-1516466723877-e462d73004e9?q=80&w=600" },
        { "name": "Labuan Bajo", "type": "Gerbang", "image": "https://images.unsplash.com/photo-1596811466031-155708849b28?q=80&w=600" },
        { "name": "Wae Rebo", "type": "Budaya", "image": "https://images.unsplash.com/photo-1548231908-410a300c3b01?q=80&w=600" }
    ],
    "maluku": [
        { "name": "Banda Neira", "type": "Sejarah", "image": "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?q=80&w=600" },
        { "name": "Pantai Ora", "type": "Alam", "image": "https://images.unsplash.com/photo-1621251347648-692795f3366c?q=80&w=600" },
        { "name": "Kepulauan Kei", "type": "Pantai", "image": "https://images.unsplash.com/photo-1532053150005-4c07a3c31671?q=80&w=600" }
    ],
    "papua": [
        { "name": "Raja Ampat", "type": "Menyelam", "image": "https://images.unsplash.com/photo-1510497539054-d83d1c93a0b1?q=80&w=600" },
        { "name": "Lembah Baliem", "type": "Budaya", "image": "https://images.unsplash.com/photo-1579758554271-e03d420c242e?q=80&w=600" },
        { "name": "Teluk Cendrawasih", "type": "Alam", "image": "https://images.unsplash.com/photo-1563278853-c97728fd3323?q=80&w=600" },
        { "name": "Jayapura", "type": "Kota", "image": "https://images.unsplash.com/photo-1627301078759-4d6d629f6202?q=80&w=600" }
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
        this.camera.lookAt(0, 0, 0);

        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.container.appendChild(this.renderer.domElement);

        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.minDistance = 5;
        this.controls.maxDistance = 150;
        this.controls.maxPolarAngle = Math.PI / 2 - 0.1;

        // Initial Camera Fit
        this.adjustCameraPosition();

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

    adjustCameraPosition() {
        // Heuristic: Fit ~55 units width into view
        const targetWidth = 55;
        const aspect = window.innerWidth / window.innerHeight;

        // Calculate needed Distance to fit width
        // Use THREE.MathUtils instead of THREE.Math for compatibility
        const vFOV = THREE.MathUtils.degToRad(this.camera.fov);
        let dist = targetWidth / (2 * Math.tan(vFOV / 2) * aspect);

        // Clamp distance
        dist = Math.max(20, Math.min(dist, 140));

        if (isFinite(dist)) {
            this.camera.position.set(0, 10, dist);
            if (this.controls) {
                this.controls.maxDistance = dist * 1.5;
                this.controls.update();
            }
        }
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
    }

    async loadGeoJSON() {
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'fixed inset-0 flex items-center justify-center bg-brand-navy z-[60] text-brand-cyan font-bold text-xl';
        loadingDiv.innerText = 'MEMUAT PETA...';
        document.body.appendChild(loadingDiv);

        try {
            const response = await fetch('https://raw.githubusercontent.com/superpikar/indonesia-geojson/master/indonesia-province-simple.json');
            const data = await response.json();

            this.generateMapFromGeoJSON(data);

            // Add sea plane after map to handle render order
            const planeGeometry = new THREE.PlaneGeometry(200, 100);
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

    generateMapFromGeoJSON(geojson) {
        // Center the map projection
        const projection = d3.geoMercator()
            .center([118, -2]) // Center of Indonesia (approx)
            .scale(35)         // Scale reduced for appropriate 3D world size
            .translate([0, 0]);

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

        if (up.includes("SUMATERA") || up.includes("ACEH") || up.includes("RIAU") || up.includes("JAMBI") || up.includes("LAMPUNG") || up.includes("BENGKULU") || up.includes("BANGKA")) return "sumatra";
        if (up.includes("JAWA") || up.includes("YOGYAKARTA") || up.includes("DKI") || up.includes("BANTEN")) return "java";
        if (up.includes("KALIMANTAN")) return "kalimantan";
        if (up.includes("SULAWESI") || up.includes("GORONTALO")) return "sulawesi";
        if (up.includes("BALI")) return "bali";
        if (up.includes("NUSA TENGGARA BARAT")) return "lombok";
        if (up.includes("NUSA TENGGARA TIMUR")) return "flores";
        if (up.includes("MALUKU")) return "maluku";
        if (up.includes("PAPUA")) return "papua";

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
        // Calculate mouse position for click event specifically
        const mouse = new THREE.Vector2();
        // Use changedTouches if available (touch event), else clientX/Y
        const clientX = event.changedTouches ? event.changedTouches[0].clientX : event.clientX;
        const clientY = event.changedTouches ? event.changedTouches[0].clientY : event.clientY;

        mouse.x = (clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(clientY / window.innerHeight) * 2 + 1;

        // Perform Raycast
        this.raycaster.setFromCamera(mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.objects);

        if (intersects.length > 0) {
            const object = intersects[0].object;
            const data = object.userData;

            // Only open panel if we have data for this region
            if (data.id && data.id !== "other") {
                this.openPanel(data.id, data.name);

                // --- ZOOM TO ISLAND LOGIC ---
                const mesh = object;

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
                    item.className = 'bg-brand-cyan/5 border border-brand-cyan/20 p-3 rounded-lg hover:bg-brand-cyan/10 transition-colors cursor-pointer group flex gap-3 items-center';
                    item.innerHTML = `
                         <div class="w-16 h-16 rounded-md overflow-hidden shrink-0 border border-brand-cyan/30">
                            <img src="${dest.image}" alt="${dest.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                        </div>
                        <div class="flex-1">
                            <h4 class="font-bold text-white text-sm group-hover:text-brand-cyan transition-colors">${dest.name}</h4>
                            <span class="text-[10px] text-brand-cyan px-2 py-0.5 rounded-full border border-brand-cyan/30 inline-block mt-1">${dest.type}</span>
                        </div>
                    `;
                    listContainer.appendChild(item);
                });
            } else {
                listContainer.innerHTML = '<p class="text-gray-400 text-sm italic">Belum ada data destinasi.</p>';
            }
        }

        this.togglePanel(true);
    }

    togglePanel(show) {
        if (!this.sidePanel) return;
        if (show) {
            this.sidePanel.classList.remove('translate-x-full');
        } else {
            this.sidePanel.classList.add('translate-x-full');
        }
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.adjustCameraPosition();
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));

        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }
}

new MapApp();
