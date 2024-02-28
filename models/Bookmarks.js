const Bookmarks = function (Sequelize, DataTypes) {
    const model = Sequelize.define(
        "Bookmarks",
        {
            bookmarkId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
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

module.exports = Bookmarks;
