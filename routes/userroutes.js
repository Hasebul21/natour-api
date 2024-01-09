const express = require("express")
const router = express.Router();
const userController = require("../controller/usercontroller")
const { protectRoutes } = require("../controller/authcontroller")

// Router for User
router.route("/")
    .get(protectRoutes, userController.getAllUser)
    .post(userController.createNewUser)

router.route("/:id")
    .get(userController.getUserById)
    .patch(userController.updateUser)
    .delete(userController.deleteUserById)

module.exports = router;