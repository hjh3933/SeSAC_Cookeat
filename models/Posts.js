const Posts = function (Sequelize, DataTypes) {
    const model = Sequelize.define(
        "Posts",
        {
            postId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            title: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },
            content: {
                type: DataTypes.STRING(1000),
                allowNull: false,
            },
            img: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            category: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },
        },
        {
            timestamps: true,
            freezeTableName: true,
        }
    );

    return model;
};

module.exports = Posts;
