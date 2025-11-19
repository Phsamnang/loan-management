export default (sequelize, DataTypes) => {
  const PaymentSchedule = sequelize.define(
    "payment_schedule", // Model name
    {
      schedule_id: {
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
        // Composite unique index with installment_number
        unique: "loan_installment_unique",
      },
      installment_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // Composite unique index with loan_id
        unique: "loan_installment_unique",
      },
      due_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      principal_amount: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },
      interest_amount: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },
      total_amount: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },
      outstanding_balance: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },
      status: {
        // Simulates the PostgreSQL 'schedule_status' ENUM
        type: DataTypes.ENUM("pending", "paid", "missed", "late", "waived"),
        defaultValue: "pending",
        allowNull: false,
      },
      paid_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
    },
    {
      // Model Options
      timestamps: true, // Automatically includes created_at and updated_at
      updatedAt: false, // Explicitly disable updated_at if you only track created_at
      tableName: "payment_schedule", // Explicit table name
      createdAt: "created_at",

      // If the model was intended to have an updated_at field, you would use:
      // updatedAt: "updated_at",

      // Sequelize handles the composite unique constraint defined by the 'unique' property above.
    }
  );

  /*
   * IMPORTANT: Define Associations Here
   * Once all your models are loaded, you should define the relationship with Loan.
   * Example:
   * PaymentSchedule.belongsTo(models.Loan, { foreignKey: 'loan_id' });
   * Loan.hasMany(models.PaymentSchedule, { foreignKey: 'loan_id' });
   */

  return PaymentSchedule;
};
