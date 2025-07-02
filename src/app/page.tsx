"use client";

import { usePreferenceStore } from "@/stores/preferenceStore";
import { redirect } from "next/navigation";
import { useRef, useEffect } from "react";
import { PreferenceSidebar } from "./PreferenceSidebar";
import { useChatStore } from "@/stores/chatStore";
import { Send } from "lucide-react";
import { ChatMessage } from "./ChatMessage";

export default function Home() {
	const { messages, input, setInput, sendMessage } = useChatStore();
	const endRef = useRef<HTMLDivElement>(null);
	const { isHydrated, country, continent, destination } = usePreferenceStore();

	// redirect to onboarding if not all preferences are set
	useEffect(() => {
		if (isHydrated && (!country || !continent || !destination)) {
			redirect("/onboarding");
		}
	}, [isHydrated, country, continent, destination]);

	useEffect(() => {
		endRef.current?.scrollIntoView();
	}, [messages]);

	return (
		<div className="flex flex-row h-dvh w-dvw">
			<PreferenceSidebar />
			<div className="flex flex-col flex-1 bg-slate-950">
				<div className="flex-1 flex flex-col p-4 overflow-y-auto space-y-8">
					{messages.map((msg, i) => {
						const isUser = i % 2 === 0;
						return <ChatMessage key={i} content={msg} isUser={isUser} />;
					})}
					<div ref={endRef} />
				</div>
				<div className="p-3 flex gap-2 bg-slate-900">
					<input
						value={input}
						onChange={(e) => setInput(e.target.value)}
						onKeyDown={(e) => e.key === "Enter" && sendMessage()}
						className="flex-1 rounded-md px-4 py-3 text-sm bg-transparent outline-none"
						placeholder="Type a message"
					/>
					<button
						onClick={sendMessage}
						className="px-3 py-1 rounded-md bg-slate-700 text-sm hover:bg-slate-800 cursor-pointer"
					>
						<Send className="w-4 h-4" />
					</button>
				</div>
			</div>
		</div>
	);
}
