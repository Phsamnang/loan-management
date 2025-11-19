export default (sequelize, DataTypes) => {
  const Loan = sequelize.define(
    "loans", // Model name is "loans"
    {
      loan_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // Foreign Key reference to the Customer model
        references: {
          model: "customers", // This assumes your Customer model table name is 'customers'
          key: "customer_id",
        },
      },
      loan_amount: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },
      interest_rate: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
      },
      payment_frequency: {
        // Simulates the PostgreSQL 'payment_frequency' ENUM
        type: DataTypes.ENUM("weekly", "bi-weekly", "monthly", "quarterly"),
        allowNull: false,
      },
      loan_term_months: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      total_installments: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      installment_amount: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },
      total_amount: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },
      disbursement_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      first_payment_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      last_payment_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      status: {
        // Simulates the PostgreSQL 'loan_status' ENUM
        type: DataTypes.ENUM(
          "pending",
          "approved",
          "disbursed",
          "paid",
          "default",
          "closed"
        ),
        defaultValue: "pending",
        allowNull: false,
      },
      approved_by: {
        type: DataTypes.INTEGER,
        allowNull: true, // Nullable until approved
        // Foreign Key reference to the User model
        references: {
          model: "users", // This assumes your User model table name is 'users'
          key: "user_id",
        },
      },
      approved_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      disbursed_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      // Model Options
      timestamps: true,
      tableName: "loans", // Explicit table name
      // Map Sequelize's default createdAt/updatedAt fields to your snake_case column names
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  /*
   * IMPORTANT: Define Associations Here
   * Once all your models are loaded, you should define the relationships.
   * Example:
   * Loan.belongsTo(models.Customer, { foreignKey: 'customer_id' });
   * Loan.belongsTo(models.User, { foreignKey: 'approved_by', as: 'Approver' });
   * Loan.belongsTo(models.LoanType, { foreignKey: 'loan_type_id' });
   */

  return Loan;
};
