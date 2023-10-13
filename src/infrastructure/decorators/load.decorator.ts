import { load } from "cheerio";
import { InvalidParamsException } from "@/core/domain/exceptions/invalid-params.exception";

export function Load(
	target: unknown,
	propertyKey: string,
	descriptor: PropertyDescriptor
) {
	const originalMethod = descriptor.value;
	descriptor.value = function (...args: unknown[]) {
		const html = args[0] as string;
		this.$ = load(html);
		if (this.$(".noarticletext").text()) throw new InvalidParamsException();
		return originalMethod.apply(this, args);
	};
	return descriptor;
}
