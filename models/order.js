module.exports = (sequelize, DataTypes) => {
    const order = sequelize.define("order", {
        orderId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        orderFulfilled: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        paymentInfo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        shippingAddress: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    order.associate = (models) => {
        order.belongsTo(models.users, {
            foreignKey: 'userId',
            onDelete: "SET NULL",
        });
        // order.belongsToMany(models.product, {
        //     through: 'OrderProduct',
        //     foreignKey: 'orderId',
        // });
        order.hasMany(models.product, {
            foreignKey: 'orderId',
            as: 'products',
        });
    };

    return order;
};
