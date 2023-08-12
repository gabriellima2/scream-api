export interface GenericScrapingAdapter<T> {
	execute(html: string): T;
}
