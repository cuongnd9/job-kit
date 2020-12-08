import { Model, DataTypes } from 'sequelize';

import { sequelize } from './sequelize';
import Ground from './ground.model';

class Category extends Model {
  public id: string;

  public name: string;

  public createdAt: Date;

  static associate() {
    this.hasMany(Ground, {
      as: 'grounds',
      foreignKey: 'categoryId',
    });
  }
}

Category.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
    validate: {
      notEmpty: true,
    },
    unique: true,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATEONLY,
  },
}, {
  sequelize,
  modelName: 'CATEGORY',
  updatedAt: false,
});

export default Category;
