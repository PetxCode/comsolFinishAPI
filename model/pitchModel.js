const mongoose = require("mongoose");

const pitchModel = mongoose.Schema(
	{
		title: {
			type: String,
		},
		detail: {
			type: String,
		},
		url: {
			type: String,
		},
		pitchDeck: {
			type: String,
		},
		pitchDeckID: {
			type: String,
		},

		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "users",
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("pitchs", pitchModel);
