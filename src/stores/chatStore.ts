import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { usePreferenceStore } from "./preferenceStore";

type ChatState = {
	input: string;
	messages: string[];
	selectedSystemPromptId: string;
	error: string | null;
	isReplying: boolean;

	setSelectedSystemPrompt: (selectedSystemPrompt: string) => void;
	sendMessage: () => Promise<void>;
	setInput: (input: string) => void;
};

export const useChatStore = create<ChatState>()(
	persist(
		(set, get) => ({
			input: "",
			messages: [],
			selectedSystemPromptId: "default",
			error: null,
			isReplying: false,

			setInput: (input: string) => set({ input }),

			setSelectedSystemPrompt: (selectedSystemPromptId: string) =>
				set({ selectedSystemPromptId }),

			sendMessage: async () => {
				const message = get().input;
				if (!message) return;

				// add user message to messages
				set((state) => ({
					messages: [...state.messages, message],
					input: "",
					isReplying: true,
					error: null,
				}));

				try {
					const { messages, selectedSystemPromptId } = get();
					const response = await fetch("/api/stream", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Accept: "text/event-stream",
						},
						body: JSON.stringify({
							messages,
							systemPromptId: selectedSystemPromptId,
							locations: {
								destination: usePreferenceStore.getState().destination,
								country: usePreferenceStore.getState().country,
								continent: usePreferenceStore.getState().continent,
							},
						}),
					});

					if (!response.ok || !response.body) throw new Error("No stream");

					const reader = response.body.getReader();
					const decoder = new TextDecoder("utf-8");
					let result = "";
					// add empty string to messages for incoming response
					set((state) => ({
						messages: [...state.messages, ""],
					}));

					while (true) {
						const { done, value } = await reader.read();
						if (done) break;
						result += decoder.decode(value);
						set((state) => ({
							messages: [...state.messages.slice(0, -1), result],
						}));

						console.log({ chunk: result });
					}
				} catch (error) {
					set({
						error: error instanceof Error ? error.message : "An error occurred",
					});
				} finally {
					set({ isReplying: false });
				}
			},
		}),
		{
			name: "chat",
			storage: createJSONStorage(() => localStorage),
			partialize: (state) => ({
				selectedSystemPromptId: state.selectedSystemPromptId,
			}),
		}
	)
);
