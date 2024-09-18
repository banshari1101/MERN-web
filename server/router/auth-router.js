const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth-controller");
const validate = require("../middelwares/validate-middleware");
const signupSchema = require("../validators/auth_validator");
const authMiddelware = require("../middelwares/auth-middleware");

router.route("/").get(authControllers.home);
router
  .route("/register")
  .post(validate(signupSchema), authControllers.register);
router.route("/login").post(authControllers.login);

router.route("/user").get(authMiddelware, authControllers.user);

module.exports = router;