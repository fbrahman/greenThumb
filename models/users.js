module.exports = function (sequelize, DataTypes) {
    let Users = sequelize.define("users", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [1], 
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [1], 
            unique: true
        },
        password: {
            type: DataTypes.STRING.BINARY, 
            allowNull:false,
            len:[1]
        }
    });

    Users.associate = function(models){
        Users.hasMany(models.favorites);
    };

    return Users;
};
