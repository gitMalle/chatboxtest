import { systemPromptOptions } from "@/data";
import { usePreferenceStore, useChatStore } from "@/stores";
import { Select } from "@headlessui/react";
import { RefreshCw } from "lucide-react";

export const PreferenceSidebar = () => {
	const { country, continent, destination, resetPreferences } =
		usePreferenceStore();
	const { setSelectedSystemPrompt, selectedSystemPromptId } = useChatStore();

	return (
		<div className="w-80 bg-slate-900 flex flex-col p-4 gap-4">
			<h3 className="font-bold">Your Settings</h3>

			<div className="flex flex-col gap-1">
				<p className="text-sm">Country</p>
				<p className="text-sm font-bold">{country}</p>
			</div>

			<div className="flex flex-col gap-1">
				<p className="text-sm">Continent</p>
				<p className="text-sm font-bold">{continent}</p>
			</div>

			<div className="flex flex-col gap-1">
				<p className="text-sm">Destination</p>
				<p className="text-sm font-bold">{destination}</p>
			</div>

			<button
				className="bg-slate-800 p-2 rounded-md cursor-pointer flex items-center justify-center gap-2 hover:bg-slate-700"
				onClick={() => {
					resetPreferences();
				}}
			>
				<RefreshCw className="w-4 h-4" />
				Reset Settings
			</button>

			<div className="mt-auto flex flex-col gap-2">
				<label htmlFor="personality">Personality</label>
				<Select
					name="personality"
					aria-label="Personality"
					id="personality"
					className="bg-slate-800 p-2 rounded-md cursor-pointer"
					value={selectedSystemPromptId}
					onChange={(e) => setSelectedSystemPrompt(e.target.value)}
				>
					{systemPromptOptions.map((option) => (
						<option key={option.id} value={option.id}>
							{option.name}
						</option>
					))}
				</Select>
			</div>
		</div>
	);
};
