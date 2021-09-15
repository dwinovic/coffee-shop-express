/* eslint-disable no-unused-vars */
const { v4: uuidv4 } = require('uuid');
const ordersModel = require('../models/ordersModel');
const { response } = require('../helpers/helpers');

const createOrder = async (req, res, next) => {
  try {
    const idProducts = [];
    const combineCartOrders = req.body.carts.reduce((accumulator, cur) => {
      const productId = cur.cart_product_id;
      const found = accumulator.find((elem) => elem.cart_product_id === productId);
      if (found) {
        found.cart_stock += cur.cart_stock;
        found.total_price += cur.total_price;
      } else {
        accumulator.push(cur);
      }
      return accumulator;
    }, []);
    combineCartOrders.forEach((cart) => {
      idProducts.push(cart.cart_product_id);
      delete cart.cart_deliver_id;
      delete cart.cart_deliver_name;
      delete cart.cart_size_id;
      delete cart.cart_size_name;
      delete cart.cart_time_dineIn;
      delete cart.product_price;
      delete cart.product_img_product;
      delete cart.product_stock;
      delete cart.product_name;
    });
    const checkDataProducts = await ordersModel.checkProducts(idProducts);
    let error = 0;
    const updateProduct = [];
    if (checkDataProducts.length === idProducts.length) {
      combineCartOrders.forEach((cartOrder, index) => {
        updateProduct.push(checkDataProducts[index].stock - cartOrder.cart_stock);
        if (cartOrder.cart_stock > checkDataProducts[index].stock) {
          error += 1;
        }
      });
      if (error === 0) {
        const orderDetails = [];
        let totalPrice = 0;
        req.body.cartOrders.forEach((cart) => {
          totalPrice += cart.total_price;
          orderDetails.push({
            order_id: null,
            delivery_id: cart.cart_deliver_id,
            size_id: cart.cart_size_id,
            product_id: cart.cart_product_id,
            item_price: cart.total_price,
            stock: cart.cart_stock,
            time_dine_in: cart.cart_time_dineIn,
          });
        });
        const order = {
          invoice_number: uuidv4(),
          user_id: req.userLogin.user_id,
          status_order: 'pending',
          phone_number: req.body.phone_number,
          address: req.body.address,
          total_price: totalPrice,
          payment: req.body.payment,
        };
        const addDataOrder = await ordersModel.insertOrder(order);
        orderDetails.forEach((orderDetail) => {
          orderDetail.order_id = addDataOrder.insertId;
        });
        const addDataOrderDetail = await ordersModel.insertOrderDetails(orderDetails);
        const updateDataProducts = await ordersModel.updateProducts(updateProduct, idProducts);
        if (addDataOrder.affectedRows && addDataOrderDetail.affectedRows) {
          response(res, 'success', 200, 'successfully added order data', []);
        }
      } else if (error > 0) {
        response(res, 'failed', 403, 'the number of products purchased does not match', []);
      }
    } else {
      response(res, 'failed', 404, 'data not match', []);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
};
