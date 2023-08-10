export type CharacterStatus = "alive" | "dead" | "unknown";

export interface Character {
	id: string;
	name: string;
	image: string;
	description: string;
	appearances: string[];
	born: string;
	age: number;
	personality: string[];
	status: CharacterStatus;
	portrayed_by: string;
}
