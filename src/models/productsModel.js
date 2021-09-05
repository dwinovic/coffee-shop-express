import connection from '../configs/db.js';
import { promiseResolveReject } from '../helpers/helpers.js';

const checkDeliveries = (id) => new Promise((resolve, reject) => {
  connection.query('SELECT * FROM deliveries WHERE delivery_id IN (?)', [id], (error, result) => {
    promiseResolveReject(resolve, reject, error, result);
  });
});

const checkSizes = (id) => new Promise((resolve, reject) => {
  connection.query('SELECT * FROM sizes WHERE size_id IN (?)', [id], (error, result) => {
    promiseResolveReject(resolve, reject, error, result);
  });
});

const checkCategory = (id) => new Promise((resolve, reject) => {
  connection.query('SELECT * FROM categories WHERE category_id = ?', id, (error, result) => {
    promiseResolveReject(resolve, reject, error, result);
  });
});

const insertProduct = (data) => new Promise((resolve, reject) => {
  connection.query('INSERT INTO products set ?', data, (error, result) => {
    promiseResolveReject(resolve, reject, error, result);
  });
});

const updateProduct = (data, id) => new Promise((resolve, reject) => {
  connection.query('UPDATE products set ? where product_id = ? ', [data, id], (error, result) => {
    promiseResolveReject(resolve, reject, error, result);
  });
});

const insertSizeProduct = (data, idProduct) => new Promise((resolve, reject) => {
  connection.query(
    'INSERT INTO product_size (product_id, size_id) VALUES ?',
    [data.map((value) => [idProduct, value])],
    (error, result) => {
      promiseResolveReject(resolve, reject, error, result);
    },
  );
});

const insertDeliveryProduct = (data, idProduct) => new Promise((resolve, reject) => {
  connection.query(
    'INSERT INTO delivery_product (product_id, delivery_id) VALUES ?',
    [data.map((value) => [idProduct, value])],
    (error, result) => {
      promiseResolveReject(resolve, reject, error, result);
    },
  );
});

const checkExistProduct = (fieldValue, field) => new Promise((resolve, reject) => {
  connection.query(`SELECT * FROM products where ${field} = ?`, fieldValue, (error, result) => {
    promiseResolveReject(resolve, reject, error, result);
  });
});

const getSizeProduct = (fieldValue, field) => new Promise((resolve, reject) => {
  connection.query(`SELECT * FROM product_size WHERE ${field} = ?`, fieldValue, (error, result) => {
    promiseResolveReject(resolve, reject, error, result);
  });
});

const getDeliveryProduct = (fieldValue, field) => new Promise((resolve, reject) => {
  connection.query(`SELECT * FROM delivery_product WHERE ${field} = ?`, fieldValue, (error, result) => {
    promiseResolveReject(resolve, reject, error, result);
  });
});

const deleteSizeProduct = (data, idProduct) => new Promise((resolve, reject) => {
  connection.query(
    `DELETE FROM product_size WHERE product_id = ${idProduct} AND (size_id) IN (?)`,
    [data],
    (error, result) => {
      promiseResolveReject(resolve, reject, error, result);
    },
  );
});

const deleteDeliveryProduct = (data, idProduct) => new Promise((resolve, reject) => {
  connection.query(
    `DELETE FROM delivery_product WHERE product_id = ${idProduct} AND (delivery_id) IN (?)`,
    [data],
    (error, result) => {
      promiseResolveReject(resolve, reject, error, result);
    },
  );
});

const checkRealtionOrderDetailsProduct = (id) => new Promise((resolve, reject) => {
  connection.query(
    `SELECT products.* , order_detail.* FROM products
    INNER JOIN order_detail ON products.product_id = order_detail.product_id
    WHERE products.product_id = ?`,
    id,
    (error, result) => {
      promiseResolveReject(resolve, reject, error, result);
    },
  );
});

const deleteProduct = (id) => new Promise((resolve, reject) => {
  connection.query('DELETE FROM products where product_id = ?', id, (error, result) => {
    promiseResolveReject(resolve, reject, error, result);
  });
});

const readProduct = (search, order, fieldOrder, start = '', limit = '') => new Promise((resolve, reject) => {
  if (limit !== '' && start !== '') {
    connection.query(
      `SELECT * FROM products WHERE product_name LIKE "%${search}%" ORDER BY ${fieldOrder} ${order} LIMIT ${start} , ${limit}`,
      (error, result) => {
        promiseResolveReject(resolve, reject, error, result);
      },
    );
  } else {
    connection.query(
      `SELECT * FROM products WHERE product_name LIKE "%${search}%" ORDER BY ${fieldOrder} ${order}`,
      (error, result) => {
        promiseResolveReject(resolve, reject, error, result);
      },
    );
  }
});

const readProductByCategory = (categoryId, search, order, fieldOrder, start = '', limit = '') => new Promise((resolve, reject) => {
  if (limit !== '' && start !== '') {
    connection.query(
      `SELECT * FROM products WHERE product_name LIKE "%${search}%" AND category_id = ${categoryId} 
      ORDER BY ${fieldOrder} ${order} LIMIT ${start} , ${limit}`,
      (error, result) => {
        promiseResolveReject(resolve, reject, error, result);
      },
    );
  } else {
    connection.query(
      `SELECT * FROM products WHERE product_name LIKE "%${search}%" AND category_id = ${categoryId} 
      ORDER BY ${fieldOrder} ${order}`,
      (error, result) => {
        promiseResolveReject(resolve, reject, error, result);
      },
    );
  }
});

const getAllProductSize = (id) => new Promise((resolve, reject) => {
  connection.query(`SELECT sizes.* FROM product_size INNER JOIN sizes ON sizes.size_id = product_size.size_id
  WHERE product_size.product_id = ?`, id, (error, result) => {
    promiseResolveReject(resolve, reject, error, result);
  });
});

const getAllProductDelivery = (id) => new Promise((resolve, reject) => {
  connection.query(
    `SELECT deliveries.* FROM delivery_product INNER JOIN deliveries ON deliveries.delivery_id = delivery_product.delivery_id
    WHERE delivery_product.product_id = ?`,
    id,
    (error, result) => {
      promiseResolveReject(resolve, reject, error, result);
    },
  );
});

export default {
  checkDeliveries,
  checkSizes,
  checkCategory,
  insertProduct,
  updateProduct,
  insertSizeProduct,
  insertDeliveryProduct,
  checkExistProduct,
  getSizeProduct,
  getDeliveryProduct,
  deleteSizeProduct,
  deleteDeliveryProduct,
  checkRealtionOrderDetailsProduct,
  deleteProduct,
  readProduct,
  getAllProductSize,
  getAllProductDelivery,
  readProductByCategory,
};
