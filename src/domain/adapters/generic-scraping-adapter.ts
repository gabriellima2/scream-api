export interface GenericScrapingAdapter<T> {
	execute(html: string): Promise<T>;
}
