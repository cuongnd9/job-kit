import cron from 'node-cron';
import { logger } from 'juno-js';
import OrderService from '../services/order.service';

class OrderJob {
  static catchMounse() {
    cron.schedule('*/2 * * * *', async () => {
      logger.info('hehehe')
      const orders = await OrderService.getOrders();

      logger.info(JSON.stringify(orders))
    })
  }
}

export default OrderJob;
