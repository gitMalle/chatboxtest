import { systemPrompts } from "@/data";

export const getSystemPrompt = (systemPromptId: string) => {
	const systemPrompt = systemPrompts.find(
		(prompt) => prompt.id === systemPromptId
	);
	return systemPrompt?.prompt || systemPrompts[0].prompt;
};

export const prepareMessages = (messages: string[], systemPrompt: string) => {
	return [
		{
			role: "system",
			content: systemPrompt,
		},
		...messages.map((message, index) => ({
			role: index % 2 === 0 ? "user" : "assistant",
			content: message,
		})),
	];
};
