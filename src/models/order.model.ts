import { Model, DataTypes } from 'sequelize';
import moment from 'moment';
import { sequelize } from './sequelize';
import { PAYMENT_TYPE, ORDER_STATUS } from '../components/constants';
import SubGround from './subGround.model';
import User from './user.model';
import History from './history.model';

const paymentTypes: any = Object.values(PAYMENT_TYPE);
const orderStatus: any = Object.values(ORDER_STATUS);

class Order extends Model {
  public id: string;

  public subGroundId: string;

  public userId: string;

  public startDay: string;

  public startTime: string;

  public endTime: string;

  public paymentType: string;

  public status: string;

  public price: number;

  public discount: number;

  public createdAt: Date;

  public updatedAt: Date;

  static associate() {
    this.belongsTo(SubGround, {
      as: 'subGround',
      foreignKey: 'subGroundId',
    });

    this.belongsTo(User, {
      as: 'user',
      foreignKey: 'userId',
    });

    this.hasMany(History, {
      as: 'histories',
      foreignKey: 'orderId',
    });
  }
}

Order.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  subGroundId: {
    type: DataTypes.UUID,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    references: {
      model: 'SUB_GROUND',
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    references: {
      model: 'USER',
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  startDay: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    // get() {
    //   return moment(this.getDataValue('startDay')).format('DD-MM-YYYY');
    // },
  },
  startTime: {
    type: DataTypes.TIME,
    allowNull: false,
    validate: {
      notEmpty: true,
      startTimeShouldBeforeEndTime(startTime: any) {
        const { endTime, startDay }: any = this;

        if (endTime === null) return;
        if (startTime === null || startTime.trim() === '') return;

        const day = `${startDay} ${startTime}`;
        if (moment(day, 'DD-MM-YYYY HH:mm:ss').isBefore(moment())) {
          throw new Error('Start time or start day is invalied!');
        }

        if (moment(`${startDay} ${startTime}`, 'DD-MM-YYYY HH:mm:ss').isAfter(moment(`${startDay} ${endTime}`, 'DD-MM-YYYY HH:mm:ss'))) {
          throw new Error('Start time shoudld before End time!');
        }
      },
    },
  },
  endTime: {
    type: DataTypes.TIME,
    allowNull: false,
    validate: {
      notEmpty: true,
      endTimeShouldAfterStartTime(endTime: any) {
        const { startTime, startDay }: any = this;

        if (startTime === null) return;
        if (endTime === null || endTime.trim() === '') return;

        const day = `${startDay} ${endTime}`;
        if (moment(day, 'DD-MM-YYYY HH:mm:ss').isBefore(moment())) {
          throw new Error('End time or start day is invalid!');
        }

        if (moment(`${startDay} ${startTime}`, 'DD-MM-YYYY HH:mm:ss').isAfter(moment(`${startDay} ${endTime}`, 'DD-MM-YYYY HH:mm:ss'))) {
          throw new Error('End time shoudld after Start time!');
        }
      },
    },
  },
  paymentType: {
    type: DataTypes.ENUM(paymentTypes),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM(orderStatus),
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    validate: {
      isNumeric: true,
      min: 0,
    },
    allowNull: false,
  },
  discount: {
    type: DataTypes.FLOAT,
    validate: {
      isNumeric: true,
      min: 0,
      max: 100,
    },
    defaultValue: 0,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
}, {
  sequelize,
  modelName: 'ORDER',
});

export default Order;
