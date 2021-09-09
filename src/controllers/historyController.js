import { response, responsePagination, responseError } from '../helpers/helpers.js';
import historyModel from '../models/historyModel.js';

const getHistory = async (req, res, next) => {
//   let userId = 8;
//   const roles = 'member';
  const search = req.query.search || '';
  let userId = req.userLogin.user_id;
  const { roles } = req.userLogin;
  if (roles === 'admin') {
    userId = 0;
  }
  const StatusPagination = req.query.pagination || 'on';
  let order = req.query.order || '';
  if (order.toUpperCase() === 'ASC') {
    order = 'ASC';
  } else if (order.toUpperCase() === 'DESC') {
    order = 'DESC';
  } else {
    order = 'DESC';
  }
  try {
    let histories;
    let pagination;
    const allRecord = await historyModel.getHistory(search, userId, order);
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
        histories = await historyModel.getHistory(search, userId, order, start, limit);
        return responsePagination(res, 'success', 200, 'Data histories', histories, pagination);
      }
      histories = await historyModel.getHistory(search, userId, order);
      return response(res, 'success', 200, 'Data histories', histories);
    }
    response(res, 'Not found', 200, 'Deliveries not found', allRecord);
  } catch (err) {
    next(err);
  }
};

const deleteHistory = async (req, res, next) => {
  try {
    const checkExistOrder = await historyModel.checkExistOrder(req.params.id, 'order_id');
    if (checkExistOrder.length > 0) {
      const deleteDataHistory = await historyModel.updateOrder({ deleted: 1 }, req.params.id);
      if (deleteDataHistory.affectedRows) {
        response(res, 'success', 200, 'successfully deleted history data', {});
      }
    } else {
      responseError(res, 'Not found', 404, 'Data history not found', {});
    }
  } catch (error) {
    next(error);
  }
};

export default {
  getHistory,
  deleteHistory,
};
