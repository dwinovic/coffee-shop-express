import connection from '../configs/db.js';
import { promiseResolveReject } from '../helpers/helpers.js';

const addDeliveries = (data) => new Promise((resolve, reject) => {
  connection.query('INSERT INTO deliveries SET ?', data, (err, result) => {
    promiseResolveReject(resolve, reject, err, result);
  });
});

const showDeliveries = (field, fieldValue) => new Promise((resolve, reject) => {
  connection.query(`SELECT * FROM deliveries WHERE ${field} like '%${fieldValue}%'`, (err, result) => {
    promiseResolveReject(resolve, reject, err, result);
  });
});

const getDeliveries = () => new Promise((resolve, reject) => {
  connection.query('SELECT * FROM deliveries', (err, result) => {
    promiseResolveReject(resolve, reject, err, result);
  });
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
