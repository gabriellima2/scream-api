import { capitalizeSentence } from "../../functions/formatters/capitalize-sentence";

export type CharacterStatus = "Alive" | "Deceased" | "Unknown";

export class StatusEntity {
	private constructor(private readonly status: CharacterStatus) {}
	public static create(status: CharacterStatus) {
		if (StatusEntity.validate(status)) return new StatusEntity("Unknown");
		return new StatusEntity(StatusEntity.format(status));
	}
	get value() {
		return this.status;
	}
	private static validate(status: CharacterStatus) {
		return !status;
	}
	private static format(status: CharacterStatus) {
		return capitalizeSentence(
			status.includes("/") ? status.slice(0, status.indexOf("/")) : status
		) as CharacterStatus;
	}
}
