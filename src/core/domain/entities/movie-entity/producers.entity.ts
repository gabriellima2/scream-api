export class ProducersEntity {
	private constructor(private readonly producers: string[]) {}
	public static create(producers: string[]) {
		if (ProducersEntity.validate(producers)) return;
		return new ProducersEntity(producers);
	}
	get value() {
		return this.producers;
	}
	private static validate(producers: string[]) {
		return !producers || producers.some((value) => !value);
	}
}
