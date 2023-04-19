const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const File = require("../models/file");
const { v4: uuid } = require("uuid");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, file.fieldname+ "_" + uniqueSuffix);
  },
});
const upload = multer({ storage: storage }).single("myfile");

router.post("/", (req, res) => {
  // store file
  upload(req, res, async (err) => {
    // validate request
    console.log(req.file);
    if (!req.file) {
      return res.send("please upload a file");
    }
    if (err) {
      return res.status(500).send({ error: err.message });
    }

    // store in database
    const file = new File({
      filename: req.file.filename,
      uuid: uuid(),
      path: req.file.path,
      size: req.file.size,
    });
    const response = await file.save();
    return res.json({ file: `${process.env.APP_BASE_URL}/files/${response.uuid}` });
  });
});
module.exports = router;
