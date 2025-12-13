class NusaBot {
    constructor() {
        this.isOpen = false;
        this.chatHistory = document.getElementById('chat-history');
        this.chatInput = document.getElementById('chat-input');
        this.chatWindow = document.getElementById('chat-window');
        this.sendBtn = document.getElementById('chat-send-btn');
        this.loginOverlay = document.getElementById('chat-login-overlay');

        // Knowledge Base (Simplified from destinations.json for basic matching)
        this.destinations = {
            'pantai': ['Uluwatu (Bali)', 'Pink Beach (Lombok)', 'Ora Beach (Maluku)', 'Kei Islands (Maluku)', 'Nusa Penida (Bali)'],
            'gunung': ['Mount Bromo (Java)', 'Mount Rinjani (Lombok)', 'Kawah Ijen (Java)'],
            'budaya': ['Borobudur Temple (Java)', 'Prambanan (Java)', 'Tana Toraja (Sulawesi)', 'Sade Village (Lombok)', 'Ubud (Bali)'],
            'kota': ['Yogyakarta (Java)', 'Palembang (Sumatra)', 'Jayapura (Papua)', 'Seminyak (Bali)'],
            'wildlife': ['Komodo National Park (Flores)', 'Tanjung Puting (Kalimantan)', 'Bukit Lawang (Sumatra)'],
            'diving': ['Raja Ampat (Papua)', 'Bunaken Marine Park (Sulawesi)', 'Wakatobi (Sulawesi)']
        };

        this.init();
    }

    init() {
        // Event Listeners
        if (this.sendBtn) this.sendBtn.addEventListener('click', () => this.handleUserMessage());

        if (this.chatInput) {
            this.chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.handleUserMessage();
            });
        }

        // Expose toggle globally
        window.toggleChat = () => this.toggle();

        // Check Auth State Initially
        this.checkAuthState();

        // Listen to Supabase Auth Changes if available
        if (window.supabase) {
            window.supabase.auth.onAuthStateChange((event, session) => {
                this.updateAuthState(session?.user);
            });
        }
    }

    async checkAuthState() {
        if (window.supabase) {
            const { data: { session } } = await window.supabase.auth.getSession();
            this.updateAuthState(session?.user);
        }
    }

    updateAuthState(user) {
        if (user) {
            // Logged In
            if (this.loginOverlay) this.loginOverlay.classList.add('hidden');
            if (this.chatInput) this.chatInput.disabled = false;
            // Welcome message if history empty
            if (this.chatHistory && this.chatHistory.children.length === 0) {
                this.addBotMessage(`Halo ${user.user_metadata?.custom_display_name || 'Traveler'}! 👋\nAda yang bisa Nusabot bantu? Mau cari pantai, gunung, atau budaya?`);
            }
        } else {
            // Logged Out
            if (this.loginOverlay) this.loginOverlay.classList.remove('hidden');
            if (this.chatInput) this.chatInput.disabled = true;
        }
    }

    toggle() {
        this.isOpen = !this.isOpen;
        if (this.chatWindow) {
            if (this.isOpen) {
                this.chatWindow.classList.remove('hidden', 'scale-95', 'opacity-0');
                this.chatWindow.classList.add('scale-100', 'opacity-100');
                // Scroll to bottom
                if (this.chatHistory) this.chatHistory.scrollTop = this.chatHistory.scrollHeight;
            } else {
                this.chatWindow.classList.add('hidden', 'scale-95', 'opacity-0');
                this.chatWindow.classList.remove('scale-100', 'opacity-100');
            }
        }
    }

    handleUserMessage() {
        const text = this.chatInput.value.trim();
        if (!text) return;

        // User Message
        this.addUserMessage(text);
        this.chatInput.value = '';

        // Bot Thinking (Fake Delay)
        this.addTypingIndicator();

        setTimeout(() => {
            this.removeTypingIndicator();
            this.generateResponse(text.toLowerCase());
        }, 1000);
    }

    generateResponse(input) {
        let response = "";

        // Simple Rule Model
        if (input.includes('hallo') || input.includes('halo') || input.includes('hai')) {
            response = "Halo juga! Siap menjelajah Indonesia? 🗺️";
        } else if (input.includes('siapa kamu') || input.includes('bot')) {
            response = "Saya Nusabot, asisten virtual ExploreNusantara! Tugas saya bantu kamu cari tempat liburan seru. 🤖";
        } else if (input.includes('pantai') || input.includes('laut')) {
            response = this.recommend('pantai', "Untuk pecinta air, ini nih pantai terbaik:");
        } else if (input.includes('gunung') || input.includes('mendaki')) {
            response = this.recommend('gunung', "Suka ketinggian? Coba taklukkan ini:");
        } else if (input.includes('budaya') || input.includes('sejarah') || input.includes('candi')) {
            response = this.recommend('budaya', "Indonesia kaya budaya! Ini rekomendasinya:");
        } else if (input.includes('kota') || input.includes('belanja')) {
            response = this.recommend('kota', "Mau city tour? Ke sini aja:");
        } else if (input.includes('hewan') || input.includes('satwa') || input.includes('alam')) {
            response = this.recommend('wildlife', "Mau lihat satwa langka? Cek tempat ini:");
        } else if (input.includes('seni') || input.includes('tari') || input.includes('wayang')) {
            response = "Wah, kamu suka seni ya! Cek bagian 'Warisan Budaya' di halaman utama kita untuk info Wayang, Batik, dan lainnya! 🎭";
        } else {
            response = "Maaf, Nusabot belum mengerti itu. 😅\n\nCoba tanya tentang:\n- Pantai 🏖️\n- Gunung ⛰️\n- Budaya 🏛️";
        }

        this.addBotMessage(response);
    }

    recommend(category, prefix) {
        const items = this.destinations[category];
        const randomItems = items.sort(() => 0.5 - Math.random()).slice(0, 3); // Pick 3 random
        return `${prefix}\n\n${randomItems.map(i => `• ${i}`).join('\n')}`;
    }

    addUserMessage(text) {
        const div = document.createElement('div');
        div.className = 'flex justify-end mb-4';
        div.innerHTML = `<div class="bg-brand-cyan text-brand-navy px-4 py-2 rounded-l-xl rounded-tr-xl max-w-[80%] text-sm font-medium shadow-md">${text}</div>`;
        this.chatHistory.appendChild(div);
        this.chatHistory.scrollTop = this.chatHistory.scrollHeight;
    }

    addBotMessage(text) {
        const div = document.createElement('div');
        div.className = 'flex justify-start mb-4';
        // Convert \n to <br> for HTML display
        const formattedText = text.replace(/\n/g, '<br>');
        div.innerHTML = `
            <div class="w-8 h-8 rounded-full bg-brand-navy border border-brand-cyan/50 flex items-center justify-center mr-2 shrink-0">
                <span class="text-xs">🤖</span>
            </div>
            <div class="bg-white/10 text-white border border-white/5 px-4 py-2 rounded-r-xl rounded-tl-xl max-w-[80%] text-sm leading-relaxed shadow-sm">
                ${formattedText}
            </div>
        `;
        this.chatHistory.appendChild(div);
        this.chatHistory.scrollTop = this.chatHistory.scrollHeight;
    }

    addTypingIndicator() {
        const div = document.createElement('div');
        div.id = 'typing-indicator';
        div.className = 'flex justify-start mb-4';
        div.innerHTML = `
            <div class="w-8 h-8 rounded-full bg-brand-navy border border-brand-cyan/50 flex items-center justify-center mr-2 shrink-0">
                <span class="text-xs">🤖</span>
            </div>
            <div class="bg-white/10 px-4 py-3 rounded-r-xl rounded-tl-xl flex gap-1 items-center">
                <div class="w-2 h-2 bg-brand-cyan/50 rounded-full animate-bounce"></div>
                <div class="w-2 h-2 bg-brand-cyan/50 rounded-full animate-bounce delay-75"></div>
                <div class="w-2 h-2 bg-brand-cyan/50 rounded-full animate-bounce delay-150"></div>
            </div>
        `;
        this.chatHistory.appendChild(div);
        this.chatHistory.scrollTop = this.chatHistory.scrollHeight;
    }

    removeTypingIndicator() {
        const el = document.getElementById('typing-indicator');
        if (el) el.remove();
    }
}

// Initialize immediately (Script is at bottom of body)
window.nusabot = new NusaBot();
