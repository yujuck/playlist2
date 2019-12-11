// 참여자정보
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('participants', {

        state: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0
       },

    }, {
        timestamps: false
    });
}
