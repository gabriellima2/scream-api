import { ReleaseDateEntity } from "./release-date.entity";
import { RunningTimeEntity } from "./running-time.entity";
import { CharactersEntity } from "./characters.entity";
import { BoxOfficeEntity } from "./box-office.entity";
import { DirectorsEntity } from "./directors.entity";
import { ProducersEntity } from "./producers.entity";
import { SynopsisEntity } from "./synopsis.entity";
import { ComposerEntity } from "./composer.entity";
import { WritersEntity } from "./writers.entity";
import { NameEntity } from "./name.entity";

interface MovieEntityProps {
	id?: string;
	name: NameEntity;
	image: string;
	synopsis: SynopsisEntity;
	directors: DirectorsEntity;
	writers: WritersEntity;
	producers: ProducersEntity;
	composer: ComposerEntity;
	release_date: ReleaseDateEntity;
	running_time: RunningTimeEntity;
	box_office: BoxOfficeEntity;
	characters: CharactersEntity;
}

export interface MovieData {
	id?: string;
	name: string;
	image: string;
	synopsis: string;
	directors: string[];
	writers: string[];
	producers: string[];
	composer: string[];
	release_date: string;
	running_time: string;
	box_office: string;
	characters: string[];
}

export class MovieEntity {
	private constructor(private readonly props: MovieEntityProps) {}
	public static create(params: MovieData) {
		const name = NameEntity.create(params.name);
		const synopsis = SynopsisEntity.create(params.synopsis);
		const directors = DirectorsEntity.create(params.directors);
		const writers = WritersEntity.create(params.writers);
		const producers = ProducersEntity.create(params.producers);
		const composer = ComposerEntity.create(params.composer);
		const releaseDate = ReleaseDateEntity.create(params.release_date);
		const runningTime = RunningTimeEntity.create(params.running_time);
		const boxOffice = BoxOfficeEntity.create(params.box_office);
		const characters = CharactersEntity.create(params.characters);

		return new MovieEntity({
			...params,
			name,
			synopsis,
			directors,
			writers,
			producers,
			composer,
			release_date: releaseDate,
			running_time: runningTime,
			box_office: boxOffice,
			characters,
		});
	}
	private getValue(key: string) {
		if (!this.props[key]) return;
		return this.props[key].value;
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
		return this.getValue("name");
	}
	get synopsis() {
		return this.getValue("synopsis");
	}
	get directors() {
		return this.getValue("directors");
	}
	get writers() {
		return this.getValue("writers");
	}
	get producers() {
		return this.getValue("producers");
	}
	get composer() {
		return this.getValue("composer");
	}
	get releaseDate() {
		return this.getValue("release_date");
	}
	get runningTime() {
		return this.getValue("running_time");
	}
	get boxOffice() {
		return this.getValue("box_office");
	}
	get characters() {
		return this.getValue("characters");
	}
}
