const router = require("express").Router();
const Admin = require("../model/Admin");

const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "78rfrbrefhadnbfrf6y9u0jjpm'[khuuv8f93fuqwhisbedfv8w2bdeb";
//const multer = require("multer");

//done by admin
//http://localhost:8070/admin/register
router.post("/register", async (req, res) => {
  try {
    const { username, email, password, profilePicture } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Check if the username already exists
    const usernameExists = await Admin.findOne({ username });
    if (usernameExists) {
      return res.status(400).json({ error: "Username already exists. Please choose a different one." });
    }

    // Check if the email already exists
    const emailExists = await Admin.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ error: "Email already exists. Please choose a different one." });
    }

    let profilePictureData = null;
    let profilePictureContentType = null;

    if (profilePicture) {
      const matches = profilePicture.match(/^data:(.+);base64,(.+)$/);
      if (!matches) {
        throw new Error("Invalid image format");
      }
      profilePictureContentType = matches[1];
      profilePictureData = Buffer.from(matches[2], "base64");
    }

    const newAdmin = new Admin({
      username,
      email,
      password: encryptedPassword,
      profilePicture: {
        data: profilePictureData,
        contentType: profilePictureContentType
      }
    });

    await newAdmin.save();

    res.status(201).json({
      message: "New admin added successfully!",
      data: {
        username: newAdmin.username,
        email: newAdmin.email,
        password: newAdmin.password,
        profilePicture: {
          contentType: profilePictureContentType,
          data: profilePictureData ? profilePictureData.toString("base64") : null // Convert Buffer to base64 string for client-side rendering
        }
      }
    });
  } catch (error) {
    console.error("Error registering admin:", error);
    res.status(500).json({
      error: "Server error. Failed to register admin."
    });
  }
});

//done by admin
//http://localhost:8070/admin/login
router.post("/login", async (req, res) => {
  try {
    const { email, password, username } = req.body;
    
    // Find the admin by email and username
    const oldAdmin = await Admin.findOne({ email, username });

    if (!oldAdmin) {
      return res
        .status(400)
        .json({ error: "This admin has not been registered or username/email is incorrect!" });
    }

    const isPasswordMatch = await bcrypt.compare(password, oldAdmin.password);
    if (isPasswordMatch) {
      const token = jwt.sign({ adminId: oldAdmin._id }, JWT_SECRET);
      return res.status(200).json({ status: "ok", data: token, _id: oldAdmin._id });
    } else {
      return res
        .status(401)
        .json({ status: "error", error: "Invalid Password" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: "error", error: "An error occurred during login" });
  }
});


//done by admin
//http://localhost:8070/admin/
router.route("/").get((req, res) => {
  Admin.find()
    .then((admin) => {
      res.json(admin);
    })
    .catch((error) => {
      console.error("Error getting admin:", error);
      res.status(500).json({ error: "Server error. Failed to get admin." });
    });
});

//done by admin
//http://localhost:8070/admin/update/id
router.put("/update/:id", async (req, res) => {
  try {
    const adminId = req.params.id;
    const { username, email, profilePicture } = req.body;

    // Check if the username already exists, excluding the current admin
    const existingUsername = await Admin.findOne({
      username,
      _id: { $ne: adminId }, // Exclude the current admin from the check
    });

    if (existingUsername) {
      return res.status(400).json({
        error: "Username already exists. Please choose a different one.",
      });
    }

    // Check if the email already exists, excluding the current admin
    const existingEmail = await Admin.findOne({
      email,
      _id: { $ne: adminId }, // Exclude the current admin from the check
    });

    if (existingEmail) {
      return res.status(400).json({
        error: "Email already exists. Please choose a different one.",
      });
    }

    let updatedFields = { username, email };

    if (profilePicture) {
      const matches = profilePicture.match(/^data:(.+);base64,(.+)$/);
      if (!matches) {
        return res.status(400).json({ error: "Invalid image format" });
      }
      const profilePictureContentType = matches[1];
      const profilePictureData = Buffer.from(matches[2], "base64");

      updatedFields.profilePicture = {
        data: profilePictureData,
        contentType: profilePictureContentType,
      };
    }

    const updatedAdmin = await Admin.findByIdAndUpdate(
      adminId,
      { $set: updatedFields },
      { new: true }
    );

    if (!updatedAdmin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully!",
      data: {
        username: updatedAdmin.username,
        email: updatedAdmin.email,
        profilePicture: updatedAdmin.profilePicture
          ? {
              contentType: updatedAdmin.profilePicture.contentType,
              data: updatedAdmin.profilePicture.data.toString("base64"),
            }
          : null,
      },
    });
  } catch (error) {
    console.error("Error updating admin profile:", error);
    res.status(500).json({ error: "Server error. Failed to update profile." });
  }
});


//done by admin
//http://localhost:8070/admin/delete/id
router.route("/delete/:id").delete(async (req, res) => {
  try {
    const adminID = req.params.id;
    await Admin.findByIdAndDelete(adminID);
    res.status(200).send({ status: "Admin deleted" });
  } catch (error) {
    console.error("Error deleting admin:", error);
    res.status(500).json({ status: "Error with deleting data" });
  }
});

//done by admin
//http://localhost:8070/admin/get/id
router.route("/get/:id").get(async (req, res) => {
  try {
    const adminID = req.params.id;
    const admin = await Admin.findById(adminID);
    res.status(200).send({ status: "Admin fetched", admin });
  } catch (error) {
    console.error("Error fetching admin:", error);
    res.status(500).json({ status: "Error with fetching data" });
  }
});


//done by admin
//http://localhost:8070/admin/reset-password/id
router.post('/reset-password/:id', async (req, res) => {
  try {
    const adminId = req.params.id;
    const { currentPassword, newPassword } = req.body;

    // Find the admin by ID
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    // Validate the current password
    const isPasswordValid = await bcrypt.compare(currentPassword, admin.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }

    // Hash the new password
    const encryptedPassword = await bcrypt.hash(newPassword, 10);

    // Update the admin's password
    admin.password = encryptedPassword;
    await admin.save();

    res.status(200).json({ message: 'Password updated successfully!' });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ error: 'Server error. Failed to update password.' });
  }
});


module.exports = router;
