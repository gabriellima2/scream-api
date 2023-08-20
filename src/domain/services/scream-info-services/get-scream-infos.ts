import { ScreamInfoServiceProtocols } from "@/domain/protocols";

export interface GetScreamInfos<T> {
	execute(
		baseUrl: string,
		movieNames: string[]
	): Promise<ScreamInfoServiceProtocols.Response<T[]>>;
}
