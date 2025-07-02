import { usePreferenceStore } from "@/stores";
import { SearchInput } from "./SearchInput";
import { cities, continents, countries } from "@/data";
import { useEffect } from "react";
import { redirect } from "next/navigation";

export const OnboardingStepper = () => {
	const {
		country,
		continent,
		destination,
		setCountry,
		setContinent,
		setDestination,
	} = usePreferenceStore();

	useEffect(() => {
		if (country && continent && destination) {
			setTimeout(() => {
				redirect("/");
			}, 1000);
		}
	}, [country, continent, destination]);

	return (
		<div className="flex flex-col gap-6">
			<div className="flex flex-col gap-2">
				<label htmlFor="country">What is your favorite country?</label>
				{!country ? (
					<SearchInput
						id="country"
						handleSubmit={setCountry}
						data={countries}
						placeholder="Enter a country..."
					/>
				) : (
					<p className="text-lg text-slate-300">{country}</p>
				)}
			</div>
			{country && (
				<div className="flex flex-col gap-2">
					<label htmlFor="country">What is your favorite continent?</label>
					{!continent ? (
						<SearchInput
							id="country"
							handleSubmit={setContinent}
							data={continents}
							placeholder="Enter a continent..."
						/>
					) : (
						<p className="text-lg text-slate-300">{continent}</p>
					)}
				</div>
			)}
			{continent && (
				<div className="flex flex-col gap-2">
					<label htmlFor="country">What is your favorite destination?</label>
					{!destination ? (
						<SearchInput
							id="country"
							handleSubmit={setDestination}
							data={cities}
							placeholder="Enter a city..."
						/>
					) : (
						<p className="text-lg text-slate-300">{destination}</p>
					)}
				</div>
			)}
		</div>
	);
};
