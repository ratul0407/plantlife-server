// import redisClient from "../config/redis.config";

// async function getCachedWishlist(key) {
//   return JSON.parse(await redisClient.get(key));
// }

// async function setCachedWishlist(key, items, ttl = 600) {
//   // 10 min default
//   await redisClient.set(key, JSON.stringify(items), { EX: ttl });
// }

// async function invalidateCache(key) {
//   await redisClient.del(key);
// }

// module.exports = { getCachedWishlist, setCachedWishlist, invalidateCache };
