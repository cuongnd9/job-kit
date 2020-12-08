import { Model, DataTypes } from 'sequelize';
import { sequelize } from './sequelize';

import User from './user.model';
import Ground from './ground.model';

class Rating extends Model {
  public userId: string;

  public groundId: string;

  public point: number;

  static associate() {
    this.belongsTo(User, {
      as: 'user',
      foreignKey: 'userId',
    });
    this.belongsTo(Ground, {
      as: 'ground',
      foreignKey: 'groundId',
    });
  }
}

Rating.init({
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
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
  groundId: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    validate: {
      notEmpty: true,
    },
    references: {
      model: 'GROUND',
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  point: {
    type: DataTypes.FLOAT, // point need to have point ex: 4.5
    allowNull: false,
    validate: {
      isNumeric: true,
      max: 5,
      min: 0,
    },
  },
}, {
  sequelize,
  modelName: 'RATING',
  timestamps: false,
});

export default Rating;
