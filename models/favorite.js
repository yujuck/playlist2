// 즐겨찾기
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('favorite', {

    }, {
        timestamps: false
    });
}
