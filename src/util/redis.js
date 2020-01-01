const asyncRedis = require("async-redis");
const USE_REDIS = process.env.USE_REDIS || false;

class Redis {
    constructor() {
        if (USE_REDIS) {
            this.redisClient = asyncRedis.createClient();
            console.log('redis instance created');
            this.redisClient.on("connect", () => {
                console.log('connected to Redis');
            })
        }else {
            console.log('Redis not configured');
        }
    }

    get redis() {
        return this.redisClient;
    }
}

module.exports = new Redis();