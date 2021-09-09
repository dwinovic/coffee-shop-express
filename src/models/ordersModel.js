import mysql from 'mysql2';
import connection from '../configs/db.js';
import { promiseResolveReject } from '../helpers/helpers.js';

const checkProducts = (id) => new Promise((resolve, reject) => {
  connection.query('SELECT * FROM products where product_id IN (?)', [id], (error, result) => {
    promiseResolveReject(resolve, reject, error, result);
  });
});

const insertOrder = (data) => new Promise((resolve, reject) => {
  connection.query('INSERT INTO orders set ?', data, (error, result) => {
    promiseResolveReject(resolve, reject, error, result);
  });
});

const insertOrderDetails = (data) => new Promise((resolve, reject) => {
  connection.query(
    'INSERT INTO order_detail (order_id, delivery_id, size_id, product_id, item_price, stock,time_dine_in) VALUES ?',
    [
      data.map((value) => [
        value.order_id,
        value.delivery_id,
        value.size_id,
        value.product_id,
        value.item_price,
        value.stock,
        value.time_dine_in,
      ]),
    ],
    (error, result) => {
      promiseResolveReject(resolve, reject, error, result);
    },
  );
});

const updateProducts = (data, id) => new Promise((resolve, reject) => {
  let query = '';
  data.forEach((value, index) => {
    query += mysql.format('UPDATE products SET stock = ? where product_id = ?;', [value, id[index]]);
  });
  connection.query(query, (error, result) => {
    promiseResolveReject(resolve, reject, error, result);
  });
});

export default {
  checkProducts,
  insertOrder,
  insertOrderDetails,
  updateProducts,
};
