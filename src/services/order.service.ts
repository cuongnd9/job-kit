import { sequelize } from "../models/sequelize";
import Order from "../models/order.model";
const { Op } = require("sequelize");
import { logger } from 'juno-js';
import User from "../models/user.model";
import SubGround from "../models/subGround.model";
import { ORDER_STATUS } from "../components/constants";

class OrderService {
  static async getOrders(filter: any) {

    if(filter.outOfTime) {
      return Order.findAll({
        where: {
          status: [ORDER_STATUS.approved, ORDER_STATUS.paid],
        }
      })
    }

    let whereConditon = {};
    let attributes: any = [];
    if (filter.status) {
      whereConditon = {
        status: filter.status
      }
    }

    if (filter.attributes && filter.attributes.length > 0) {
      attributes = [...filter.attributes]
    }
    return Order.findAll({
      where: {
        ...whereConditon
      },
      attributes: [...attributes]
    })
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
