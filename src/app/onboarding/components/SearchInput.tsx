"use client";

import {
	Combobox,
	ComboboxInput,
	ComboboxOption,
	ComboboxOptions,
} from "@headlessui/react";
import { SendHorizonal } from "lucide-react";
import { useState } from "react";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	data: string[];
	handleSubmit: (value: string) => void;
}

export const SearchInput = ({
	handleSubmit,
	data,
	...props
}: SearchInputProps) => {
	const [value, setValue] = useState("");

	const filteredData = data.filter((item) =>
		item.toLowerCase().includes(value.toLowerCase())
	);

	return (
		<form
			onSubmit={(ev) => {
				ev.preventDefault();
				handleSubmit(value);
			}}
		>
			<Combobox
				value={value}
				onChange={(value) => setValue(value || "")}
				immediate
			>
				<div className="relative">
					<ComboboxInput
						className="bg-slate-800 rounded-md border-1 border-slate-700 px-4 py-2 w-full max-w-xl"
						onChange={(event) => setValue(event.target.value)}
						autoComplete="off"
						autoFocus
						{...props}
					/>
					<button
						className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
						type="submit"
					>
						<SendHorizonal />
					</button>
				</div>
				<ComboboxOptions
					anchor="bottom"
					className="border border-slate-700 rounded-md empty:invisible w-md bg-background"
				>
					{filteredData.map((item) => (
						<ComboboxOption
							key={item}
							value={item}
							className="data-focus:bg-slate-800 w-full py-2 px-4"
						>
							{item}
						</ComboboxOption>
					))}
				</ComboboxOptions>
			</Combobox>
		</form>
	);
};
