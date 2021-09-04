import connection from '../configs/db.js';
import { promiseResolveReject } from '../helpers/helpers.js';

const addcategory = (data) => new Promise((resolve, reject) => {
  connection.query('INSERT INTO categories SET ?', data, (err, result) => {
    promiseResolveReject(resolve, reject, err, result);
  });
});

const getCategories = () => new Promise((resolve, reject) => {
  connection.query('SELECT * FROM categories', (err, result) => {
    promiseResolveReject(resolve, reject, err, result);
  });
});

const showCategory = (field, fieldValue) => new Promise((resolve, reject) => {
  connection.query(`SELECT * FROM categories WHERE ${field} = '${fieldValue}'`, (err, result) => {
    promiseResolveReject(resolve, reject, err, result);
  });
});

export default {
  addcategory,
  showCategory,
  getCategories,
};
