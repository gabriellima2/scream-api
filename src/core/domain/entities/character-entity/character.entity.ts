import { CharacterStatus, StatusEntity } from "./status.entity";
import { PortrayedByEntity } from "./portrayed-by.entity";
import { DescriptionEntity } from "./description.entity";
import { PersonalityEntity } from "./personality.entity";
import { AppearancesEntity } from "./appearences.entity";
import { BornEntity } from "./born.entity";
import { NameEntity } from "./name.entity";

interface CharacterEntityProps {
	id?: string;
	name: NameEntity;
	image: string;
	description: DescriptionEntity;
	born: BornEntity;
	personality: PersonalityEntity;
	status: StatusEntity;
	portrayed_by: PortrayedByEntity;
	appearances: AppearancesEntity;
}

export interface CharacterData {
	id?: string;
	name: string;
	image: string;
	description: string;
	born: string;
	personality: string[];
	status: CharacterStatus;
	portrayed_by: string[];
	appearances: string[];
}

export class CharacterEntity {
	private constructor(private readonly props: CharacterEntityProps) {}
	public static create(params: CharacterData) {
		const name = NameEntity.create(params.name);
		const description = DescriptionEntity.create(params.description);
		const born = BornEntity.create(params.born);
		const personality = PersonalityEntity.create(params.personality);
		const status = StatusEntity.create(params.status);
		const portrayed_by = PortrayedByEntity.create(params.portrayed_by);
		const appearances = AppearancesEntity.create(params.appearances);

		return new CharacterEntity({
			...params,
			name,
			description,
			born,
			personality,
			status,
			portrayed_by,
			appearances,
		});
	}
	public setId(id: string) {
		this.props.id = id;
	}
	get id() {
		return this.props.id;
	}
	get image() {
		return this.props.image;
	}
	get name() {
		if (!this.props.name) return;
		return this.props.name.value;
	}
	get description() {
		if (!this.props.description) return;
		return this.props.description.value;
	}
	get born() {
		if (!this.props.born) return;
		return this.props.born.value;
	}
	get personality() {
		if (!this.props.personality) return;
		return this.props.personality.value;
	}
	get status() {
		if (!this.props.status) return;
		return this.props.status.value;
	}
	get portrayed_by() {
		if (!this.props.portrayed_by) return;
		return this.props.portrayed_by.value;
	}
	get appearances() {
		if (!this.props.appearances) return;
		return this.props.appearances.value;
	}
}
