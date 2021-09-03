import sizezModel from '../models/sizezModel.js';
import { response, responseError } from '../helpers/helpers.js';

const addSize = async (req, res, next) => {
  try {
    const data = req.body;
    const checkExistSize = await sizezModel.showSize('size_name', data.size_name);
    if (checkExistSize.length > 0) {
      return responseError(res, 'Invalid input', 422, 'This size already exist');
    }
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
  try {
    const allSize = await sizezModel.getSize();
    response(res, 'Success', 200, 'All size successfully loaded', allSize);
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
    const checkExistSize = await sizezModel.showSize('size_id', sizeId);
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
