const mongoose = require("mongoose");

const journeyModel = mongoose.Schema(
	{
		why: {
			type: String,
		},
		what: {
			type: String,
		},
		focus: {
			type: String,
		},
		vision: {
			type: String,
		},

		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "users",
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("journeys", journeyModel);
