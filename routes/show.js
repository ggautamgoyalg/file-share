const router = require("express").Router();
const File = require("../models/file");

router.get("/:uuid", async (req, res) => {
  try {
    const file = await File.findOne({ uuid: req.params.uuid });
    if (!file) return res.json({ message: "file do not exist" });
    return res.render("download", {
      uuid: file.uuid,
      fileName: file.filename,
      downloadLink: `${process.env.APP_BASE_URL}/files/download/${file.uuid}`,
      fileSize: file.size,
    });
  } catch (err) {
    return res.json({
       message: `error occured in routes/show page in get method: ${err}`
    });
  }
});


module.exports = router;
