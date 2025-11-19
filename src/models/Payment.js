export default (sequelize, DataTypes) => {
  const Payment = sequelize.define(
    "payments", // Model name
    {
      payment_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      loan_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // Foreign Key reference to the Loan model
        references: {
          model: "loans", // Assumes your Loan model table name is 'loans'
          key: "loan_id",
        },
      },
      schedule_id: {
        type: DataTypes.INTEGER,
        allowNull: true, // Can be null if payment isn't tied to a specific schedule item
        // Foreign Key reference to the PaymentSchedule model
        references: {
          model: "payment_schedule", // Assumes your PaymentSchedule table name
          key: "schedule_id",
        },
      },
      payment_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      payment_amount: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },
      principal_paid: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },
      interest_paid: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },
      late_fee: {
        type: DataTypes.DECIMAL(15, 2),
        defaultValue: 0,
        allowNull: false,
      },
      payment_method: {
        // Simulates the PostgreSQL 'payment_method' ENUM
        type: DataTypes.ENUM(
          "cash",
          "bank_transfer",
          "credit_card",
          "cheque",
          "other"
        ),
        allowNull: false,
      },
      transaction_reference: {
        type: DataTypes.STRING(100),
      },
      notes: {
        type: DataTypes.TEXT,
      },
      received_by: {
        type: DataTypes.INTEGER,
        allowNull: true, // Can be null, though tracking who received the payment is often useful
        // Foreign Key reference to the User model
        references: {
          model: "users", // Assumes your User model table name is 'users'
          key: "user_id",
        },
      },
    },
    {
      // Model Options
      timestamps: true,
      updatedAt: false, // Disabling updated_at as it's not in the SQL schema
      tableName: "payments", // Explicit table name
      createdAt: "created_at",
    }
  );

  /*
   * IMPORTANT: Define Associations Here
   * Example:
   * Payment.belongsTo(models.Loan, { foreignKey: 'loan_id' });
   * Payment.belongsTo(models.PaymentSchedule, { foreignKey: 'schedule_id' });
   * Payment.belongsTo(models.User, { foreignKey: 'received_by', as: 'Receiver' });
   */

  return Payment;
};
