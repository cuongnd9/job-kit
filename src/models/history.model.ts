import { Model, DataTypes } from 'sequelize';

import { sequelize } from './sequelize';
import Order from './order.model';
import { ORDER_STATUS } from '../components/constants';

const orderStatus: any = Object.values(ORDER_STATUS);

class History extends Model {
  public id: string;

  public orderId: string;

  public orderStatus: string;

  public createdAt: Date;

  static associate() {
    this.belongsTo(Order, {
      as: 'order',
      foreignKey: 'orderId',
    });
  }
}

History.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  orderId: {
    type: DataTypes.UUID,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    references: {
      model: 'ORDER',
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  orderStatus: {
    type: DataTypes.ENUM(orderStatus),
  },
  createdAt: {
    type: DataTypes.DATE,
  },
}, {
  sequelize,
  modelName: 'HISTORY',
  updatedAt: false,
});

export default History;
