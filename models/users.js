module.exports = function (sequelize, DataTypes) {
    let Users = sequelize.define("users", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [1], 
            unique: {
                args:true, 
                msg:'That username is taken. Try again.'
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [1], 
            unique: {
                args:true,
                msg:'There is an account already associated with that email address.'
            }
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
