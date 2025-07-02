import { usePreferenceStore } from "@/stores";
import { Select } from "@headlessui/react";

export const PreferenceSidebar = () => {
	const { country, continent, destination } = usePreferenceStore();

	return (
		<div className="w-80 bg-gray-900 flex flex-col p-4 gap-4">
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

			<div className="mt-auto flex flex-col gap-2">
				<label htmlFor="personality">Personality</label>
				<Select
					name="personality"
					aria-label="Personality"
					id="personality"
					className="bg-slate-800 p-2 rounded-md cursor-pointer"
				>
					<option value="informative">Informative</option>
					<option value="overly-confident">Overly Confident</option>
				</Select>
			</div>
		</div>
	);
};
