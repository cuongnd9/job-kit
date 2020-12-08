import { Model, DataTypes } from 'sequelize';

import { sequelize } from './sequelize';
import User from './user.model';
import Ground from './ground.model';

class Comment extends Model {
  public id: string;

  public comment: string;

  public parentId: string;

  public userId: string;

  public groundId: string;

  public createdAt: Date;

  public updatedAt: Date;

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

Comment.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
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
  parentId: {
    type: DataTypes.UUID,
    validate: {
      notEmpty: true,
    },
    references: {
      model: 'COMMENT',
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
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
  updatedAt: {
    type: DataTypes.DATE,
  },
}, {
  sequelize,
  modelName: 'COMMENT',
});

export default Comment;
