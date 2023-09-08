import { createApiParam } from "../functions/create-api-param";

export function convertMovieNameToDbStandard(names: string[], name: string) {
	const formattedName = createApiParam(name);
	if (names.includes("scream_4") && formattedName === "scream") {
		return `${formattedName}_5`;
	}
	if (formattedName === "scream_vi") {
		return formattedName.replace("vi", "6");
	}
	return formattedName;
}
