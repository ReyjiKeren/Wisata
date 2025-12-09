// Initialize Supabase Client
// REPLACE THESE WITH YOUR ACTUAL SUPABASE URL AND ANON KEY
const SUPABASE_URL = 'https://qfjmcgmjziequxqzfnyv.supabase.co';
const SUPABASE_KEY = 'sb_publishable_w65BEB6MsEiDrFYdYBLaGg_CXCsZZ47';

// Check if Supabase is loaded from CDN
let supabase;

try {
    if (window.supabase) {
        supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
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
    if (!supabase) return showToast('Supabase not configured.', 'error');

    // Get values from Register Form
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;

    if (!email || !password || !name) {
        return showToast('Isi Nama, Email, dan Password ya!', 'error');
    }

    showToast('Sedang mendaftarkan...', 'info');

    // SignUp with metadata
    const { data, error } = await supabase.auth.signUp({
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
    if (!supabase) return showToast('Supabase not configured.', 'error');

    // Get values from Login Form
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if (!email || !password) {
        return showToast('Email & Password jangan kosong dong!', 'error');
    }

    showToast('Sedang login...', 'info');

    const { data, error } = await supabase.auth.signInWithPassword({
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
    if (!supabase) return;
    const { error } = await supabase.auth.signOut();
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
if (supabase) {
    supabase.auth.onAuthStateChange((event, session) => {
        updateUI(session?.user ?? null);

        // Show success notification only on fresh login if profile is already complete
        if (event === 'SIGNED_IN' && session?.user?.user_metadata?.custom_display_name) {
            showToast('Anda berhasil masuk! 🎉', 'info');
        }
    });
}

// Google Login
async function signInWithGoogle() {
    if (!supabase) return showToast('Supabase not configured.', 'error');

    showToast('Mengarahkan ke Google...', 'info');

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: window.location.href.split('#')[0]
        }
    });

    if (error) {
        showToast(error.message, 'error');
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
    fetchMembers
};

async function fetchMembers() {
    if (!supabase || !uiAdminMemberList) return;

    uiAdminMemberList.innerHTML = '<tr><td colspan="4" class="p-4 text-center">Loading...</td></tr>';

    // Fetch from 'profiles' table
    const { data: profiles, error } = await supabase
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
    const { data, error } = await supabase.storage
        .from('avatars') // Ensure 'avatars' bucket exists in Supabase
        .upload(filePath, file);

    if (error) {
        showToast('Gagal upload (Pastikan bucket "avatars" ada & publik): ' + error.message, 'error');
        return;
    }

    // Get Public URL
    const { data: publicUrlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

    const publicAvatarUrl = publicUrlData.publicUrl;

    // Update User Metadata (Use custom key to avoid OAuth overwrite)
    const { error: updateError } = await supabase.auth.updateUser({
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
    if (!supabase) return;
    const newName = inputDisplayName.value.trim();

    if (!newName) {
        return showToast('Isi nama dulu dong! 😅', 'error');
    }

    showToast('Menyimpan profil...', 'info');

    const { data, error } = await supabase.auth.updateUser({
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
