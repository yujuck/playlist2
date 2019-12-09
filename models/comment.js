// 댓글
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('comment', {
        comment: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        
    }, {
        timestamps: false
    });
}