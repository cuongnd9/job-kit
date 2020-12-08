import { Model, DataTypes } from 'sequelize';

import { sequelize } from './sequelize';
import Category from './category.model';
import User from './user.model';
import Rating from './rating.model';
import Comment from './comment.model';
import SubGround from './subGround.model';

class Ground extends Model {
  public id: string;

  public title: string;

  public discription: string;

  public phone: string;

  public address: string;

  public benefit: string;

  public image: string;

  public userId: string;

  public categoryId: string;

  public createdAt: Date;

  public updatedAt: Date;

  // TODO: SHOULD I ADD REPORTING POST
  static associate() {
    this.belongsTo(Category, {
      as: 'category',
      foreignKey: 'categoryId',
    });

    this.belongsTo(User, {
      as: 'user',
      foreignKey: 'userId',
    });

    this.hasMany(Rating, {
      as: 'ratings',
      foreignKey: 'groundId',
    });

    this.hasMany(SubGround, {
      as: 'subGrounds',
      foreignKey: 'groundId',
    });

    this.belongsToMany(User, {
      foreignKey: 'groundId',
      as: 'ground',
      through: Rating,
    });

    this.hasMany(Comment, {
      as: 'comments',
      foreignKey: 'groundId',
    });
  }
}

Ground.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  phone: {
    type: DataTypes.STRING,
    validate: {
      is: /^[\\+]?[(]?[0-9]{3}[)]?[-\s\\.]?[0-9]{3}[-\s\\.]?[0-9]{4,6}$/im,
    },
  },
  address: {
    type: DataTypes.JSONB,
  },
  benefit: {
    type: DataTypes.STRING,
  },
  image: {
    type: DataTypes.JSONB,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'USER',
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  categoryId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'CATEGORY',
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
  modelName: 'GROUND',
});

export default Ground;
