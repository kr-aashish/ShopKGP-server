module.exports = (sequelize, DataTypes) => {
    const product = sequelize.define("product", {
        itemId: {
            type: DataTypes.UUID, 
            defaultValue: sequelize.UUIDV4, 
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING, 
            allowNull: false,
        }, 
        description: {
            type: DataTypes.TEXT, 
            allowNull: false,
        }, 
        price: {
            type: DataTypes.DECIMAL(10, 2), 
            allowNull: false,
        }, 
        imageUrl: {
            type: DataTypes.STRING, 
            allowNull: false,
        }, 
        category: {
            type: DataTypes.STRING, 
            allowNull: false,
        },
    });

    product.associate = (models) => {
        product.belongsTo(models.users, {
            foreignKey: {
                name: "sellerId",
                allowNull: false,
            },
            onDelete: "CASCADE",
            as: 'seller'
        });

        product.hasOne(models.stock, {
            foreignKey: "itemId",
        });

        // product.belongsToMany(models.order, {
        //     through: "OrderProduct",
        //     foreignKey: "itemId",
        // });

        product.belongsTo(models.order, {
            foreignKey: 'orderId',
            onDelete: 'SET NULL',
        });
    };

    return product;
}