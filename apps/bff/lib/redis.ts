import { Redis } from "@upstash/redis"
import "dotenv/config";

const url = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;

if (!url || !token) {
    throw new Error(
        "❌ UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN not defined in .env"
    );
}

export const redis = new Redis({
    url,
    token,
})


/**
 * Wrapper de Cache para Redis (Upstash)
 * @param key Chave única do cache
 * @param fetcher Função que busca os dados se o cache falhar
 * @param ttl Tempo de vida em segundos (default 3600 - 1h)
 */
export async function withRedisCache<T>(
    key: string,
    fetcher: () => Promise<T>,
    ttl: number = 3600
): Promise<T> {
    try {
        const cached = await redis.get<T>(key);

        if (cached !== null && cached !== undefined) {
            return cached;
        }

        const result = await fetcher();

        await redis.set(key, result, { ex: ttl });

        return result;
    } catch (error) {
        console.error(`[Redis Error] ${key}:`, error);
        return await fetcher();
    }
}