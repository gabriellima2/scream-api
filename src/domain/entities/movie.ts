export interface MovieOverview {
	directors: string[];
	writers: string[];
	producers: string[];
	composers: string[];
	realease_date: string;
	running_time: string;
	box_office: string;
	characters: string[];
}

export interface Movie {
	id: string;
	name: string;
	banner: string;
	synopsis: string;
	overview: MovieOverview;
}
