module.exports = function (sequelize, DataTypes) {
    let Favorites = sequelize.define("favorites", {});

    Favorites.associate = function(models){
        Favorites.belongsTo(models.users);
        Favorites.belongsTo(models.plants);
    }

    return Favorites;
};
