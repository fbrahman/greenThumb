module.exports = function (sequelize, DataTypes) {
    let Favorites = sequelize.define("favorites", {
        userID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        plantID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    });
    return Favorites;
};
