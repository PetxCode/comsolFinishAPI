const userModel = require("../model/userModel");
const journeyModel = require("../model/journeyModel");

const verify = require("../utils/verification");

const express = require("express");
const router = express.Router();

router.post("/:id/create", verify, async (req, res) => {
	try {
		const { why, what, focus, vision } = req.body;

		const getUser = await userModel.findById(req.params.id);
		const createJourney = new journeyModel({
			why,
			what,
			focus,
			vision,
		});

		createJourney.user = getUser;
		createJourney.save();

		getUser.journey.push(createJourney);
		getUser.save();

		res.status(201).json({
			status: "new event created successfully",
			data: createJourney,
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
			path: "journey",
			options: {
				limit: 1,
				sort: { createdAt: -1 },
				// skip: req.params.pageIndex * 2,
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

		const getUser = await journeyModel.findByIdAndUpdate(
			req.params.updateID,
			req.body,
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
		const deleteData = await journeyModel.findByIdAndRemove(req.params.brandID);

		getUser.journey.pull(deleteData);
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
