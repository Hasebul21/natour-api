const express = require("express")
const router = express.Router();
const userController = require("../controller/usercontroller")

// Router for User
router.route("/users/")
    .get(userController.getAllUser)
    .post(userController.createNewUser)

router.route("/users/:id/")
    .get(userController.getUserById)
    .patch(userController.updateUser)
    .delete(userController.deleteUserById)

module.exports = router;