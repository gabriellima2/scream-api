export type CharacterStatus = "Alive" | "Deceased" | "Unknown";

export interface Character {
	id: string;
	name: string;
	image: string;
	description: string;
	born: string;
	personality: string[];
	status: CharacterStatus;
	portrayed_by: string[];
	appearances: string[];
}
