import CatJob from './cat.job';
import OrderJob from './order.job';

const executeJobs = () => {
  CatJob.catchMouse();

  OrderJob.catchMounse();
};

export { executeJobs };
