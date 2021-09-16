const Redis = require('ioredis');

let redis;
if (process.env.NODE_ENV === 'production') {
  redis = new Redis(process.env.REDIS_URL, {
    tls: {
      rejectUnauthorized: false,
    },
  });
} else {
  redis = new Redis({
    port: process.env.PORT_REDIS,
    host: process.env.HOST_REDIS,
    password: process.env.AUTH_REDIS,
    db: 0,
  });
}

// Mode Production on Heroku
// const redis = new Redis(process.env.REDIS_URL, {
//   tls: {
//     rejectUnauthorized: false,
//   },
// });

// Mode Development
// const redis = new Redis({
//   port: process.env.PORT_REDIS,
//   host: process.env.HOST_REDIS,
//   password: process.env.AUTH_REDIS,
//   db: 0,
// });

module.exports = { redis };
