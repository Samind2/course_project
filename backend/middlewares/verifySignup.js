const User = require("../models/User.models.js");
const Role = require("../models/role.model");
const { Op } = require("sequelize");

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    let user = await User.findOne({ where: { Username: req.body.Username } });
    if (user) {
      res.status(400).send({ message: "Failed! Username is already in use" });
      return;
    }

    user = await User.findOne({ where: { email: req.body.email } });
    if (user) {
      res.status(400).send({ message: "Failed! Email is already in use" });
      return;
    }

    next();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const checkRolesExisted = async (req, res, next) => {
  if (req.body.roles) {
    try {
      const roles = await Role.findAll({
        where: {
          name: {
            [Op.or]: req.body.roles,
          },
        },
      });

      if (roles.length !== req.body.roles.length) {
        res.status(400).send({ message: "Failed! Role does not exist" });
        return;
      }
      next();
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  } else {
    next();
  }
};

module.exports = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted
};