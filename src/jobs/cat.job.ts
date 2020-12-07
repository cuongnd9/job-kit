import cron from 'node-cron';
import { logger } from 'juno-js';

class CatJob {
  static catchMouse() {
    // DOCS: https://github.com/node-cron/node-cron/
    // running a task every two minutes
    cron.schedule('*/2 * * * *', () => {
      // stuff 😻🖱
      logger.info('😻🖱😻🖱😻🖱😻🖱😻🖱😻🖱');
    });
  }
}

export default CatJob;
