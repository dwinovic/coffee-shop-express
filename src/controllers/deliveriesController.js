import deliveriesModel from '../models/deliveriesModel.js';
import { response, responseError } from '../helpers/helpers.js';

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
  try {
    const allDeliveries = await deliveriesModel.getDeliveries();
    response(res, 'Success', 200, 'All deliveries successfully loaded', allDeliveries);
  } catch (err) {
    next(err);
  }
};

const showDeliveries = async (req, res, next) => {
  try {
    const field = req.query.field || 'delivery_name';
    const fieldValue = req.query.fieldValue || ' ';
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
    const checkExistDeliveries = await deliveriesModel.showDeliveries('delivery_name', data.delivery_name);
    if (checkExistDeliveries.length > 0) {
      return responseError(res, 'Invalid input', 422, 'This delivery already exist', {});
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

export default {
  addDeliveries,
  getDeliveries,
  showDeliveries,
  updateDelivery,
  deleteSize,
};
