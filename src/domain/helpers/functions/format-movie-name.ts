import { removeInvalidChars } from "./remove-invalid-chars";

const names = [];

export function formatMovieName(name: string) {
	const formattedName = removeInvalidChars(name);
	if (names.includes("Scream 4") && formattedName === "Scream") {
		const newName = "Scream 5";
		names.push(newName);
		return newName;
	}
	if (formattedName === "Scream VI") {
		const newName = "Scream 6";
		names.push(newName);
		return newName;
	}
	names.push(formattedName);
	return formattedName;
}
