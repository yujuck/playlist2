// 즐겨찾기
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('favorite', {

        state: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
       },

    }, {
        timestamps: false
    });
}
