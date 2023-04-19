const router = require("express").Router();
const File = require("../models/file");

router.post("/", async (req, res) => {
  console.log(req.body);
  const { uuid, emailTo, emailFrom } = req.body;
  if (!uuid || !emailTo || !emailFrom) {
    return res
      .status(422)
      .send({ error: "All fields are required except expiry." });
  }
  console.log(uuid, emailFrom, emailTo);
  // Get data from db
  try {
    const file = await File.findOne({ uuid: uuid });
    if (file.sender) {
      return res.status(422).send({ error: "Email already sent once." });
    }
    file.sender = emailFrom;
    file.receiver = emailTo;
    const response = await file.save();
    // send mail
    const sendEmail = require("../services/email");
    sendEmail({
      from: emailFrom,
      to: emailTo,
      subject: "inShare file sharing",
      text: `${emailFrom} shared a file with you.`,
      html: require("../services/emailTemplate")({
        emailFrom,
        downloadLink: `${process.env.APP_BASE_URL}/files/${file.uuid}?source=email`,
        size: parseInt(file.size / 1024) + " KB",
        expires: "24 hours",
      }),
    })
      .then(() => {
        return res.json({ success: true });
      })
      .catch((err) => {
        return res.status(500).json({ error: "Error in email sending." });
      });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: err });
  }
});

module.exports = router;
