// Creating our Ad model
module.exports = function(sequelize, DataTypes) {
    const Ad = sequelize.define("Ad", {
      name:{
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true
      },
      discount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      status: {
          type: DataTypes.STRING,
          defaultValue: "Active",
          allowNull: true
        },
     start_date: {
          type: DataTypes.DATETIME,
          defaultValue: "Active",
          allowNull: true
        },
     end_date: {
          type: DataTypes.DATETIME,
          defaultValue: "Active",
          allowNull: true
        }
    });
  
    Ad.associate = function(models) {
      // We're saying that a Ad should belong to a Company
      // A Company can't be created without a Category due to the foreign key constraint
      Ad.belongsTo(models.Company, {
        foreignKey: {
          allowNull: false
        }
      });
    };
    
    return Ad;
  };
  