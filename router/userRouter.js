const express = require("express");
const { logo } = require("../utils/multer");
const router = express.Router();
const {
	getUsers,
	getUser,
	deleteUser,
	signIn,
} = require("../controller/userController");

router.route("/").get(getUsers);
router.route("/:id").get(getUser).delete(deleteUser);
router.route("/signin").post(signIn);

module.exports = router;
