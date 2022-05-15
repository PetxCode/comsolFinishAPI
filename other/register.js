const express = require("express");
const router = express.Router();

const userModel = require("../model/userModel");
const { logo } = require("../utils/multer");
const cloudinary = require("../utils/cloudinary");
const bcrypt = require("bcrypt");

router.post("/created", logo, async (req, res) => {
	try {
		const { email, password, userName } = req.body;

		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);

		const image = await cloudinary.uploader.upload(req.file.path);

		const getUser = await userModel.create({
			email,
			userName,
			password: hash,
			logo: image.secure_url,
			logoID: image.public_id,
		});

		res.status(200).json({
			status: "success",
			data: getUser,
		});
	} catch (err) {
		res.status(404).json({
			status: err.message,
		});
	}
});

router.patch("/updated", logo, async (req, res) => {
	try {
		const { email, password, userName } = req.body;
		const findUser = await userModel.findById(req.params.id);

		if (findUser) {
			cloudinary.uploader.destroy(findUser.public_id);
			const image = await cloudinary.uploader.upload(req.file.path);

			const getUser = await userModel.findByIdAndUpdate(
				req.params.id,
				{ userName },
				{ new: true }
			);

			res.status(200).json({
				status: "success",
				data: getUser,
			});
		}
	} catch (err) {
		res.status(500).json({
			status: err.message,
		});
	}
});

module.exports = router;
