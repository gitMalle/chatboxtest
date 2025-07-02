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
