const Users = function (Sequelize, DataTypes) {
    const model = Sequelize.define(
        "Users",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            userId: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },
            password: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            userName: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            img: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
        },
        {
            timestamps: true,
            freezeTableName: true,
        }
    );

    return model;
};

module.exports = Users;
