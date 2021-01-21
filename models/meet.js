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
        type: DataTypes.DATE,
        allowNull: true,
    },
    end_time:{
        type: DataTypes.DATE,
        allowNull: true,
    },
  });
   
  Meet.associate = function(models) {
    Meet.belongsTo(models.User);
    Meet.belongsTo(models.Company);   
  };
  return Meet;
};
