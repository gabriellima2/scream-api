import { ScreamInfoServiceProtocols } from "@/domain/protocols";

export interface GetScreamInfo<T> {
	execute(
		baseUrl: string,
		name: string
	): Promise<ScreamInfoServiceProtocols.Response<T>>;
}
