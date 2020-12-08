import { Model, DataTypes } from 'sequelize';

import { sequelize } from './sequelize';
import Ground from './ground.model';
import Price from './price.model';
import Order from './order.model';

class SubGround extends Model {
  public id: string;

  public numberOfPlayers: number;

  public name: string;

  public groundId: string;

  public createdAt: Date;

  static associate() {
    this.belongsTo(Ground, {
      as: 'ground',
      foreignKey: 'groundId',
    });
    this.hasMany(Price, {
      as: 'prices',
      foreignKey: 'subGroundId',
    });
    this.hasMany(Order, {
      as: 'orders',
      foreignKey: 'subGroundId',
    });
  }
}

SubGround.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  numberOfPlayers: {
    type: DataTypes.INTEGER,
    validate: {
      isNumeric: true,
      min: 2,
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  groundId: {
    type: DataTypes.UUID,
    allowNull: false,
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
  createdAt: {
    type: DataTypes.DATE,
  },
}, {
  sequelize,
  modelName: 'SUB_GROUND',
  updatedAt: false,
});

export default SubGround;
