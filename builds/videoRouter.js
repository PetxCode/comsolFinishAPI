const userModel = require("../model/userModel");
const videoModel = require("../model/videoModel");

const { video } = require("../utils/multer");
const cloudinary = require("../utils/cloudinary");
const verify = require("../utils/verification");

const express = require("express");
const router = express.Router();

router.post("/:id/create", verify, async (req, res) => {
	try {
		const { title, detail, videoURL } = req.body;

		const getUser = await userModel.findById(req.params.id);
		const createVideo = new videoModel({
			title,
			detail,
			videoURL,
		});

		createVideo.user = getUser;
		createVideo.save();

		getUser.video.push(createVideo);
		getUser.save();

		res.status(201).json({
			status: "new event created successfully",
			data: createVideo,
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
			path: "video",
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

router.patch("/:id/update/:updateID", verify, async (req, res) => {
	try {
		const { title, detail, videoURL } = req.body;

		const getUser = await videoModel.findByIdAndUpdate(
			req.params.updateID,
			{
				title,
				detail,
				videoURL,
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
		const deleteData = await vidoeModel.findByIdAndRemove(req.params.brandID);

		getUser.video.pull(deleteData);
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
