export const runtime = "edge";

import { OpenAI } from "openai";
import { prepareMessages } from "./utils";
import { ChatCompletionMessageParam } from "openai/resources";
import { getSystemPrompt } from "@/data";

if (!process.env.OPENAI_API_KEY || !process.env.OPENAI_PROJECT_ID) {
	throw new Error("OPENAI_API_KEY or OPENAI_PROJECT_ID is not set");
}

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
	project: process.env.OPENAI_PROJECT_ID,
});

export async function POST(req: Request) {
	const { messages, systemPromptId, locations } = await req.json();

	const systemPrompt = getSystemPrompt({ id: systemPromptId, ...locations });

	const responseStream = await openai.chat.completions.create({
		model: "gpt-4o-mini",
		messages: prepareMessages(
			messages,
			systemPrompt
		) as ChatCompletionMessageParam[],
		stream: true,
	});

	const encoder = new TextEncoder();

	const readableStream = new ReadableStream({
		async start(controller) {
			for await (const chunk of responseStream) {
				const content = chunk.choices[0]?.delta?.content || "";
				controller.enqueue(encoder.encode(content));
			}
			controller.close();
		},
	});

	return new Response(readableStream, {
		headers: { "Content-Type": "text/plain; charset=utf-8" },
	});
}
