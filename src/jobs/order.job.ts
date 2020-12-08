const Redis = require('ioredis');
import cron from 'node-cron';
import moment from 'moment';
import { logger } from 'juno-js';
import OrderService from '../services/order.service';
import { redis } from '../components/redis';
import { ORDER_STATUS } from '../components/constants';
import Order from '../models/order.model';


// TODO
// WHY CAN NOT ADD TRANSACTION
class OrderJob {
  static catchMounse() {

    // FOR AUTO FINISHED OR CANCELLED TASK
    cron.schedule('*/2 * * * *', async () => {
      const orders = await OrderService.getOrders({ outOfTime: true });

      const checkOutOfTime = (startDay: any, endTime: any) => {
        console.log('endtime-------', startDay + ' ' + endTime);
        const day = startDay + ' ' + endTime;
        return moment().isAfter(day);
      }
      orders.forEach(async order => {
        const isOutOfTime = checkOutOfTime(order.startDay, order.endTime);
        console.log('isOutOfTime, ', isOutOfTime)
        if (isOutOfTime) {
          if (order.status === ORDER_STATUS.approved) {
            await Order.update({ status: ORDER_STATUS.cancelled }, { where: { id: order.id } })
          } else {
            await Order.update({ status: ORDER_STATUS.finished }, { where: { id: order.id } })
          }
        }
      })
      console.log('running a task every two minutes');
    });

    // FOR USER CREATE NEW ORDER
    cron.schedule('*/5 * * * *', async () => {
      const orders = await OrderService.getOrders({ status: ORDER_STATUS.waiting_for_approve, attributes: ['id', 'status'] });

      // const transaction = await sequelize.transaction();
      // TODO
      // MAP ALL ORDER ID AND CHECK IF ORDER ID DONT HAVE IN REDIS
      // => CHANGE STATUS TO CANCELLED
      // EX IS 30m
      try {
        orders.forEach(order => {
          redis.get(order.id, async (err: any, result: any) => {
            if (err) {
              console.log('error-------------', err);
            } else if (!result) {
              console.log('resultr-------------', result);
              await Order.update({ status: ORDER_STATUS.cancelled }, { where: { id: order.id } })
            }
          })
        })
        // await transaction.commit();
      } catch (error) {
        // await transaction.rollback();
      }

      logger.info(JSON.stringify(orders))
    });
  }
}

export default OrderJob;
