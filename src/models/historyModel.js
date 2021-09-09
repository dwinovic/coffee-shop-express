/* eslint-disable max-len */
import connection from '../configs/db.js';
import { promiseResolveReject } from '../helpers/helpers.js';

const getHistory = (userId, order, start = '', limit = '') => new Promise((resolve, reject) => {
  if (userId === 0) {
    if (start === '' && limit === '') {
      connection.query(
        `select order_id as order_history_id, status_order, total_price, (select product_name from order_detail inner join products on order_detail.product_id = products.product_id where order_id = order_history_id order by order_detail_id desc limit 1) as product_name, (select img_product from order_detail inner join products on order_detail.product_id = products.product_id where order_id = order_history_id order by order_detail_id desc limit 1) as img_product from orders order by created_at ${order}`,
        (err, result) => {
          promiseResolveReject(resolve, reject, err, result);
        },
      );
    } else {
      connection.query(
        `select order_id as order_history_id, status_order, total_price, (select product_name from order_detail inner join products on order_detail.product_id = products.product_id where order_id = order_history_id order by order_detail_id desc limit 1) as product_name, (select img_product from order_detail inner join products on order_detail.product_id = products.product_id where order_id = order_history_id order by order_detail_id desc limit 1) as img_product from orders order by created_at ${order} limit ${start}, ${limit}`,
        (err, result) => {
          promiseResolveReject(resolve, reject, err, result);
        },
      );
    }
  } else if (start === '' && limit === '') {
    connection.query(
      `select order_id as order_history_id, status_order, total_price, (select product_name from order_detail inner join products on order_detail.product_id = products.product_id where order_id = order_history_id order by order_detail_id desc limit 1) as product_name, (select img_product from order_detail inner join products on order_detail.product_id = products.product_id where order_id = order_history_id order by order_detail_id desc limit 1) as img_product from orders where user_id = ${userId} order by created_at ${order}`,
      (err, result) => {
        promiseResolveReject(resolve, reject, err, result);
      },
    );
  } else {
    connection.query(
      `select order_id as order_history_id, status_order, total_price, (select product_name from order_detail inner join products on order_detail.product_id = products.product_id where order_id = order_history_id order by order_detail_id desc limit 1) as product_name, (select img_product from order_detail inner join products on order_detail.product_id = products.product_id where order_id = order_history_id order by order_detail_id desc limit 1) as img_product from orders where user_id = ${userId} order by created_at ${order} limit ${start}, ${limit}`,
      (err, result) => {
        promiseResolveReject(resolve, reject, err, result);
      },
    );
  }
});

export default {
  getHistory,
};
