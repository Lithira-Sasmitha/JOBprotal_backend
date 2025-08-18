const Job = require("../models/Job");
const User = require("../models/User");
const Application = require("../models/Application");
const SavedJob = require("../models/SavedJob");

exports.createJob = async (req, res) => {
  try {
    if (req.user.role !== "employer"){
        return res.status(403).json({ message: "Only employers can post jobs" });
    }

    const job = await Job.create({...req.body, company: req.user._id });
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getJobs =async (req, res) => {
    const{
        keyword,
        location,
        category,
        type,
        minSalary,
        maxSalary,
        userId,
    } = req.query;

    const query = {
        isClosed: false,
        ...(keyword && { title: { $regex: keyword, $options: "i"}}),
        ...(location && { location: { $regex: location, $options: "i"}}),
        ...(category && { category }),
        ...(type && { type }),
    };

    if (minSalary || maxSalary) {
        query.$and = [];

        if (minSalary){
            query.$and.push({ salaryMax: {$gte: Number(minSalary)} });
        }

        if (maxSalary){
            query.$and.push({ salaryMin: {$gte: Number(maxSalary)} });
        }
    }
    try{

    }catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getJobsEmployer =async (req, res) => {
    try{

    }catch (err) {
        res.status(500).json({ message: err.message });
    }
};