"use client";

import { usePreferenceStore } from "@/stores/preferenceStore";
import { redirect } from "next/navigation";
import { useRef, useEffect } from "react";
import { PreferenceSidebar } from "./PreferenceSidebar";
import { useChatStore } from "@/stores";
import { Loader2, Send } from "lucide-react";
import { ChatMessage } from "./ChatMessage";

export default function Home() {
	const { messages, input, setInput, sendMessage, isReplying, error } =
		useChatStore();
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
		<div className="flex flex-col md:flex-row h-dvh w-dvw">
			<PreferenceSidebar />
			<div className="flex flex-col flex-1 bg-slate-950">
				<div className="flex-1 flex flex-col p-4 overflow-y-auto space-y-8">
					{messages.length === 0 && isHydrated && (
						<div className="flex-1 flex flex-col items-center justify-center">
							<p className="text-sm text-slate-400">
								Ask me anything about {country}, {continent}, and {destination}
							</p>
						</div>
					)}
					{messages.map((msg, i) => {
						const isUser = i % 2 === 0;
						return <ChatMessage key={i} content={msg} isUser={isUser} />;
					})}
					{error && (
						<div className="flex flex-col items-center justify-center">
							<p className="text-sm text-red-400">{error}</p>
						</div>
					)}
					{isReplying && <Loader2 className="animate-spin mx-auto" />}
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
