const mongoose = require("mongoose");

const userModel = mongoose.Schema(
	{
		userName: {
			type: String,
		},
		email: {
			type: String,
			unique: true,
		},
		password: {
			type: String,
		},

		logo: {
			type: String,
		},
		logoID: {
			type: String,
		},
		brand: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "brands",
			},
		],
		event: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "events",
			},
		],
		pitch: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "pitchs",
			},
		],
		video: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "videos",
			},
		],
		journey: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "journeys",
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("users", userModel);
