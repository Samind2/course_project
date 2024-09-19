const sequelize = require("./db")
const Sequelize = require("sequelize");
const User = require("./User.models")
const Role = require("./role.model");


const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = User;
db.Role = Role;

// Association
db.User.belongsToMany(db.Role, {
  through: "User_Roles",
});
db.Role.belongsToMany(db.User, {
  through: "User_Roles",
});

module.exports = db