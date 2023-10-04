import { removeInvalidChars } from "./remove-invalid-chars";

let prevName = "";

export function formatMovieName(name: string) {
	const formattedName = removeInvalidChars(name);
	if (prevName === "Scream 4" && formattedName === "Scream") {
		const newName = "Scream 5";
		prevName = newName;
		return newName;
	}
	if (formattedName === "Scream VI") {
		const newName = "Scream 6";
		prevName = newName;
		return newName;
	}
	prevName = formattedName;
	return formattedName;
}
