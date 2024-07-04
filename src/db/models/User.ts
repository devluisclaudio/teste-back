import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'
import { hashSync } from "bcryptjs";


interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
export interface UserInput extends Optional<UserAttributes, 'id' | 'email'> {}
export interface UserOuput extends Required<UserAttributes> {}

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
    public id!: number
    public name!: string
    public email!: string
    public password!: string
  
    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
  }
  
  User.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
      set(value: string) {
        this.setDataValue('password', hashSync(value, 8));
      },
    },
  }, {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true
  })
  
  export default User