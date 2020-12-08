import { Model, DataTypes } from 'sequelize';

import { sequelize } from './sequelize';
import { ROLE, GENDER } from '../components/constants';
import Ground from './ground.model';
import Comment from './comment.model';
import Order from './order.model';
import Rating from './rating.model';

const genderType: any = Object.values(GENDER);
const role: any = Object.values(ROLE);
// const favoriteFoot: any = Object.values(FAVORITE_FOOT);
class User extends Model {
  public id: string;

  public firstName: string;

  public lastName: string;

  public email: string;

  public phone: string;

  public address: string;

  public gender: string;

  public dob: string;

  public password: string;

  public avatar: string;

  public extraInfo: string;

  public socialNetwork: string;

  public momoQRCode: string;

  public role: string;

  public createdAt: Date;

  public updatedAt: Date;

  static associate() {
    this.hasMany(Ground, {
      as: 'grounds',
      foreignKey: 'userId',
    });
    this.hasMany(Comment, {
      as: 'comments',
      foreignKey: 'userId',
    });
    this.hasMany(Order, {
      as: 'orders',
      foreignKey: 'userId',
    });
    // https://sequelize.org/master/manual/assocs.html
    this.belongsToMany(Ground, {
      foreignKey: 'userId',
      through: Rating,
    });

    // this.belongsToMany(Post, {
    //   foreignKey: 'reportedBy',
    //   through: Report,
    // });
  }
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        isEmail: {
          msg: 'Email is invalid',
        },
      },
      unique: {
        name: 'email',
        msg: 'Email is already exits',
      },
    },
    phone: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [10, 10],
          msg: 'Phone number must be 10 numbers',
        },
        is: /^[\\+]?[(]?[0-9]{3}[)]?[-\s\\.]?[0-9]{3}[-\s\\.]?[0-9]{4,6}$/im,
      },
    },
    gender: {
      type: DataTypes.ENUM(genderType),
      allowNull: true,
    },
    address: {
      type: DataTypes.JSONB,
    },
    extraInfo: {
      type: DataTypes.JSONB,
    },
    socialNetwork: {
      type: DataTypes.JSONB,
    },
    momoQRCode: {
      type: DataTypes.TEXT,
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6, 225],
          msg: 'Password must be more than 6 characters',
        },
      },
    },
    avatar: {
      type: DataTypes.TEXT,
    },
    role: {
      type: DataTypes.ENUM(role),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'USER',
  }
);

export default User;
