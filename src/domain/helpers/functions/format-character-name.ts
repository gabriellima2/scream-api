const regex = /^(\S+)\s+(?:.*\s)?(\S+)$/;

export function formatCharacterName(name: string) {
	const match = name.match(regex);
	return match ? `${match[1]} ${match[2]}` : name;
}
