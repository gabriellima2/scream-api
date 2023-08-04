export interface MovieOverview {
	directors: string[] | string;
	writers: string[] | string;
	producers: string[];
	composers: string;
	realease_date: string;
	running_time: string;
	box_office: string;
}

export interface Movie {
	id: string;
	name: string;
	image: string;
	synopsis: string;
	overview: MovieOverview;
	characters: string[];
}
