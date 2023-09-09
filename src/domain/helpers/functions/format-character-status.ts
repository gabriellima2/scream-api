import { CharacterStatus } from "@/domain/entities";

export function formatCharacterStatus(status: string) {
	if (!status.includes("/")) return status as CharacterStatus;
	return status.slice(0, status.indexOf("/")) as CharacterStatus;
}
