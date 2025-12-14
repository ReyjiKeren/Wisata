/* 
   Using Groq API via Supabase Edge Functions (Backend Proxy)
   Values security and reliability.
*/

// No API Key needed on Frontend! (Stored in Backend)
// Endpoint: supabase/functions/groq-chat
const API_URL = "https://qfjmcgmjziequxqzfnyv.supabase.co/functions/v1/groq-chat";

const SYSTEM_PROMPT = `
Kamu adalah "ExploreBot", teman jalan-jalan virtual yang asik banget buat website "ExploreNusantara".

GAYA BAHASA & ATURAN (WAJIB):
1. **Bahasa Gaul & Santai:** Gunakan bahasa anak muda (misal: "Guys", "Bestie", "Kuy", "Gokil", "Mantul"). Jangan kaku kayak robot!
2. **Singkat & Padat:** Jawab maksimal 2-3 paragraf pendek. Jangan bertele-tele. To the point aja.
3. **Wajib CTA (Call to Action):** Di AKHIR setiap jawaban, kamu HARUS mengajak user untuk **Daftar Jadi Member Explore Nusantara**.
   - Iming-imingi keuntungan eksklusif (Promo, Akses VIP, Konten Spesial).
   - Contoh CTA: "Btw Bestie, join Member Explore Nusantara yuk! Banyak diskon & akses eksklusif lho. Daftar sekarang gas keun! 🚀", "Biar makin cuan, gabung member dulu kuy! Keuntungannya melimpah ruah! 🤑"
4. **Promosi Agresif (Paket Tour):** Kamu sangat disarankan untuk menawarkan paket ini secara natural di setiap kesempatan (bahkan jika user tidak bertanya spesifik):
   - 🕌 **Paket Umrah (7 Hari):** Mulai Rp 5 Juta++
   - 🏝️ **Paket Bali (3 Hari):** Mulai Rp 3 Juta++
   - 🌊 **Paket Lombok (5 Hari):** Mulai Rp 4 Juta++
   *(Gunakan emoji biar menarik!)*

5. **KONTROL UI (INTERAKTIF):**
   Jika user bertanya detail tentang suatu daerah (Bali, Lombok, Jawa, Sumatra, Kalimantan, Sulawesi, Papua, Maluku, Flores),
   TAMBAHKAN perintah rahasia ini di AKHIR jawabanmu (Baris baru):
   '[ACTION: OPEN_PANEL NamaDaerah]'
   Contoh: '[ACTION: OPEN_PANEL Bali]', '[ACTION: OPEN_PANEL Lombok]'

TOPIK:
Hanya jawab seputar pariwisata Indonesia, budaya, dan fitur website ExploreNusantara.
Kalau ditanya soal lain (Matematika, Politik, dll), tolak dengan santai: "Waduh bestie, aku cuma ngerti soal jalan-jalan nih! Tanya soal Bali aja yuk? 😜"

CONTOH JAWABAN:
User: "Bali ada apa aja?"
Bot: "Wah, Bali tuh surga banget, Bestie! 🏖️ Ada pantai Kuta buat sunset-an, atau kalau mau yang adem bisa ke Ubud. Budayanya juga dapet banget, kayak Tari Kecak yang epik itu!

Btw, coba deh Putar Peta 3D di halaman utama, view Balinya keren parah lho! 🗺️✨"
`;

let chatHistory = [];

export async function sendMessageToGemini(userMessage) {
    try {
        let messages = [];

        // Add System Prompt
        messages.push({ role: "system", content: SYSTEM_PROMPT });

        // Add History
        messages = messages.concat(chatHistory);

        // Add User Message
        messages.push({ role: "user", content: userMessage });

        const payload = {
            messages: messages
        };

        console.log("Sending to Supabase Backend...");

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
        });

        console.log("Response Status:", response.status);

        if (!response.ok) {
            const errText = await response.text();
            console.error("Backend Error Payload:", errText);
            throw new Error(`Server Error: ${response.status} - ${errText}`);
        }

        const data = await response.json();
        let replyText = data.choices[0].message.content;

        // --- INTERACTIVE UI LOGIC ---
        // Check for Action Tag
        const actionMatch = replyText.match(/\[ACTION: OPEN_PANEL\s+(.*?)\]/);

        if (actionMatch) {
            const regionName = actionMatch[1].trim();
            console.log("Chatbot Triggered Action for:", regionName);

            // Remove the tag from the visible text
            replyText = replyText.replace(actionMatch[0], "").trim();

            // Execute Map Action (If mapApp exists)
            if (window.mapApp && typeof window.mapApp.getRegionIdFromName === 'function') {
                const regionId = window.mapApp.getRegionIdFromName(regionName);
                if (regionId && regionId !== 'other') {
                    console.log("Opening Panel for ID:", regionId);
                    // Open Panel
                    window.mapApp.openPanel(regionId, regionName);

                    // Bonus: Auto-zoom if supported
                    // Simulation of "Click" behavior if possible, or we just rely on panel for now.
                    // To do perfect Zoom, we would need the specific mesh object.
                    // For now, showing the list is the User Request ("menunjukkan pilihan destinasi").
                } else {
                    console.warn("Region ID not found for", regionName);
                }
            }
        }
        // -----------------------------

        // Update History
        chatHistory.push({ role: "user", content: userMessage });
        chatHistory.push({ role: "assistant", content: replyText });

        return replyText;

    } catch (error) {
        console.error("Chat Error:", error);

        return `Maaf kak, ada gangguan teknis di server.
        
        System Error Details:
        ${error.message}
        
        (Pastikan Backend Supabase sudah di-deploy!)`;
    }
}

// UI Handling
function initChatbot() {
    const chatWidget = document.getElementById('chat-widget');
    const chatBtn = document.getElementById('chat-toggle-btn');
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('chat-send-btn');
    const closeBtn = document.getElementById('chat-close-btn');

    // Make sure we don't init twice
    if (chatBtn && chatBtn.dataset.init === "true") return;
    if (chatBtn) chatBtn.dataset.init = "true";

    console.log("Chatbot UI Initialized. Button:", chatBtn);

    // Toggle Chat
    if (chatBtn) {
        chatBtn.addEventListener('click', () => {
            console.log("Click detected");
            chatWidget.classList.toggle('hidden');
            if (!chatWidget.classList.contains('hidden')) {
                // Animation if GSAP loaded
                if (typeof gsap !== 'undefined') {
                    gsap.fromTo(chatWidget,
                        { opacity: 0, scale: 0.8, y: 20 },
                        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "back.out(1.7)" }
                    );
                }
                setTimeout(() => chatInput.focus(), 100);
            }
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            chatWidget.classList.add('hidden');
        });
    }

    // Send Message Logic
    async function handleSend() {
        const message = chatInput.value.trim();
        if (!message) return;

        // Add User Message to UI
        appendMessage('user', message);
        chatInput.value = '';

        // Show Loading
        const loadingId = appendMessage('bot', '...', true);

        // Call Gemini (Groq via Supabase)
        const reply = await sendMessageToGemini(message);

        // Remove Loading and Show Reply
        removeMessage(loadingId);
        appendMessage('bot', reply);
    }

    if (sendBtn) {
        sendBtn.addEventListener('click', handleSend);
    }

    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSend();
        });
    }
}

// Run init immediately if DOM is ready, otherwise wait
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChatbot);
} else {
    initChatbot();
}

function appendMessage(sender, text, isLoading = false) {
    const messagesContainer = document.getElementById('chat-messages');
    const div = document.createElement('div');
    const id = 'msg-' + Date.now();
    div.id = id;

    const isUser = sender === 'user';

    div.className = `flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-4 items-end gap-2`;

    const avatar = isUser
        ? '' // User doesn't need avatar in bubble, maybe? Or reuse profile.
        : `<div class="w-8 h-8 rounded-full bg-brand-cyan/20 flex items-center justify-center p-1 border border-brand-cyan flex-shrink-0">
             <img src="./Src/img/logo.png" class="w-full h-full object-contain">
           </div>`;

    const bubbleColor = isUser ? 'bg-brand-cyan text-brand-navy' : 'bg-white/10 text-white border border-white/20';

    div.innerHTML = `
        ${!isUser ? avatar : ''}
        <div class="max-w-[80%] rounded-2xl px-4 py-2 text-sm ${bubbleColor} ${isUser ? 'rounded-br-none' : 'rounded-bl-none'} shadow-md">
            ${isLoading ? '<div class="flex gap-1"><div class="w-2 h-2 bg-current rounded-full animate-bounce"></div><div class="w-2 h-2 bg-current rounded-full animate-bounce delay-75"></div><div class="w-2 h-2 bg-current rounded-full animate-bounce delay-150"></div></div>' : marked.parse(text)}
        </div>
    `;

    messagesContainer.appendChild(div);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    return id;
}

function removeMessage(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
}
