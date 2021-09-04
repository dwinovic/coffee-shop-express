import connection from '../configs/db.js';
import { promiseResolveReject } from '../helpers/helpers.js';

const addSize = (data) => new Promise((resolve, reject) => {
  connection.query('INSERT INTO sizes SET ?', data, (err, result) => {
    promiseResolveReject(resolve, reject, err, result);
  });
});

const showSize = (field, fieldValue) => new Promise((resolve, reject) => {
  connection.query(`SELECT * FROM sizes WHERE ${field} = '${fieldValue}'`, (err, result) => {
    promiseResolveReject(resolve, reject, err, result);
  });
});

const getSize = () => new Promise((resolve, reject) => {
  connection.query('SELECT * FROM sizes', (err, result) => {
    promiseResolveReject(resolve, reject, err, result);
  });
});

const updateSize = (sizeId, data) => new Promise((resolve, reject) => {
  connection.query(`UPDATE sizes SET ? WHERE size_id = ${sizeId}`, data, (err, result) => {
    promiseResolveReject(resolve, reject, err, result);
  });
});

const deleteSize = (sizeId) => new Promise((resolve, reject) => {
  connection.query(`DELETE FROM sizes WHERE size_id = ${sizeId}`, (err, result) => {
    promiseResolveReject(resolve, reject, err, result);
  });
});

const showRelationSize = (sizeId) => new Promise((resolve, reject) => {
  connection.query(`SELECT * FROM product_size WHERE size_id = ${sizeId}`, (err, result) => {
    promiseResolveReject(resolve, reject, err, result);
  });
});

export default {
  addSize,
  showSize,
  getSize,
  updateSize,
  deleteSize,
  showRelationSize,
};
