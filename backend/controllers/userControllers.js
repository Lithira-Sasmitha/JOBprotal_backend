const fs = require('fs');
const path = require('path');
const User = require("../models/User");

// Update user profile
exports.updateProfile = async (req, res) => {
    try {
        const { name, avatar, companyName, companyLogo, companyDescription, resume } = req.body;

        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json({ message: "User not found" });

        // Update common fields
        user.name = name || user.name;
        user.avatar = avatar || user.avatar;
        user.resume = resume || user.resume;

        // Update employer-specific fields
        if (user.role === "employer") {
            user.companyName = companyName || user.companyName;
            user.companyDescription = companyDescription || user.companyDescription;
            user.companyLogo = companyLogo || user.companyLogo;
        }

        await user.save();

        res.json({
            _id: user._id,
            name: user.name,
            role: user.role,
            avatar: user.avatar,
            companyName: user.companyName || "",
            companyDescription: user.companyDescription || "",
            companyLogo: user.companyLogo || "",
            resume: user.resume || "",
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete user resume
exports.deleteResume = async (req, res) => {
    try {
        const { resumeUrl } = req.body;
        if (!resumeUrl) return res.status(400).json({ message: "Resume URL is required" });

        const fileName = resumeUrl.split('/').pop();
        const filePath = path.join(__dirname, '../uploads', fileName);

        // Delete file asynchronously if it exists
        if (fs.existsSync(filePath)) {
            fs.unlink(filePath, (err) => {
                if (err) console.error("Failed to delete file:", err);
            });
        }

        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.resume = '';
        await user.save();

        res.json({ message: "Resume deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get public profile
exports.getPublicProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
