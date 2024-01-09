const express = require("express")
const router = express.Router();
const userController = require("../controller/usercontroller")
const { protectRoutes } = require("../controller/authcontroller")

// Router for User
router.route("/")
    .get(protectRoutes, userController.getAllUser)
    .post(protectRoutes, userController.createNewUser)

router.route("/:id")
    .get(userController.getUserById)
    .patch(protectRoutes, userController.updateUser)
    .delete(protectRoutes, userController.deleteUserById)

module.exports = router;