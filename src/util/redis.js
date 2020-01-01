const asyncRedis = require("async-redis");

class Redis {
    constructor() {
        console.log('redis instance created');
        this.redisClient = asyncRedis.createClient();
        this.redisClient.on("connect", () => {
            console.log('connected to Redis');
        })
    }

    get redis() {
        return this.redisClient;
    }
}

module.exports = new Redis();