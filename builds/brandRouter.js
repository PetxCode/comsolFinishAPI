const userModel = require("../model/userModel");
const brandModel = require("../model/brandModel");
const { cover } = require("../utils/multer");
const cloudinary = require("../utils/cloudinary");
const verify = require("../utils/verification");

const express = require("express");
const router = express.Router();

router.post("/:id/create", verify, cover, async (req, res) => {
	try {
		const { name, slogan, about, email } = req.body;
		const image = await cloudinary.uploader.upload(req.file.path);

		const getUser = await userModel.findById(req.params.id);
		const createBrand = new brandModel({
			name,
			slogan,
			about,
			email,
			coverImage: image.secure_url,
			coverImageID: image.public_id,
		});

		createBrand.user = getUser;
		createBrand.save();

		getUser.brand.push(createBrand);
		getUser.save();

		res.status(201).json({
			status: "created successfully",
			data: createBrand,
		});
	} catch (err) {
		res.status(404).json({
			status: err.message,
		});
	}
});

router.get("/:id/view", async (req, res) => {
	try {
		const getUser = await userModel.findById(req.params.id).populate({
			path: "brand",
			options: {
				limit: 1,
				sort: { createdAt: -1 },
			},
		});

		res.status(200).json({
			status: "successful",
			data: getUser,
		});
	} catch (err) {
		res.status(404).json({
			status: err.message,
		});
	}
});

router.patch("/:id/update/:updateID", verify, cover, async (req, res) => {
	try {
		const { name, slogan, about, email } = req.body;
		const image = await cloudinary.uploader.upload(req.file.path);

		const getUser = await brandModel.findByIdAndUpdate(
			req.params.updateID,
			{
				name,
				slogan,
				about,
				email,
				coverImage: image.secure_url,
				coverImageID: image.public_id,
			},
			{
				new: true,
			}
		);

		res.status(200).json({
			status: "successful",
			data: getUser,
		});
	} catch (err) {
		res.status(404).json({
			status: err.message,
		});
	}
});

router.delete("/:id/:brandID", verify, async (req, res) => {
	try {
		const getUser = await userModel.findById(req.params.id);
		const deleteData = await brandModel.findByIdAndRemove(req.params.brandID);

		getUser.brand.pull(deleteData);
		getUser.save();

		res.status(200).json({
			status: "deleted",
			data: getUser,
		});
	} catch (err) {
		res.status(404).json({
			status: err.message,
		});
	}
});

module.exports = router;
