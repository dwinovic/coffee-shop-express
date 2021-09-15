const deliveriesModel = require('../models/deliveriesModel');
const { response, responseError, responsePagination } = require('../helpers/helpers');

const addDeliveries = async (req, res, next) => {
  try {
    const data = req.body;
    await deliveriesModel.addDeliveries(data)
      .then((result) => {
        response(res, 'Success', 200, 'Successfully added data deliveries', result);
      })
      .catch((err) => {
        responseError(res, 'Error', 500, 'Failed add data deliveries, please try again later', err);
      });
  } catch (err) {
    next(err);
  }
};

const getDeliveries = async (req, res, next) => {
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
    if (fieldOrder.toLowerCase() === 'delivery_name') {
      fieldOrder = 'delivery_name';
    } else {
      fieldOrder = 'delivery_id';
    }
  } else {
    fieldOrder = 'delivery_id';
  }
  try {
    let deliveries;
    let pagination;
    const allRecord = await deliveriesModel.getDeliveries(search, order, fieldOrder);
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
        deliveries = await deliveriesModel.getDeliveries(search, order, fieldOrder, start, limit);
        return responsePagination(res, 'success', 200, 'data locations', deliveries, pagination);
      }
      deliveries = await deliveriesModel.getDeliveries(search, order, fieldOrder);
      return response(res, 'success', 200, 'data locations', deliveries);
    }
    response(res, 'Not found', 200, 'Deliveries not found');
  } catch (err) {
    next(err);
  }
};

const showDeliveries = async (req, res, next) => {
  try {
    let field = req.query.field || 'delivery_name';
    const fieldValue = req.query.fieldValue || ' ';
    if (field === 'delivery_id') {
      field = 'delivery_id';
    } else if (field === 'delivery_name') {
      field = 'delivery_name';
    } else {
      field = 'delivery_name';
    }
    const delivery = await deliveriesModel.showDeliveries(field, fieldValue);
    if (delivery.length > 0) {
      response(res, 'Success', 200, 'delivery successfully loaded', delivery[0]);
    } else {
      response(res, 'Not found', 200, `delivery with ${field} = ${fieldValue} not found`, {});
    }
  } catch (err) {
    next(err);
  }
};

const updateDelivery = async (req, res, next) => {
  try {
    const deliveryId = req.params.id;
    const data = req.body;
    const checkExistData = await deliveriesModel.showDeliveries('delivery_id', deliveryId);
    if (checkExistData.length < 1) {
      return responseError(res, 'Error', 404, 'the data to be updated does not exist');
    }
    const checkExistDeliveries = await deliveriesModel.showDeliveries('delivery_name', data.delivery_name);
    if (checkExistDeliveries.length > 0) {
      return responseError(res, 'Error', 422, 'This delivery already avaiable');
    }
    deliveriesModel.updateDelivery(deliveryId, data)
      .then((result) => {
        response(res, 'Success', 200, 'Data Deliveries successfullly updated', result);
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
    const deliveryId = req.params.id;
    const checkExistData = await deliveriesModel.showDeliveries('delivery_id', deliveryId);
    if (checkExistData.length < 1) {
      return responseError(res, 'Error', 404, 'the data to be deleted does not exist');
    }
    const checkExistRelation = await deliveriesModel.showRelationDelivery(deliveryId);
    if (checkExistRelation.length > 0) {
      return responseError(res, 'Error', 422, 'Cant delete! Some products use this delivery');
    }
    deliveriesModel.deleteDelivery(deliveryId)
      .then((result) => {
        response(res, 'Success', 200, 'Success deleted delivery', result);
      })
      .catch((err) => {
        responseError(res, 'Error', 500, 'Failed deleted delivery', err);
      });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addDeliveries,
  getDeliveries,
  showDeliveries,
  updateDelivery,
  deleteSize,
};
