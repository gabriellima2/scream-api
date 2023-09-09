import { createApiParam } from "../functions/create-api-param";

export function convertMovieNameToDbStandard(names: string[], name: string) {
	const formattedName = createApiParam(name);
	if (names.includes("Scream_4") && formattedName === "Scream")
		return `${formattedName}_5`;
	if (formattedName === "Scream_VI") return formattedName.replace("VI", "6");
	return formattedName;
}
