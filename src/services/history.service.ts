import HistoryModel from '../models/history.model';

class HistoryService {
  static createHistory(data: any, transaction: any) {
    if (!transaction) {
      return HistoryModel.create(data);
    }
    return HistoryModel.create(data, transaction);
  }
}

export default HistoryService;
