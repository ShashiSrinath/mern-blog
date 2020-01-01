const {redis} = require('../src/util/redis');

const checkCache = async (req, res, next, key) => {
    if (redis) {
        const cache = await redis.get(key);
        if (cache) return res.send(JSON.parse(cache));
    }
    next();
};

const setCache = (key, data, expiry) => {
    if(redis) {
        redis.set(key, JSON.stringify(data));
        if (expiry) redis.expire(key, expiry);
    }
};

const flushCache = () => {
    if(redis) redis.flushall();
};

module.exports = {checkCache, setCache, flushCache};