"use client";

import { OnboardingStepper } from "./components";

export default function Onboarding() {
	return (
		<div className="max-w-xl h-dvh mx-auto flex flex-col gap-16 px-4 pt-32">
			<h1 className="font-bold text-4xl mx-auto">Welcome to AskJimmy</h1>
			<div>
				<h3 className="font-bold mb-8">Onboarding</h3>
				<OnboardingStepper />
			</div>
		</div>
	);
}
