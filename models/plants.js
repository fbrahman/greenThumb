module.exports = function (sequelize, DataTypes) {
  let Plants = sequelize.define("plants", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    description: {
      type: DataTypes.TEXT
    },
    optimal_sun: {
      type: DataTypes.STRING
    },
    optimal_soil: {
      type: DataTypes.STRING
    },
    planting_considerations: {
      type: DataTypes.TEXT
    },
    when_to_plant: {
      type: DataTypes.TEXT
    },
    growing_from_seed: {
      type: DataTypes.TEXT
    },
    transplanting: {
      type: DataTypes.TEXT
    },
    spacing: {
      type: DataTypes.TEXT
    },
    watering: {
      type: DataTypes.TEXT
    },
    feeding: {
      type: DataTypes.TEXT
    },
    other_care: {
      type: DataTypes.TEXT
    },
    diseases: {
      type: DataTypes.TEXT
    },
    pests: {
      type: DataTypes.TEXT
    },
    harvesting: {
      type: DataTypes.TEXT
    },
    storage_use: {
      type: DataTypes.TEXT
    }
  });
  return Plants;
};
