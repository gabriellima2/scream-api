export type CharacterStatus = "alive" | "dead" | "unknown";

export interface CharacterOverview {
	born: string;
	personality: string[];
	status: CharacterStatus;
	portrayed_by: string;
}

export interface Character {
	id: string;
	name: string;
	image: string;
	description: string;
	overview: CharacterOverview;
	appearances: string[];
}
