const mongoose = require("mongoose");

const videoModel = mongoose.Schema(
	{
		title: {
			type: String,
		},
		detail: {
			type: String,
		},
		videoURL: {
			type: String,
		},

		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "users",
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("videos", videoModel);
