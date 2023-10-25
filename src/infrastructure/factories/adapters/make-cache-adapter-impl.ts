import { CacheAdapterImpl } from "@/infrastructure/adapters/cache.adapter.impl";

export const makeCacheAdapterImpl = <T>() => new CacheAdapterImpl<T>();
