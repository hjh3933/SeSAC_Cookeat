const Follows = function (Sequelize, DataTypes) {
    const model = Sequelize.define(
        "Follows",
        {
            followId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            followerId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "Users",
                    key: "id",
                },
            },
            followingId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "Users",
                    key: "id",
                },
            },
        },
        {
            timestamps: true,
            freezeTableName: true,
        }
    );
    return model;
};
module.exports = Follows;
