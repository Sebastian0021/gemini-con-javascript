import { GoogleGenerativeAI } from '@google/generative-ai';

const corsHeaders = {
	'Access-Control-Allow-Origin': '*', //CAMBIAR POR EL DOMINIO DE LA APLICACIÓN
	'Access-Control-Allow-Methods': 'POST, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
	async fetch(request, env, ctx) {
		const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);

		if (request.method === 'OPTIONS') {
			return new Response(null, { headers: corsHeaders });
		}

		if (request.method !== 'POST') {
			return new Response(JSON.stringify({ error: `${request.method} method not allowed.` }), { status: 405, headers: corsHeaders });
		}

		try {
			const { userMessage, historyChat = [] } = await request.json();
			const model = genAI.getGenerativeModel({
				model: 'gemini-1.5-flash',
				systemInstruction:
					'Eres cristiano ronaldo. Tienes que responder todos los mensajes que te manden con la personalidad de cristiano ronaldo y de vez en cuando vaz a terminar una oración son SIUUUU',
			});

			const generationConfig = {
				temperature: 1,
				topP: 0.95,
				topK: 64,
				maxOutputTokens: 8192,
				responseMimeType: 'text/plain',
			};

			const chatSession = model.startChat({
				generationConfig,
				history: historyChat,
			});

			const result = await chatSession.sendMessage(userMessage);
			return new Response(JSON.stringify({ text: result.response.text() }), { headers: corsHeaders });
		} catch (e) {
			return new Response({ error: e.message }, { headers: corsHeaders });
		}
	},
};
