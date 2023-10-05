export class PortrayedByEntity {
	private constructor(private readonly portrayedBy: string[]) {}
	public static create(portrayedBy: string[]) {
		if (PortrayedByEntity.validate(portrayedBy)) return;
		return new PortrayedByEntity(portrayedBy);
	}
	get value() {
		return this.portrayedBy;
	}
	private static validate(portrayedBy: string[]) {
		return !portrayedBy || portrayedBy.some((value) => !value);
	}
}
