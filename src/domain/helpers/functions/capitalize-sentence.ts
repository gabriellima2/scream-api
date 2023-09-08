export function capitalizeSentence(sentence: string) {
	return sentence
		.split("_")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join("_");
}
