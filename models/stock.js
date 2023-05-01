module.exports = (sequelize, DataTypes) => {
    const stock = sequelize.define("stock", {
        stockId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

    stock.associate = (models) => {
        stock.belongsTo(models.product, {
            foreignKey: 'itemId',
        });
    };

    return stock;
};