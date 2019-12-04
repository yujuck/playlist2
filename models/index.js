// //ORM을 의미(DB에 대한 데이터 처리가 직접적으로 되는 것은 아님, Server에서 쓰는 언어가 ORM을 통해 DB로 넘어가는 것 )
// //index 파일을 통해서 DB(mysql)과 연결하는 것임
// const path = require('path');
// const Sequelize = require('sequelize');

// const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/config.json')[env];
// const db = {};

// const sequelize = new Sequelize(config.database, config.username, config.password, config);

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// //하나의 Table이랑 연결 - router에서도 사용
// db.User = require('./user')(sequelize, Sequelize);
// db.Category = require('./category')(sequelize, Sequelize);
// db.Meetpost = require('./meetpost')(sequelize, Sequelize);
// db.Comment = require('./comment')(sequelize, Sequelize);

// db.Favorite = require('./favorite')(sequelize, Sequelize);
// db.Meetgood = require('./meetgood')(sequelize, Sequelize);
// db.Participants = require('./participants')(sequelize, Sequelize);
// db.Usercateogory = require('./usercategory')(sequelize, Sequelize);

// db.Introgood = require('./introgood')(sequelize, Sequelize);
// db.Intropost = require('./intropost')(sequelize, Sequelize);

// // User:Meetpost = 1:N
// // Post테이블에 userid 컬럼 생성됨
// db.User.hasMany(db.Meetpost);
// db.Meetpost.belongsTo(db.User);
// // Category:MeetPost = 1:N
// // Post테이블에 categoryid 컬럼 생성됨
// db.Category.hasMany(db.Meetpost);
// db.Meetpost.belongsTo(db.Category);

// // User:Usercategory = 1:N
// db.User.hasMany(db.Usercateogory);
// db.Usercateogory.belongsTo(db.User);
// // Category:Usercateogry = 1:N
// db.Category.hasMany(db.Usercateogory);
// db.Usercateogory.belongsTo(db.Category);

// // User:Participants = 1:N
// db.User.hasMany(db.Participants);
// db.Participants.belongsTo(db.User);
// // Meetpost:Paricipants = 1:N
// db.Meetpost.hasMany(db.Participants);
// db.Participants.belongsTo(db.Meetpost);

// // User:Meetgood = 1:N
// db.User.hasMany(db.Meetgood);
// db.Meetgood.belongsTo(db.User);
// // Meetpost:Meetgood = 1:N
// db.Meetpost.hasMany(db.Meetgood);
// db.Meetgood.belongsTo(db.Meetpost);

// // User:Intropost = 1:N
// db.User.hasMany(db.Intropost);
// db.Intropost.belongsTo(db.User);
// // Category:Intropost = 1:N
// db.Category.hasMany(db.Intropost);
// db.Intropost.belongsTo(db.Category);

// // User:Introgood = 1:N
// db.User.hasMany(db.Introgood);
// db.Introgood.belongsTo(db.User);
// // Intropost:Introgood = 1:N
// db.Intropost.hasMany(db.Introgood);
// db.Introgood.belongsTo(db.Intropost);

// // comment 관계 넣기



// module.exports = db;


//ORM을 의미(DB에 대한 데이터 처리가 직접적으로 되는 것은 아님, Server에서 쓰는 언어가 ORM을 통해 DB로 넘어가는 것 )
//index 파일을 통해서 DB(mysql)과 연결하는 것임

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
db.UserCategory = require('./usercategory')(sequelize, Sequelize);
db.Participants = require('./participants')(sequelize, Sequelize);
db.MeetGood = require('./meetgood')(sequelize, Sequelize);
db.Favorite = require('./favorite')(sequelize, Sequelize);

// User:MeetPost = 1:N
// MeetPost 테이블에 userid 컬럼 생성됨
db.User.hasMany(db.MeetPost);
db.MeetPost.belongsTo(db.User);

// User:UserCategory = 1:N
// UserCatgory 테이블에 userid 컬럼 생성됨
db.User.hasMany(db.UserCategory);
db.UserCategory.belongsTo(db.User);

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

// Category:UserCategory = 1:N
// UserCategory 테이블에 categoryid 컬럼 생성됨
db.Category.hasMany(db.UserCategory);
db.UserCategory.belongsTo(db.Category);

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

module.exports = db;
