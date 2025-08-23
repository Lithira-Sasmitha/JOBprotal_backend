const express = require("express");
const { applyToJob,
    getMyApplications,
    getApplicationForJob,
    getApplicationById,
    updateStatus,
 } = require("../controllers/applicationController.js");
const{ protect } = require("../middlewares/authMiddleware.js");

const router = express.Router();

route("/").post(protect, createJob);

module.exports = router;