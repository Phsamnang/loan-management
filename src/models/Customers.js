export default (sequelize, DataTypes) => {
  const Customer = sequelize.define(
    "customers", // Model name is "customers"
    {
      customer_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      first_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      address: {
        type: DataTypes.TEXT,
      },
      city: {
        type: DataTypes.STRING(100),
      },
      date_of_birth: {
        type: DataTypes.DATEONLY, // Use DATEONLY for just the date
      },
      id_number: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false,
      },
      status: {
        // Simulates the PostgreSQL 'customer_status' ENUM
        type: DataTypes.ENUM("active", "inactive", "pending", "approved"),
        defaultValue: "active",
        allowNull: false,
      },
    },
    {
      // Model Options
      timestamps: true,
      tableName: "customers", // Explicit table name
      // Map Sequelize's default createdAt/updatedAt fields to your snake_case column names
      createdAt: "created_at",
      updatedAt: "updated_at",
      // If you need hooks (like hashing a password), they would go here.
    }
  );

  // You can define associations here if needed later (e.g., Customer.hasMany(Loan))

  return Customer;
};
