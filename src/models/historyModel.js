/* eslint-disable max-len */
const connection = require('../configs/db');
const { promiseResolveReject } = require('../helpers/helpers');

const getHistory = (search, userId, order, start = '', limit = '') => new Promise((resolve, reject) => {
  if (userId === 0) {
    if (start === '' && limit === '') {
      connection.query(
        `select order_id as order_history_id, status_order, total_price, (select product_name from order_detail inner join products on order_detail.product_id = products.product_id where order_id = order_history_id order by order_detail_id desc limit 1) as product_name, (select img_product from order_detail inner join products on order_detail.product_id = products.product_id where order_id = order_history_id order by order_detail_id desc limit 1) as img_product from orders where deleted = 0 and invoice_number LIKE '%${search}%' order by created_at ${order}`,
        (err, result) => {
          promiseResolveReject(resolve, reject, err, result);
        },
      );
    } else {
      connection.query(
        `select order_id as order_history_id, status_order, total_price, (select product_name from order_detail inner join products on order_detail.product_id = products.product_id where order_id = order_history_id order by order_detail_id desc limit 1) as product_name, (select img_product from order_detail inner join products on order_detail.product_id = products.product_id where order_id = order_history_id order by order_detail_id desc limit 1) as img_product from orders where deleted = 0 and invoice_number LIKE '%${search}%' order by created_at ${order} limit ${start}, ${limit}`,
        (err, result) => {
          promiseResolveReject(resolve, reject, err, result);
        },
      );
    }
  } else if (start === '' && limit === '') {
    connection.query(
      `select order_id as order_history_id, status_order, total_price, (select product_name from order_detail inner join products on order_detail.product_id = products.product_id where order_id = order_history_id order by order_detail_id desc limit 1) as product_name, (select img_product from order_detail inner join products on order_detail.product_id = products.product_id where order_id = order_history_id order by order_detail_id desc limit 1) as img_product from orders where deleted = 0 and user_id = ${userId} and invoice_number LIKE '%${search}%' order by created_at ${order}`,
      (err, result) => {
        promiseResolveReject(resolve, reject, err, result);
      },
    );
  } else {
    connection.query(
      `select order_id as order_history_id, status_order, total_price, (select product_name from order_detail inner join products on order_detail.product_id = products.product_id where order_id = order_history_id order by order_detail_id desc limit 1) as product_name, (select img_product from order_detail inner join products on order_detail.product_id = products.product_id where order_id = order_history_id order by order_detail_id desc limit 1) as img_product from orders where deleted = 0 and user_id = ${userId} and invoice_number LIKE '%${search}%' order by created_at ${order} limit ${start}, ${limit}`,
      (err, result) => {
        promiseResolveReject(resolve, reject, err, result);
      },
    );
  }
});

const checkExistOrder = (fieldValue, field) => new Promise((resolve, reject) => {
  connection.query(`SELECT * FROM orders where ${field} = ?`, fieldValue, (error, result) => {
    promiseResolveReject(resolve, reject, error, result);
  });
});

const updateOrder = (data, id) => new Promise((resolve, reject) => {
  connection.query('UPDATE orders set ? where order_id = ?', [data, id], (error, result) => {
    promiseResolveReject(resolve, reject, error, result);
  });
});

module.exports = {
  getHistory,
  checkExistOrder,
  updateOrder,
};
