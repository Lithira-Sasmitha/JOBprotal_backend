const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
    {
    title: { type: String, require: true },
    description: { type: String, require: true },
    requirments: { type: String, required:true },
    location: { type: String },
    category: { type: String },
    type: { type: String, 
        enum: ["Remote", "Full-Time", "Part-Time", "Internship", "Contract" ],
        require: true },
    company: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    salaryMin: { type: Number },
    salaryMax: { type: Number},
    isClosed: { type: Boolean, default: false },
},
    { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);