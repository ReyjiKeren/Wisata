// Initialize Supabase Client
// REPLACE THESE WITH YOUR ACTUAL SUPABASE URL AND ANON KEY
const SUPABASE_URL = 'https://qfjmcgmjziequxqzfnyv.supabase.co';
const SUPABASE_KEY = 'sb_publishable_w65BEB6MsEiDrFYdYBLaGg_CXCsZZ47';

// Check if Supabase is loaded from CDN
let supabaseClient;

try {
    if (window.supabase) {
        supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    } else {
        console.warn('Supabase SDK not loaded.');
    }
} catch (e) {
    console.error('Error initializing Supabase:', e);
}

// UI Elements
const uiAuthContainer = document.getElementById('auth-container'); // Container for switching
const uiViewLogin = document.getElementById('view-login');
const uiViewRegister = document.getElementById('view-register');
const uiDashboard = document.getElementById('member-dashboard');

const userFullnameDisplay = document.getElementById('user-fullname-display');
const headerAvatarDashboard = document.getElementById('header-avatar-dashboard');
const uiCompleteProfileModal = document.getElementById('complete-profile-modal');
const inputDisplayName = document.getElementById('update-display-name');

const uiAdminDashboard = document.getElementById('admin-dashboard');
const uiAdminMemberList = document.getElementById('admin-member-list');

// Toast Notification Helper
function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return; // Should exist in index.html

    const toast = document.createElement('div');
    // Colors based on type
    const borderColor = type === 'error' ? 'border-red-500/50' : 'border-brand-cyan/50';
    const bgColor = type === 'error' ? 'bg-red-500/10' : 'bg-brand-cyan/10';
    const textColor = type === 'error' ? 'text-red-400' : 'text-brand-cyan';

    toast.className = `pointer-events-auto flex items-center gap-3 px-6 py-4 rounded-xl border ${borderColor} ${bgColor} backdrop-blur-xl shadow-lg transform translate-x-full transition-all duration-500`;
    toast.innerHTML = `
        <div class="w-2 h-2 rounded-full ${type === 'error' ? 'bg-red-500' : 'bg-brand-cyan'} shadow-[0_0_10px_currentColor]"></div>
        <p class="${textColor} font-bold text-sm tracking-wide">${message}</p>
    `;

    container.appendChild(toast);

    // Animate In
    requestAnimationFrame(() => {
        toast.classList.remove('translate-x-full');
    });

    // Remove after 3s
    setTimeout(() => {
        toast.classList.add('translate-x-full', 'opacity-0');
        setTimeout(() => toast.remove(), 500);
    }, 4000);
}

// UI Switching Functions
function showRegister() {
    if (uiViewLogin && uiViewRegister) {
        uiViewLogin.classList.add('hidden');
        uiViewRegister.classList.remove('hidden');
    }
}

function showLogin() {
    if (uiViewLogin && uiViewRegister) {
        uiViewLogin.classList.remove('hidden');
        uiViewRegister.classList.add('hidden');
    }
}

// Auth Functions
async function signUp() {
    if (!supabaseClient) return showToast('Supabase not configured.', 'error');

    // Get values from Register Form
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;

    if (!email || !password || !name) {
        return showToast('Isi Nama, Email, dan Password ya!', 'error');
    }

    showToast('Sedang mendaftarkan...', 'info');

    // SignUp with metadata
    const { data, error } = await supabaseClient.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: name
            }
        }
    });

    if (error) {
        showToast(error.message, 'error');
    } else {
        if (data.session) {
            showToast(`Selamat datang, ${name}! 🎉`, 'info');
            updateUI(data.user);
        } else if (data.user && !data.user.identities?.length) {
            showToast('Email ini sudah terdaftar!', 'error');
        } else {
            showToast('Cek email untuk verifikasi! 📧', 'info');
            showLogin(); // Switch back to login view
        }
    }
}

async function signIn() {
    if (!supabaseClient) return showToast('Supabase not configured.', 'error');

    // Get values from Login Form
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if (!email || !password) {
        return showToast('Email & Password jangan kosong dong!', 'error');
    }

    showToast('Sedang login...', 'info');

    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        showToast(error.message, 'error');
    } else {
        showToast('Berhasil Login! Welcome back! ✨', 'info');
        updateUI(data.user);
    }
}

async function signOut() {
    if (!supabaseClient) return;
    const { error } = await supabaseClient.auth.signOut();
    if (error) showToast('Gagal logout: ' + error.message, 'error');
    else showToast('Berhasil Logout. Sampai jumpa! 👋', 'info');
    updateUI(null);
}

// Header UI Elements
const headerLoginBtn = document.getElementById('header-login-btn');
const headerUserProfile = document.getElementById('header-user-profile');
const headerUsername = document.getElementById('header-username');
const headerAvatar = document.getElementById('header-avatar');
const navMemberLink = document.getElementById('nav-member');


function updateUI(user) {
    // 1. Update Member Section
    if (uiAuthContainer && uiDashboard) {
        if (user) {
            uiAuthContainer.classList.add('hidden');
            uiDashboard.classList.remove('hidden');

            let displayName = user.email.split('@')[0]; // Fallback name
            let isProfileComplete = false;

            // Prioritize CUSTOM display name (persisted), then Google's full_name
            if (user.user_metadata) {
                if (user.user_metadata.custom_display_name) {
                    displayName = user.user_metadata.custom_display_name;
                    isProfileComplete = true;
                } else if (user.user_metadata.full_name) {
                    displayName = user.user_metadata.full_name;
                    // If we rely on Google name, we treat it as incomplete until they save it explicitly
                    // This creates the "custom_display_name" on first save
                    isProfileComplete = false;
                }
            }

            // Check Profile Completeness
            if (!isProfileComplete) {
                if (uiCompleteProfileModal) uiCompleteProfileModal.classList.remove('hidden');
            } else {
                if (uiCompleteProfileModal) uiCompleteProfileModal.classList.add('hidden');
            }
            if (userFullnameDisplay) userFullnameDisplay.innerText = displayName;

            const greeting = document.querySelector('#member-dashboard h2');
            // greeting.innerText = `Halo, ${displayName}! 🌏`; // Keep static greeting as per user design preference


            // Update Header Profile & Dashboard Avatar
            let avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=16C6FF&color=0A0F1F`;

            // Prioritize CUSTOM avatar, then Google's avatar
            if (user.user_metadata?.custom_avatar_url) {
                avatarUrl = user.user_metadata.custom_avatar_url;
            } else if (user.user_metadata?.avatar_url) {
                avatarUrl = user.user_metadata.avatar_url;
            }

            if (headerUsername) headerUsername.innerText = displayName;
            if (headerAvatar) headerAvatar.src = avatarUrl;
            if (headerAvatarDashboard) headerAvatarDashboard.src = avatarUrl;

            // Load & render wishlist from metadata
            const wishlist = user.user_metadata?.wishlist || [];
            renderWishlist(wishlist);

        } else {
            uiAuthContainer.classList.remove('hidden');
            uiDashboard.classList.add('hidden');
            showLogin();
        }
    }

    // 2. Update Header Auth Section
    if (headerLoginBtn && headerUserProfile) {
        if (user) {
            headerLoginBtn.classList.add('hidden');
            headerUserProfile.classList.remove('hidden');
        } else {
            headerLoginBtn.classList.remove('hidden');
            headerUserProfile.classList.add('hidden');
        }
    }

    // 3. Update Nav Menu
    if (navMemberLink) {
        if (user) {
            navMemberLink.classList.remove('hidden');
        } else {
            navMemberLink.classList.add('hidden');
        }
    }

    // 4. Admin Panel Visibility (STRICT)
    if (uiAdminDashboard) {
        const adminEmail = 'reywrnayktm@gmail.com';
        const adminUID = 'a05ff000-7994-41c1-bf12-d4f7d2cfb0c7';

        const isAdmin = user && (user.email === adminEmail || user.id === adminUID);

        if (isAdmin) {
            uiAdminDashboard.classList.remove('hidden');
            fetchMembers(); // Auto fetch for admin
        } else {
            uiAdminDashboard.classList.add('hidden');
        }
    }
}

// Listen to Auth State Changes
if (supabaseClient) {
    supabaseClient.auth.onAuthStateChange((event, session) => {
        updateUI(session?.user ?? null);

        // Show success notification only on fresh login if profile is already complete
        if (event === 'SIGNED_IN' && session?.user?.user_metadata?.custom_display_name) {
            showToast('Anda berhasil masuk! 🎉', 'info');
        }
    });
}

// Google Login
async function signInWithGoogle() {
    if (!supabaseClient) return showToast('Supabase not configured.', 'error');

    showToast('Mengarahkan ke Google...', 'info');

    const { data, error } = await supabaseClient.auth.signInWithOAuth({
        provider: 'google',
        options: {
            // Callback ke link di mana user menekan tombol (menghindari duplikasi hash)
            redirectTo: window.location.href.split('#')[0]
        }
    });

    if (error) {
        showToast(error.message, 'error');
    }
}

// Wishlist Logic
async function addToWishlist() {
    if (!supabaseClient) return showToast('Supabase not configured.', 'error');

    // Check session securely
    const { data: { session } } = await supabaseClient.auth.getSession();
    if (!session || !session.user) {
        showToast('Silakan Login atau Daftar dulu ya untuk simpan! 😊', 'error');
        // Optionally redirect to login
        if (uiAuthContainer && uiDashboard) {
            uiAuthContainer.classList.remove('hidden');
            uiDashboard.classList.add('hidden');

            // Assume member section exists in DOM, trigger its view if it was hidden
            const memberPanel = document.getElementById('member-section');
            if (memberPanel) {
                memberPanel.classList.remove('translate-y-full');
            }
            showLogin();
        }
        return;
    }

    const titleEl = document.getElementById('dest-detail-title');
    const imgEl = document.getElementById('dest-detail-img');

    if (!titleEl) return;
    const destName = titleEl.innerText;
    // Gunakan fallback gambar estetik jika img tidak tersedia
    const destImage = imgEl ? imgEl.src : 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=400&auto=format&fit=crop';

    showToast('Menyimpan ke Wishlist...', 'info');

    // Current wishlist array
    const currentList = session.user.user_metadata?.wishlist || [];

    // Anti-duplicate check (mendukung string klasik atau object baru)
    if (currentList.some(item => (typeof item === 'string' ? item : item.name) === destName)) {
        return showToast(`Oops, ${destName} sudah ada di Wishlist kamu! ✌️`, 'info');
    }

    // Append Destination (Sekarang menyimpan Object untuk UI lebih kaya)
    const newItem = { name: destName, image: destImage };
    const newList = [...currentList, newItem];

    // Update User Metadata in DB
    const { data, error } = await supabaseClient.auth.updateUser({
        data: { wishlist: newList }
    });

    if (error) {
        showToast(error.message, 'error');
    } else {
        showToast(`${destName} berhasil ditambahkan ke Wishlist! 💖`, 'info');
        renderWishlist(newList);
    }
}

function renderWishlist(list) {
    const section = document.getElementById('wishlist-section');
    const container = document.getElementById('wishlist-container');
    const countBadge = document.getElementById('wishlist-count');

    // Sync dashboard numbers
    if (countBadge) countBadge.innerText = list.length;

    if (!section || !container) return;

    if (list.length === 0) {
        section.classList.add('hidden');
        container.innerHTML = '';
        return;
    }

    // Visually un-hide the UI section and render array into elements
    section.classList.remove('hidden');
    container.innerHTML = list.map(item => {
        const itemName = typeof item === 'string' ? item : item.name;
        // Gunakan gambar background jika ada, jika tidak pasang fallback yang cantik
        const itemImg = typeof item === 'string' || !item.image ? 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=400&auto=format&fit=crop' : item.image;

        return `
            <div class="relative shrink-0 w-60 h-36 rounded-xl overflow-hidden group border border-brand-cyan/30 hover:border-brand-cyan hover:shadow-[0_0_20px_rgba(22,198,255,0.4)] transition-all cursor-pointer shadow-lg bg-brand-navy">
                <img src="${itemImg}" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="${itemName}">
                <div class="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/60 to-brand-navy/10 z-10 transition-opacity group-hover:opacity-90"></div>
                <div class="absolute bottom-4 left-4 right-4 z-20 transform group-hover:-translate-y-1 transition-transform">
                    <h4 class="text-white font-bold text-base truncate drop-shadow-md" title="${itemName}">${itemName}</h4>
                    <div class="flex items-center gap-1.5 mt-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                        <svg class="w-4 h-4 text-red-500 animate-pulse" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" /></svg>
                        <span class="text-[10px] text-brand-cyan font-bold tracking-widest uppercase drop-shadow-md">Tersimpan</span>
                    </div>
                </div>
                <!-- Tombol Hapus Wishlist -->
                <button onclick="event.stopPropagation(); window.authParams.removeWishlist('${itemName.replace(/'/g, "\\'")}')" 
                    title="Hapus dari wishlist"
                    class="absolute top-2 right-2 z-30 opacity-0 group-hover:opacity-100 p-2 bg-red-500/80 hover:bg-red-500 rounded-full text-white backdrop-blur-md transition-all shadow-lg transform -translate-y-2 group-hover:translate-y-0">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
        `;
    }).join('');
}

// Fungsi Hapus Wishlist
async function removeWishlist(itemName) {
    if (!supabaseClient) return;
    const { data: { session } } = await supabaseClient.auth.getSession();
    if (!session || !session.user) return;

    showToast(`Menghapus ${itemName}...`, 'info');

    const currentList = session.user.user_metadata?.wishlist || [];
    // Filter out both string formats and object formats
    const newList = currentList.filter(item => (typeof item === 'string' ? item : item.name) !== itemName);

    const { data, error } = await supabaseClient.auth.updateUser({
        data: { wishlist: newList }
    });

    if (error) {
        showToast(error.message, 'error');
    } else {
        showToast(`${itemName} dihapus dari Wishlist! 🗑️`, 'info');
        renderWishlist(newList);
    }
}

// Expose functions globally for HTML buttons
window.authParams = {
    signUp,
    signIn,
    signOut,
    showRegister,
    showLogin,
    signInWithGoogle,
    updateProfileName,
    showEditProfile,
    uploadAvatar,
    fetchMembers,
    addToWishlist,
    renderWishlist,
    removeWishlist
};

async function fetchMembers() {
    if (!supabaseClient || !uiAdminMemberList) return;

    uiAdminMemberList.innerHTML = '<tr><td colspan="4" class="p-4 text-center">Loading...</td></tr>';

    // Fetch from 'profiles' table
    const { data: profiles, error } = await supabaseClient
        .from('profiles')
        .select('*');

    if (error) {
        uiAdminMemberList.innerHTML = `<tr><td colspan="4" class="p-4 text-center text-red-400">
            Gagal load data. <br>
            <span class="text-xs text-gray-500">Error: ${error.message} (Anda perlu buat tabel 'profiles' dulu)</span>
        </td></tr>`;
        return;
    }

    if (!profiles || profiles.length === 0) {
        uiAdminMemberList.innerHTML = '<tr><td colspan="4" class="p-4 text-center">Belum ada data member.</td></tr>';
        return;
    }

    uiAdminMemberList.innerHTML = profiles.map(p => `
        <tr class="border-b border-white/5 hover:bg-white/5 transition-colors">
            <td class="p-4">
                <div class="flex items-center gap-3">
                    <img src="${p.avatar_url || `https://ui-avatars.com/api/?name=${p.full_name}&background=random`}" class="w-8 h-8 rounded-full border border-brand-cyan/30 object-cover">
                    <span class="font-bold text-white">${p.full_name || 'No Name'}</span>
                </div>
            </td>
            <td class="p-4 font-mono text-xs opacity-70">${p.email || 'Hidden'}</td>
            <td class="p-4 text-center text-xs opacity-50">${p.updated_at ? new Date(p.updated_at).toLocaleDateString() : '-'}</td>
            <td class="p-4 text-right">
                <button class="text-red-400 hover:text-red-300 transition-colors text-xs border border-red-500/30 px-2 py-1 rounded" onclick="window.authParams.deleteMemberMock()">
                    Delete
                </button>
            </td>
        </tr>
    `).join('');
}

// Mock Delete function
window.authParams.deleteMemberMock = () => showToast('Hapus user butuh akses server-side (Service Role)!', 'error');

// Upload Avatar
async function uploadAvatar(file) {
    if (!file) return;
    if (!file.type.startsWith('image/')) return showToast('File harus gambar!', 'error');
    if (file.size > 2 * 1024 * 1024) return showToast('Ukuran max 2MB!', 'error');

    showToast('Mengupload foto...', 'info');

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    // Upload to Supabase Storage
    const { data, error } = await supabaseClient.storage
        .from('avatars') // Ensure 'avatars' bucket exists in Supabase
        .upload(filePath, file);

    if (error) {
        showToast('Gagal upload (Pastikan bucket "avatars" ada & publik): ' + error.message, 'error');
        return;
    }

    // Get Public URL
    const { data: publicUrlData } = supabaseClient.storage
        .from('avatars')
        .getPublicUrl(filePath);

    const publicAvatarUrl = publicUrlData.publicUrl;

    // Update User Metadata (Use custom key to avoid OAuth overwrite)
    const { error: updateError } = await supabaseClient.auth.updateUser({
        data: { custom_avatar_url: publicAvatarUrl }
    });

    if (updateError) {
        showToast('Gagal update profil: ' + updateError.message, 'error');
    } else {
        showToast('Foto profil berhasil diupdate! 🎉', 'info');
        // Manually update UI images immediately for better UX
        if (headerAvatar) headerAvatar.src = publicAvatarUrl;
        if (headerAvatarDashboard) headerAvatarDashboard.src = publicAvatarUrl;
    }
}

function showEditProfile() {
    if (uiCompleteProfileModal) {
        uiCompleteProfileModal.classList.remove('hidden');
        // Pre-fill current name
        if (inputDisplayName && userFullnameDisplay) {
            inputDisplayName.value = userFullnameDisplay.innerText;
        }
    }
}

// Update Profile Name
async function updateProfileName() {
    if (!supabaseClient) return;
    const newName = inputDisplayName.value.trim();

    if (!newName) {
        return showToast('Isi nama dulu dong! 😅', 'error');
    }

    showToast('Menyimpan profil...', 'info');

    const { data, error } = await supabaseClient.auth.updateUser({
        data: { custom_display_name: newName }
    });

    if (error) {
        showToast(error.message, 'error');
    } else {
        // Success
        if (uiCompleteProfileModal) uiCompleteProfileModal.classList.add('hidden');
        showToast('Info profil berhasil disimpan!', 'info');
        showToast('Anda berhasil masuk! 🎉', 'info');
        updateUI(data.user);
    }
}
