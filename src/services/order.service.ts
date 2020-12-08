import { sequelize } from "../models/sequelize";
import Order from "../models/order.model";
const { Op } = require("sequelize");
import { logger } from 'juno-js';
import User from "../models/user.model";
import SubGround from "../models/subGround.model";

class OrderService {
  static async getOrders() {
   return  Order.findAll()
  }
  static async getOrderById(id: any, user: any) {
    let order: any;
    try {
      order = await Order.findOne({
        where: { id },
        include: [
          {
            model: User,
            as: 'user',
          },
          {
            model: SubGround,
            as: 'subGround',
          },
        ],
      });
      return { ...order.toJSON() };
    } catch (error) {
      if (!order) throw new Error('Order not found');
      throw error;
    }
  }
}

export default OrderService;
