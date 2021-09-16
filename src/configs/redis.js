const Redis = require('ioredis');


const redis = new Redis(process.env.REDIS_URL, {
  tls: {
    rejectUnauthorized: false,
  },
});

// export const redis = new Redis({
//   port: process.env.PORT_REDIS,
//   host: process.env.HOST_REDIS,
//   password: process.env.AUTH_REDIS,
//   db: 0,
// });

module.exports = { redis };
