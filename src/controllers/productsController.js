import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs/promises';
import productsModel from '../models/productsModel.js';
import {
  responseError, response, createFolderImg, responsePagination,
} from '../helpers/helpers.js';

const createProduct = async (req, res, next) => {
  try {
    let data = {
      product_name: req.body.product_name,
      category_id: req.body.category_id,
      description: req.body.description,
      stock: req.body.stock,
      price: req.body.price,
      delivery_start_date: req.body.delivery_start_date,
      delivery_end_date: req.body.delivery_start_date,
    };
    const checkExistDeliveries = await productsModel.checkDeliveries(req.body.delivery_id);
    const checkExistSizes = await productsModel.checkSizes(req.body.size_id);
    const checkExistCategory = await productsModel.checkCategory(req.body.category_id);
    if (
      checkExistCategory.length > 0
      && req.body.delivery_id.length === checkExistDeliveries.length
      && req.body.size_id.length === checkExistSizes.length
    ) {
      if (req.files) {
        if (req.files.img_product) {
          createFolderImg('/public/img/img_product');
          const fileName = uuidv4() + path.extname(req.files.img_product.name);
          const savePath = path.join(path.dirname(''), '/public/img/img_product', fileName);
          data = { ...data, img_product: `public/img/img_product/${fileName}` };
          await req.files.img_product.mv(savePath);
        }
      }
      const insertProduct = await productsModel.insertProduct(data);
      if (insertProduct.affectedRows) {
        await productsModel.insertDeliveryProduct(req.body.delivery_id, insertProduct.insertId);
        await productsModel.insertSizeProduct(req.body.size_id, insertProduct.insertId);
        response(res, 'success', 200, 'successfully added product data', data);
      }
    } else {
      responseError(res, 'Wrong data', 404, 'the data entered is not correct', {});
    }
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    let data = {
      product_name: req.body.product_name,
      category_id: req.body.category_id,
      description: req.body.description,
      stock: req.body.stock,
      price: req.body.price,
    };
    const checkExistDeliveries = await productsModel.checkDeliveries(req.body.delivery_id);
    const checkExistSizes = await productsModel.checkSizes(req.body.size_id);
    const checkExistCategory = await productsModel.checkCategory(req.body.category_id);
    const checkExistProduct = await productsModel.checkExistProduct(req.params.id, 'product_id');
    if (checkExistProduct.length > 0) {
      if (
        checkExistCategory.length > 0
        && req.body.delivery_id.length === checkExistDeliveries.length
        && req.body.size_id.length === checkExistSizes.length
      ) {
        const dataSizeProduct = await productsModel.getSizeProduct(req.params.id, 'product_id');
        const dataDeliveryProduct = await productsModel.getDeliveryProduct(req.params.id, 'product_id');
        const recentSizeProduct = [];
        const recentDeliveryProduct = [];
        let deleteSizeProduct = [];
        let insertSizeProduct = [];
        let deleteDeliveryProduct = [];
        let insertDeliveryProduct = [];
        dataSizeProduct.forEach((size) => recentSizeProduct.push(size.size_id));
        dataDeliveryProduct.forEach((delivery) => recentDeliveryProduct.push(delivery.delivery_id));
        if (Array.isArray(req.body.size_id)) {
          deleteSizeProduct = recentSizeProduct.filter((x) => !req.body.size_id.includes(x));
          insertSizeProduct = req.body.size_id.filter((x) => !recentSizeProduct.includes(x));
        }
        if (Array.isArray(req.body.delivery_id)) {
          deleteDeliveryProduct = recentDeliveryProduct.filter((x) => !req.body.delivery_id.includes(x));
          insertDeliveryProduct = req.body.delivery_id.filter((x) => !recentDeliveryProduct.includes(x));
        }
        if (deleteSizeProduct.length > 0) {
          await productsModel.deleteSizeProduct(deleteSizeProduct, req.params.id);
        }
        if (insertSizeProduct.length > 0) {
          await productsModel.insertSizeProduct(insertSizeProduct, req.params.id);
        }
        if (deleteDeliveryProduct.length > 0) {
          await productsModel.deleteDeliveryProduct(deleteDeliveryProduct, req.params.id);
        }
        if (insertDeliveryProduct.length > 0) {
          await productsModel.insertDeliveryProduct(insertDeliveryProduct, req.params.id);
        }
        if (req.files) {
          if (req.files.img_product) {
            createFolderImg('/public/img/img_product');
            if (checkExistProduct[0].img_product && checkExistProduct[0].img_product.length > 10) {
              fs.unlink(path.join(path.dirname(''), `/${checkExistProduct[0].img_product}`));
            }
            const fileName = uuidv4() + path.extname(req.files.img_product.name);
            const savePath = path.join(path.dirname(''), '/public/img/img_product', fileName);
            data = { ...data, img_product: `public/img/img_product/${fileName}` };
            await req.files.img_product.mv(savePath);
          }
        }
        const changeDataProduct = await productsModel.updateProduct(data, req.params.id);
        if (changeDataProduct.affectedRows) {
          response(res, 'success', 200, 'successfully updated product data', {});
        }
      } else {
        responseError(res, 'Wrong data', 404, 'the data entered is not correct', {});
      }
    } else {
      responseError(res, 'Not found', 404, 'Product data not found', {});
    }
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const checkExistProduct = await productsModel.checkExistProduct(req.params.id, 'product_id');
    const checkRealtion = await productsModel.checkRealtionOrderDetailsProduct(req.params.id);
    if (checkExistProduct.length > 0) {
      if (checkRealtion.length === 0) {
        const removeDataProduct = await productsModel.deleteProduct(req.params.id);
        if (removeDataProduct.affectedRows) {
          if (checkExistProduct[0].img_product && checkExistProduct[0].img_product.length > 10) {
            fs.unlink(path.join(path.dirname(''), `/${checkExistProduct[0].img_product}`));
          }
          response(res, 'success', 200, 'successfully deleted product data', {});
        }
      } else if (checkRealtion.length > 0) {
        responseError(
          res,
          'data relation',
          409,
          'product data cannot be deleted because it is related to other data',
          {},
        );
      }
    } else {
      responseError(res, 'failed', 404, 'the data you want to delete does not exist', {});
    }
  } catch (error) {
    next(error);
  }
};

const readProduct = async (req, res, next) => {
  const search = req.query.search || '';
  let order = req.query.order || '';
  if (order.toUpperCase() === 'ASC') {
    order = 'ASC';
  } else if (order.toUpperCase() === 'DESC') {
    order = 'DESC';
  } else {
    order = 'DESC';
  }
  let { fieldOrder } = req.query;
  if (fieldOrder) {
    if (fieldOrder.toLowerCase() === 'product_name') {
      fieldOrder = 'product_name';
    } else if (fieldOrder.toLowerCase() === 'price') {
      fieldOrder = 'price';
    } else if (fieldOrder.toLowerCase() === 'stock') {
      fieldOrder = 'stock';
    } else {
      fieldOrder = 'product_id';
    }
  } else {
    fieldOrder = 'product_id';
  }
  try {
    let dataProducts;
    let pagination;
    const lengthRecord = Object.keys(await productsModel.readProduct(search, order, fieldOrder)).length;
    if (lengthRecord > 0) {
      const limit = req.query.limit || 5;
      const pages = Math.ceil(lengthRecord / limit);
      let page = req.query.page || 1;
      let nextPage = parseInt(page, 10) + 1;
      let prevPage = parseInt(page, 10) - 1;
      if (nextPage > pages) {
        nextPage = pages;
      }
      if (prevPage < 1) {
        prevPage = 1;
      }
      if (page > pages) {
        page = pages;
      } else if (page < 1) {
        page = 1;
      }
      const start = (page - 1) * limit;
      pagination = {
        countData: lengthRecord,
        pages,
        limit: parseInt(limit, 10),
        curentPage: parseInt(page, 10),
        nextPage,
        prevPage,
      };
      dataProducts = await productsModel.readProduct(search, order, fieldOrder, start, limit);
      responsePagination(res, 'success', 200, 'data products', dataProducts, pagination);
    } else {
      dataProducts = await productsModel.readProduct(search, order, fieldOrder);
      response(res, 'success', 200, 'data products', dataProducts);
    }
  } catch (error) {
    next(error);
  }
};

const detailProduct = async (req, res, next) => {
  try {
    const checkExistProduct = await productsModel.checkExistProduct(req.params.id, 'product_id');
    const dataSize = await productsModel.getAllProductSize(req.params.id);
    const dataDelivery = await productsModel.getAllProductDelivery(req.params.id);
    if (checkExistProduct.length > 0) {
      const dataProduct = { ...checkExistProduct[0], size: dataSize, delivery: dataDelivery };
      response(res, 'Detail product', 200, 'Detail product', dataProduct);
    } else {
      responseError(res, 'Not found', 404, 'Data product not found', {});
    }
  } catch (error) {
    next(error);
  }
};

const readProductByCategory = async (req, res, next) => {
  try {
    const checkExistCategory = await productsModel.checkCategory(req.params.id);
    if (checkExistCategory.length > 0) {
      const search = req.query.search || '';
      let order = req.query.order || '';
      if (order.toUpperCase() === 'ASC') {
        order = 'ASC';
      } else if (order.toUpperCase() === 'DESC') {
        order = 'DESC';
      } else {
        order = 'DESC';
      }
      let { fieldOrder } = req.query;
      if (fieldOrder) {
        if (fieldOrder.toLowerCase() === 'product_name') {
          fieldOrder = 'product_name';
        } else if (fieldOrder.toLowerCase() === 'price') {
          fieldOrder = 'price';
        } else if (fieldOrder.toLowerCase() === 'stock') {
          fieldOrder = 'stock';
        } else {
          fieldOrder = 'product_id';
        }
      } else {
        fieldOrder = 'product_id';
      }
      let dataProducts;
      let pagination;
      const lengthRecord = Object.keys(await productsModel.readProductByCategory(req.params.id, search, order, fieldOrder)).length;
      if (lengthRecord > 0) {
        const limit = req.query.limit || 5;
        const pages = Math.ceil(lengthRecord / limit);
        let page = req.query.page || 1;
        let nextPage = parseInt(page, 10) + 1;
        let prevPage = parseInt(page, 10) - 1;
        if (nextPage > pages) {
          nextPage = pages;
        }
        if (prevPage < 1) {
          prevPage = 1;
        }
        if (page > pages) {
          page = pages;
        } else if (page < 1) {
          page = 1;
        }
        const start = (page - 1) * limit;
        pagination = {
          countData: lengthRecord,
          pages,
          limit: parseInt(limit, 10),
          curentPage: parseInt(page, 10),
          nextPage,
          prevPage,
        };
        dataProducts = await productsModel.readProductByCategory(req.params.id, search, order, fieldOrder, start, limit);
        responsePagination(res, 'success', 200, 'data products by category', dataProducts, pagination);
      } else {
        dataProducts = await productsModel.readProductByCategory(req.params.id, search, order, fieldOrder);
        response(res, 'success', 200, 'data products by category', dataProducts);
      }
    } else {
      responseError(res, 'Not found', 404, 'Data category not found', {});
    }
  } catch (error) {
    next(error);
  }
};

export default {
  createProduct,
  updateProduct,
  deleteProduct,
  readProduct,
  detailProduct,
  readProductByCategory,
};
