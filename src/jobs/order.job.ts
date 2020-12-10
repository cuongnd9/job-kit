import cron from 'node-cron';
import moment from 'moment';
import { logger } from 'juno-js';
import OrderService from '../services/order.service';
import { redis } from '../components/redis';
import { ORDER_STATUS } from '../components/constants';
import Order from '../models/order.model';

const Redis = require('ioredis');

const checkOutOfTime = (startDay: any, endTime: any) => {
  console.log('endtime-------', `${startDay} ${endTime}`);
  const day = `${startDay} ${endTime}`;
  return moment().isAfter(day);
};

// TODO
// WHY CAN NOT ADD TRANSACTION
class OrderJob {
  static catchMounse() {
    // FOR AUTO FINISHED OR CANCELLED TASK
    cron.schedule('*/2 * * * *', async () => {
      const orders = await OrderService.getOrders({ outOfTime: true });

      orders.forEach(async (order) => {
        const isOutOfTime = checkOutOfTime(order.startDay, order.endTime);
        console.log('isOutOfTime, ', isOutOfTime);
        if (isOutOfTime) {
          if (order.status === ORDER_STATUS.approved) {
            await OrderService.updateStatus(order.id, ORDER_STATUS.cancelled);
          } else {
            await OrderService.updateStatus(order.id, ORDER_STATUS.finished);
          }
        }
      });
      console.log('running a task every two minutes');
    });

    // FOR USER CREATE NEW ORDER
    cron.schedule('*/5 * * * *', async () => {
      const orders = await OrderService.getOrders({ status: ORDER_STATUS.waiting_for_approve, attributes: ['id', 'status'] });

      // TODO
      // MAP ALL ORDER ID AND CHECK IF ORDER ID DONT HAVE IN REDIS
      // => CHANGE STATUS TO CANCELLED
      // EX IS 30m
      try {
        orders.forEach((order) => {
          redis.get(order.id, async (err: any, result: any) => {
            if (err) {
              console.log('error-------------', err);
            } else if (!result) {
              console.log('RESULT-------------', result);
              await OrderService.updateStatus(order.id, ORDER_STATUS.cancelled);
            }
          });
        });
      } catch (error) {
        console.log('error------------------', error);
      }

      logger.info(JSON.stringify(orders));
    });
  }
}

export default OrderJob;
