/* eslint-disable no-unused-vars */
const express = require('express');
const path = require('path');
require('dotenv').config();
const cors = require('cors');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const { Server, Socket } = require('socket.io');
const { createServer } = require('http');
const ioCookieParser = require('socket.io-cookie-parser');
const { responseError } = require('./src/helpers/helpers');
const CookieAuth = require('./src/middlewares/CookieAuth');
const categoriesRoute = require('./src/routes/categories');
const sizesRoute = require('./src/routes/sizes');
const deliveriesRoute = require('./src/routes/deliveries');
const usersRoute = require('./src/routes/users');
const productsRoute = require('./src/routes/products');
const ordersRoute = require('./src/routes/orders');
const historyRoute = require('./src/routes/history');

const app = express();
const port = process.env.PORT;
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    credentials: JSON.parse(process.env.CREDENTIALS),
    origin(origin, callback) {
      if (process.env.CORS_ORIGIN.indexOf(origin) !== -1 || origin === undefined) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  },
});
app.use('/public', express.static(path.resolve('./public')));
app.use(fileUpload());
app.use(
  cors({
    credentials: JSON.parse(process.env.CREDENTIALS),
    origin(origin, callback) {
      if (process.env.CORS_ORIGIN.indexOf(origin) !== -1 || origin === undefined) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  }),
);
app.use((req, res, next) => {
  req.io = io;
  next();
});
app.use(cookieParser());
app.use(express.json());
// Route
app.use('/categories', categoriesRoute);
app.use('/sizes', sizesRoute);
app.use('/deliveries', deliveriesRoute);
app.use('/users', usersRoute);
app.use('/products', productsRoute);
app.use('/orders', ordersRoute);
app.use('/history', historyRoute);

app.use('*', (req, res, next) => {
  next(new Error('Endpoint Not Found'));
});
app.use((err, req, res, next) => {
  responseError(res, 'Error', 500, err.message, []);
});
io.use(ioCookieParser());
io.use(CookieAuth);
httpServer.listen(port, () => {
  console.log(`Server running port ${port}`);
});
