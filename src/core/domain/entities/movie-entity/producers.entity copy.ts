export class ProducersEntity {
	private constructor(private readonly producers: string[]) {}
	public static create(producers: string[]) {
		if (ProducersEntity.validate(producers)) return;
		return new ProducersEntity(ProducersEntity.format(producers));
	}
	get value() {
		return this.producers;
	}
	private static validate(producers: string[]) {
		return !producers;
	}
	private static format(producers: string[]) {
		return producers;
	}
}
