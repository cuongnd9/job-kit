import cron from 'node-cron';
import { logger } from 'juno-js';
import CategoryService from '../services/category.service';

class CatJob {
  static catchMouse() {
    // DOCS: https://github.com/node-cron/node-cron/
    // running a task every two minutes
    cron.schedule('*/2 * * * *', async () => {
      // stuff 😻🖱
      logger.info('😻🖱😻🖱😻🖱😻🖱😻🖱😻🖱');
      const categories = await CategoryService.getCategories();
      console.log('json-=================', JSON.stringify(categories))
    });
  }
}

export default CatJob;
