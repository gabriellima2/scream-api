import { createListFromString } from "../../functions/create-list-from-string";

export class PortrayedByEntity {
	private constructor(private readonly portrayedBy: string[]) {}
	public static create(portrayedBy: string) {
		if (PortrayedByEntity.validate(portrayedBy)) return;
		return new PortrayedByEntity(PortrayedByEntity.format(portrayedBy));
	}
	get value() {
		return this.portrayedBy;
	}
	private static validate(portrayedBy: string) {
		return !portrayedBy;
	}
	private static format(portrayedBy: string) {
		return createListFromString(portrayedBy);
	}
}
