// 카테고리
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('category', {

        categoryname: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        }
    },{
        timestamps: false,  // 물리적 테이블 createdAt, updatedAt컬럼 자동추가 여부
    });
}
