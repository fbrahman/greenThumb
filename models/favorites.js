module.exports = function (sequelize, DataTypes) {
    let Favorites = sequelize.define("favorites", {});

    // Favorites.associate = function(models){
    //     Favorites.belongsTo(models.User);
    //     Favorites.belongsTo(models.Plants);
    // }
    return Favorites;
};
