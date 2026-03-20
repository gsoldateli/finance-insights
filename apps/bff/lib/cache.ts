import NodeCache from 'node-cache';

const globalCache = new NodeCache({ stdTTL: 300 }); // 5 min default

/**
 * Wrapper de Cache Componível
 * @param key Chave única do cache
 * @param fetcher Função que busca os dados se o cache falhar
 * @param ttl Tempo de vida opcional
 */
export async function withCache<T>(
    key: string,
    fetcher: () => Promise<T>,
    ttl?: number
): Promise<T> {
    const cached = globalCache.get<T>(key);

    if (cached !== undefined) {
        return cached;
    }

    const result = await fetcher();
    globalCache.set(key, result, ttl ?? 300);

    return result;
}