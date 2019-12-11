// 사용자
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {

        useremail: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        userpw: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        birth: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        gender: {
            type: DataTypes.STRING(1),
            allowNull: false
        }, 
        phone: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        info: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        photofullroute: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        
    }, {
        timestamps: false
    });
}
