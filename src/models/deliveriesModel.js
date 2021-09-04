import connection from '../configs/db.js';
import { promiseResolveReject } from '../helpers/helpers.js';

const addDeliveries = (data) => new Promise((resolve, reject) => {
  connection.query('INSERT INTO deliveries SET ?', data, (err, result) => {
    promiseResolveReject(resolve, reject, err, result);
  });
});

const showDeliveries = (field, fieldValue) => new Promise((resolve, reject) => {
  connection.query(`SELECT * FROM deliveries WHERE ${field} = '${fieldValue}'`, (err, result) => {
    promiseResolveReject(resolve, reject, err, result);
  });
});

const getDeliveries = (search, order, fieldOrder, start = '', limit = '') => new Promise((resolve, reject) => {
  if (limit === '' && start === '') {
    connection.query(
      `SELECT * FROM deliveries WHERE delivery_name LIKE '%${search}%' ORDER BY ${fieldOrder} ${order}`,
      (err, result) => {
        promiseResolveReject(resolve, reject, err, result);
      },
    );
  } else {
    connection.query(
      `SELECT * FROM deliveries WHERE delivery_name LIKE '%${search}%' ORDER BY ${fieldOrder} ${order} LIMIT ${start}, ${limit}`,
      (err, result) => {
        promiseResolveReject(resolve, reject, err, result);
      },
    );
  }
});

const updateDelivery = (deiveryId, data) => new Promise((resolve, reject) => {
  connection.query(`UPDATE deliveries SET ? WHERE delivery_id = ${deiveryId}`, data, (err, result) => {
    promiseResolveReject(resolve, reject, err, result);
  });
});

const deleteDelivery = (deliveryId) => new Promise((resolve, reject) => {
  connection.query(`DELETE FROM deliveries WHERE delivery_id = ${deliveryId}`, (err, result) => {
    promiseResolveReject(resolve, reject, err, result);
  });
});

const showRelationDelivery = (deliveryId) => new Promise((resolve, reject) => {
  connection.query(`SELECT * FROM delivery_product WHERE delivery_id = ${deliveryId}`, (err, result) => {
    promiseResolveReject(resolve, reject, err, result);
  });
});

export default {
  addDeliveries,
  showDeliveries,
  getDeliveries,
  updateDelivery,
  deleteDelivery,
  showRelationDelivery,
};
