export interface GenericMovieService<T> {
	execute(url: string, endpoints: string[]): Promise<T>;
}
