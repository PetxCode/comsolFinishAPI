const mongoose = require("mongoose");

const brandModel = mongoose.Schema(
	{
		name: {
			type: String,
		},
		slogan: {
			type: String,
		},
		email: {
			type: String,
		},
		about: {
			type: String,
		},
		coverImage: {
			type: String,
		},
		coverImageID: {
			type: String,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "users",
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("brands", brandModel);
