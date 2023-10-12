export function capitalizeSentence(sentence: string) {
	const hasDash = sentence.includes("_");
	const separator = hasDash ? "_" : " ";
	return sentence
		.split(separator)
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(separator);
}
