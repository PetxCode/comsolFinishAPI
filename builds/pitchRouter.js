const userModel = require("../model/userModel");
const pitchModel = require("../model/pitchModel");

const { pitchDeck } = require("../utils/multer");
const cloudinary = require("../utils/cloudinary");
const verify = require("../utils/verification");

const express = require("express");
const router = express.Router();

router.post("/:id/create", verify, async (req, res) => {
	try {
		const { title, datail, url } = req.body;
		// const image = await cloudinary.uploader.upload(req.file.path);

		const getUser = await userModel.findById(req.params.id);
		const createPitch = new pitchModel({
			title,
			datail,
			url,
			// pitchDeck: image.secure_url,
			// pitchDeckID: image.public_id,
		});

		createPitch.user = getUser;
		createPitch.save();

		getUser.pitch.push(createPitch);
		getUser.save();

		res.status(201).json({
			status: "new event created successfully",
			data: createPitch,
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
			path: "pitch",
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

router.patch("/:id/update/:updateID", verify, pitchDeck, async (req, res) => {
	try {
		const { title, detail, url } = req.body;
		const image = await cloudinary.uploader.upload(req.file.path);

		const getUser = await pitchModel.findByIdAndUpdate(
			req.params.updateID,
			{
				title,
				detail,
				pitchDeck: image.secure_url,
				pitchDeckID: image.public_id,
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
		const deleteData = await pitchModel.findByIdAndRemove(req.params.brandID);

		getUser.pitch.pull(deleteData);
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
