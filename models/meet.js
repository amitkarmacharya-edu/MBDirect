module.exports = function (sequelize, DataTypes) {
  const Meet = sequelize.define("Meet", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    status:{
        type: DataTypes.STRING,
        defaultValue: "Active",
        allowNull: true,
    },
    start_time:{
        tyep: DataTypes.DATETIME,
        allowNull: false,
    },
    end_time:{
        tyep: DataTypes.DATETIME,
        allowNull: false,
    },
  });
   
  Order.associate = function(models) {
    Meet.belongsTo(models.User);
    Meet.belongsTo(models.Company);   
  };
  return User;
};
