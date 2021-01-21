// Creating our Company model
module.exports = function(sequelize, DataTypes) {
  const Company = sequelize.define("Company", {
    name:{
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fax: {
        type: DataTypes.STRING,
        allowNull: false
    },
    logo: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: "Active",
        allowNull: true
      }
  });

  Company.associate = function(models) {
    // We're saying that a Company should belong to a Category
    // A Company can't be created without a Category due to the foreign key constraint
    Company.belongsTo(models.Category, {
      foreignKey: {
        allowNull: false
      }
    });
    Company.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
    Company.hasMany(models.Ad, {
        onDelete: "cascade"
      });
  };
  
  return Company;
};
