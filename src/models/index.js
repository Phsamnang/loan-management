import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";
import UserModel from "./user.js";
import CustomerModel from "./Customers.js";
import LoanModel from "./Laons.js";
import PaymentScheduleModel from "./PaymentSchedule.js";
import PaymentModel from "./Payment.js";

const User = UserModel(sequelize, DataTypes);
const Customers = CustomerModel(sequelize, DataTypes);
const Loans = LoanModel(sequelize, DataTypes);
const PaymentSchedule = PaymentScheduleModel(sequelize, DataTypes);
const Payment = PaymentModel(sequelize, DataTypes);

Customers.hasMany(Loans, {
  foreignKey: "customer_id",
  as: "loans",
  onDelete: "CASCADE",
});
Loans.belongsTo(Customers, {
  foreignKey: "customer_id",
  as: "customer",
});
User.hasMany(Loans, {
  foreignKey: "approved_by",
  as: "approvedLoans",
});
Loans.belongsTo(User, {
  foreignKey: "approved_by",
  as: "approver",
});
Loans.hasMany(PaymentSchedule, {
  foreignKey: "loan_id",
  as: "schedules",
  onDelete: "CASCADE",
});
PaymentSchedule.belongsTo(Loans, {
  foreignKey: "loan_id",
  as: "loan",
});
Loans.hasMany(Payment, {
  foreignKey: "loan_id",
  as: "payments",
  onDelete: "CASCADE",
});
Payment.belongsTo(Loans, {
  foreignKey: "loan_id",
  as: "loan",
});
PaymentSchedule.hasMany(Payment, {
  foreignKey: "schedule_id",
  as: "payments",
});
Payment.belongsTo(PaymentSchedule, {
  foreignKey: "schedule_id",
  as: "schedule",
});
User.hasMany(Payment, {
  foreignKey: "received_by",
  as: "receivedPayments",
});
Payment.belongsTo(User, {
  foreignKey: "received_by",
  as: "receiver",
});

export { User, Customers, Loans, PaymentSchedule, Payment };
