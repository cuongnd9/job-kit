import { Model, DataTypes } from 'sequelize';
import moment from 'moment';
import { sequelize } from './sequelize';
// import { SUB_GROUND_STATUS } from '../components/constants';
import SubGround from './subGround.model';

// const subGroundStatus: any = Object.values(SUB_GROUND_STATUS);

class Price extends Model {
  public id: string;

  public price: number;

  public discount: number;

  public startTime: string;

  public endTime: string;

  // public status: string;

  public subGroundId: string;

  public createdAt: Date;

  static associate() {
    this.belongsTo(SubGround, {
      as: 'subGround',
      foreignKey: 'subGroundId',
    });
  }
}

Price.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      isNumeric: true,
      min: 0,
    },
  },
  discount: { // percentation
    type: DataTypes.FLOAT,
    validate: {
      isNumeric: true,
      min: 0,
      max: 100,
    },
  },
  startTime: {
    type: DataTypes.TIME,
    allowNull: false,
    validate: {
      notEmpty: true,
      startTimeShouldBeforeEndTime(startTime: any) {
        const { endTime }: any = this;

        if (endTime === null) return;
        if (startTime === null || startTime.trim() === '') return;

        if (moment(startTime, 'HH:mm:ss').isAfter(moment(endTime, 'HH:mm:ss'))) {
          throw new Error('Start time shoudld before End time!');
        }
      }
    }
  },
  endTime: {
    type: DataTypes.TIME,
    allowNull: false,
    validate: {
      notEmpty: true,
      endTimeShouldAfterStartTime(endTime: any) {
        const { startTime }: any = this;

        if (startTime === null) return;
        if (endTime === null || endTime.trim() === '') return;

        if (moment(endTime, 'HH:mm:ss').isBefore(moment(startTime, 'HH:mm:ss'))) {
          throw new Error('End time shoudld after Start time!');
        }
      }
    }
  },
  // status: {
  //   type: DataTypes.ENUM(subGroundStatus),
  //   allowNull: false,
  // },
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
  createdAt: {
    type: DataTypes.DATE,
  },
}, {
  sequelize,
  modelName: 'PRICE',
  updatedAt: false,
});

export default Price;
