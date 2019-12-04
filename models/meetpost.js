// 모임정보
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('meetpost', {

        title: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        headcount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        age: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        meetphoto: {
            type: DataTypes.STRING(100),
            allowNull:false
        },
        record: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        count: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
    }, {
        timestamps: false
    });
}

