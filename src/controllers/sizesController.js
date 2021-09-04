import sizezModel from '../models/sizezModel.js';
import { response, responseError, responsePagination } from '../helpers/helpers.js';

const addSize = async (req, res, next) => {
  try {
    const data = req.body;
    await sizezModel.addSize(data)
      .then((result) => {
        response(res, 'Success', 200, 'Successfully added data sizes', result);
      })
      .catch((err) => {
        responseError(res, 'Error', 500, 'Failed add data sizes, please try again later', err);
      });
  } catch (err) {
    next(err);
  }
};

const getSize = async (req, res, next) => {
  const StatusPagination = req.query.pagination || 'on';
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
    if (fieldOrder.toLowerCase() === 'size_name') {
      fieldOrder = 'size_name';
    } else {
      fieldOrder = 'size_id';
    }
  } else {
    fieldOrder = 'size_id';
  }
  try {
    let sizes;
    let pagination;
    const allRecord = await sizezModel.getSize(search, order, fieldOrder);
    if (allRecord.length > 0) {
      const limit = req.query.limit || 5;
      const pages = Math.ceil(allRecord.length / limit);
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
        countData: allRecord.length,
        pages,
        limit: parseInt(limit, 10),
        curentPage: parseInt(page, 10),
        nextPage,
        prevPage,
      };
      if (StatusPagination === 'on') {
        sizes = await sizezModel.getSize(search, order, fieldOrder, start, limit);
        return responsePagination(res, 'success', 200, 'data locations', sizes, pagination);
      }
      sizes = await sizezModel.getSize(search, order, fieldOrder);
      return response(res, 'success', 200, 'data locations', sizes);
    }
    response(res, 'Not found', 200, 'Deliveries not found');
  } catch (err) {
    next(err);
  }
};

const showSize = async (req, res, next) => {
  try {
    const field = req.query.field || 'size_name';
    const fieldValue = req.query.fieldValue || ' ';
    const size = await sizezModel.showSize(field, fieldValue);
    if (size.length > 0) {
      response(res, 'Success', 200, 'Size successfully loaded', size[0]);
    } else {
      response(res, 'Not found', 200, `size with ${field} = ${fieldValue} not found`, {});
    }
  } catch (err) {
    next(err);
  }
};

const updateSize = async (req, res, next) => {
  try {
    const sizeId = req.params.id;
    const data = req.body;
    const checkExistSize = await sizezModel.showSize('size_name', data.size_name);
    if (checkExistSize.length > 0) {
      return responseError(res, 'Invalid input', 422, 'This size already exist', {});
    }
    sizezModel.updateSize(sizeId, data)
      .then((result) => {
        response(res, 'Success', 200, 'Data size successfullly updated', result);
      })
      .catch((err) => {
        responseError(res, 'Error', 500, 'Failed update data', err);
      });
  } catch (err) {
    next(err);
  }
};

const deleteSize = async (req, res, next) => {
  try {
    const sizeId = req.params.id;
    const checkExistRelation = await sizezModel.showRelationSize(sizeId);
    if (checkExistRelation.length > 0) {
      return responseError(res, 'Error', 422, 'Cant delete! Some products use this size');
    }
    sizezModel.deleteSize(sizeId)
      .then((result) => {
        response(res, 'Success', 200, 'Success deleted sizes', result);
      })
      .catch((err) => {
        responseError(res, 'Error', 500, 'Failed deleted size', err);
      });
  } catch (err) {
    next(err);
  }
};

export default {
  addSize,
  getSize,
  showSize,
  updateSize,
  deleteSize,
};
