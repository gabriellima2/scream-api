export function formatOverviewContent(content: string): string[] {
	const contentInArray = content.split(" ");
	const contentFormatted: string[] = [];
	for (let i = 0; i < contentInArray.length; i++) {
		const currentValue = contentInArray[i];
		const nextValue = contentInArray[i + 1];
		if (currentValue && nextValue) {
			contentFormatted.push(`${currentValue} ${nextValue}`);
		}
	}
	return contentFormatted;
}
