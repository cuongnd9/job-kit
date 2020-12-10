import { logger } from 'juno-js';
import Order from '../models/order.model';
import { sequelize } from '../models/sequelize';
import User from '../models/user.model';
import SubGround from '../models/subGround.model';
import { ORDER_STATUS } from '../components/constants';
import HistoryService from './history.service';

const { Op } = require('sequelize');

class OrderService {
  static async getOrders(filter: any) {
    if (filter.outOfTime) {
      return Order.findAll({
        where: {
          status: [ORDER_STATUS.approved, ORDER_STATUS.paid],
        },
      });
    }

    let whereConditon = {};
    let attributes: any = [];
    if (filter.status) {
      whereConditon = {
        status: filter.status,
      };
    }

    if (filter.attributes && filter.attributes.length > 0) {
      attributes = [...filter.attributes];
    }
    return Order.findAll({
      where: {
        ...whereConditon,
      },
      attributes: [...attributes],
    });
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

  static async updateStatus(orderId: any, status: any) {
    const transaction = await sequelize.transaction();
    try {
      await Order.update({ status }, { where: { id: orderId }, transaction });
      await HistoryService.createHistory({
        orderId,
        orderStatus: status,
      }, transaction);

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
    }
  }
}

export default OrderService;
