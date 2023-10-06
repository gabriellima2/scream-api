export class RunningTimeEntity {
	private constructor(private readonly runningTime: string) {}
	public static create(runningTime: string) {
		if (RunningTimeEntity.validate(runningTime)) return;
		return new RunningTimeEntity(runningTime);
	}
	get value() {
		return this.runningTime;
	}
	private static validate(runningTime: string) {
		return !runningTime;
	}
}
