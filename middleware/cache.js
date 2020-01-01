const {redis} = require('../src/util/redis');

const checkCache = async (req, res, next, key) => {
    const cache = await redis.get(key);
    if (cache) return res.send(JSON.parse(cache));
    next();
};

const setCache = (key, data,expiry) => {
    redis.set(key, JSON.stringify(data));
    if (expiry) redis.expire(key,expiry);
};

const flushCache = () => {
    redis.flushall();
};

module.exports = {checkCache, setCache, flushCache};