const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//하나의 Table이랑 연결 - router에서도 사용
db.User = require('./user')(sequelize, Sequelize);
db.Category = require('./category')(sequelize, Sequelize);
db.MeetPost = require('./meetpost')(sequelize, Sequelize);
db.Participants = require('./participants')(sequelize, Sequelize);
db.MeetGood = require('./meetgood')(sequelize, Sequelize);
db.Favorite = require('./favorite')(sequelize, Sequelize);
db.Comment = require('./comment')(sequelize, Sequelize);
db.IntroPost = require('./intropost')(sequelize, Sequelize);

// User:MeetPost = 1:N
// MeetPost 테이블에 userid 컬럼 생성됨
db.User.hasMany(db.MeetPost);
db.MeetPost.belongsTo(db.User);

// User:Participants = 1:N
// Participants 테이블에 userid 컬럼 생성됨
db.User.hasMany(db.Participants);
db.Participants.belongsTo(db.User);

// User:MeetGood = 1:N
// MeetGood 테이블에 userid 컬럼 생성됨
db.User.hasMany(db.MeetGood);
db.MeetGood.belongsTo(db.User);

// User:Favorite = 1:N
// Favorite 테이블에 userid 컬럼 생성됨
db.User.hasMany(db.Favorite);
db.Favorite.belongsTo(db.User);

// Category:MeetPost = 1:N
// MeetPost 테이블에 categoryid 컬럼 생성됨
db.Category.hasMany(db.MeetPost);
db.MeetPost.belongsTo(db.Category);

// MeetPost:Participants = 1:N
// Participants 테이블에 MeetPostid 컬럼 생성됨
db.MeetPost.hasMany(db.Participants);
db.Participants.belongsTo(db.MeetPost);

// MeetPost:MeetGood = 1:N
// MeetGood 테이블에 MeetPostid 컬럼 생성됨
db.MeetPost.hasMany(db.MeetGood);
db.MeetGood.belongsTo(db.MeetPost);

// MeetPost:Favorite = 1:N
// Favorite 테이블에 MeetPostid 컬럼 생성됨
db.MeetPost.hasMany(db.Favorite);
db.Favorite.belongsTo(db.MeetPost);

// MeetPost:Comment = 1:N
// Comment 테이블에 MeetPostid 컬럼 생성됨
db.MeetPost.hasMany(db.Comment);
db.Comment.belongsTo(db.MeetPost);

// User:Comment = 1:N
// Comment 테이블에 Userid 컬럼 생성됨
db.User.hasMany(db.Comment);
db.Comment.belongsTo(db.User);

module.exports = db;
