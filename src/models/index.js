
import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";
import UserModel from "./user.js";

const User = UserModel(sequelize, DataTypes);

export {
User
};
