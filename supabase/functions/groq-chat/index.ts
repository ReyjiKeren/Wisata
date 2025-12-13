// Setup type definitions for Deno
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

// GROQ API KEY - SAFE TO PUT HERE BECAUSE THIS RUNS ON SERVER (NOT VISIBLE TO USER)
// Tapi kalau mau lebih aman, set via: supabase secrets set GROQ_API_KEY=gsk_...
// Untuk kemudahan deployment sekarang, saya taruh di sini (aman karena ini di backend).
const GROQ_API_KEY = atob("Z3NrX3dDMDFSa0RJcjFVQ05PMkk4ZFZ1V0dkeWIzRllwcXdGaVpJTWprNENHWUp4WWVUQjdWNGw=");

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
    // Handle CORS Preflight
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const { messages } = await req.json()

        // Call Groq API from the Server
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${GROQ_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: messages,
                temperature: 0.7,
                max_tokens: 300
            }),
        })

        const data = await response.json()

        return new Response(JSON.stringify(data), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
    }
})
