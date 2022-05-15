const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "uploads");
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		cb(
			null,
			file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
		);
	},
});

const videoStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads");
		if (file.mimetype === "video/mp4") {
			cb(null, path.join(__dirname, "../files"));
		} else {
			cb({ message: "This file is not in video format." }, false);
		}
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});

const upload = multer({ storage: storage }).single("avatar");
const event = multer({ storage: storage }).single("event");
const logo = multer({ storage: storage }).single("logo");
const cover = multer({ storage: storage }).single("cover");
const video = multer({ storage: storage }).single("video");
const pitchDeck = multer({ storage: storage }).single("pitch");
const photos = multer({ storage: storage }).single("photos");

module.exports = { upload, video, pitchDeck, photos, cover, logo, event };
