const express = require("express");
const router = express.Router();
const authMiddelware = require("../middelwares/auth-middleware")
const adminMiddleware = require("../middelwares/admin-middleware")
const adminController = require("../controllers/admin-controller");

router.route("/users").get(authMiddelware,adminMiddleware, adminController.getAllUsers);
router.route("/users/:id").get(authMiddelware,adminMiddleware, adminController.getUserById);
router.route("/users/update/:id").patch(authMiddelware,adminMiddleware, adminController.updateuserById);
router.route("/users/delete/:id").delete(authMiddelware, adminMiddleware , adminController.deleteuserById)
router.route("/contacts").get(authMiddelware,adminMiddleware, adminController.getAllContacts);
router.route("/contacts/delete/:id").delete(authMiddelware, adminMiddleware , adminController.deletecontactById);


module.exports = router;