module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('user', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }, 
        email: {
            type: DataTypes.STRING, 
            allowNull: false, 
            primaryKey: true,
        },
        userId: {
            type: DataTypes.UUID, 
            defaultValue: sequelize.UUID4, 
        },
        year: {
            type: DataTypes.INTEGER, 
            allowNull: true,
        }, 
        password: {
            type: DataTypes.STRING, 
            allowNull: false,
        },
        department: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return user;
}