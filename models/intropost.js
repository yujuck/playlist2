// 취미소개글
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('intropost', {

        title: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        introphoto: {
            type: DataTypes.STRING(100),
            allowNull:false
        },

        createdAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
    }, {
        timestamps: false
    });
    
}
