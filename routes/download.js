const router = require("express").Router();
const File = require("../models/file");
const path = require('path');

router.get("/:uuid", async (req, res)=>{

    try {
      const file = await File.findOne({ uuid: req.params.uuid });
       if (file === null || file === undefined) return res.json({ message: "link expired" });

       const filePath = path.join(__dirname, "/../" , "uploads", file.filename);
       console.log(filePath);
       res.download(filePath);
    } catch (err) {
      return res.json({
         message: `error occured in routes/show page in get method in download section: ${err}`
      });
    }
  })

module.exports = router