const mongoose = require("mongoose");

const eventModel = mongoose.Schema(
	{
		title: {
			type: String,
		},
		description: {
			type: String,
		},
		image: {
			type: String,
		},
		imageID: {
			type: String,
		},

		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "users",
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("events", eventModel);
