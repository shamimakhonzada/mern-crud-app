const bcrypt = require("bcryptjs");
const userModel = require("../models/user");

const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, address, cnic } = req.body;

    // Check for missing fields
    if (!name || !email || !password || !phone || !address || !cnic) {
      return res.status(400).json({
        status: 0,
        message: "Please fill all required fields",
      });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: 0,
        message: "User already registered with this Email",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save new user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      cnic,
    });

    await newUser.save();

    return res.status(201).json({
      status: 1,
      message: "User registration successful",
    });
  } catch (err) {
    console.error("Register Error:", err);
    return res.status(500).json({
      status: 0,
      message: "Server error",
      error: err.message,
    });
  }
};

const registeredUser = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json({ userList: users });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      status: 0,
      message: "Server error",
      error: err.message,
    });
  }
};

const findUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const fetchedUser = await userModel.findById(userId);
    if (!fetchedUser) {
      return res.status(404).json({
        status: 0,
        message: "User not found",
      });
    }
    res.status(200).json({
      status: 1,
      message: `User with id ${userId} is fetched`,
      data: fetchedUser,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      status: 0,
      message: "Server error",
      error: err.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    let { name, email, password, phone, address, cnic } = req.body;

    const updateData = {
      name,
      email,
      phone,
      address,
      cnic,
    };
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    const updatedUser = await userModel.updateOne(
      { _id: userId },
      updateData,
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({
        status: 0,
        message: "User not found",
      });
    }

    res.status(200).json({
      status: 1,
      message: `User with id ${userId} is updated`,
      data: updatedUser,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      status: 0,
      message: "Server error",
      error: err.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await userModel.deleteOne({ _id: userId });
    if (!deletedUser) {
      return res.status(404).json({
        status: 0,
        message: "User not found",
      });
    }
    res.status(200).json({
      status: 1,
      message: `User with id ${userId} is deleted`,
      data: deletedUser,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      status: 0,
      message: "Server error",
      error: err.message,
    });
  }
};

const userSingleRow = async (req, res) => {
  let userId = req.params.id;
  // Exclude password field using .select()
  let user = await userModel.findOne({ _id: userId }).select("-password");
  res.send({
    status: 1,
    user,
  });
};

module.exports = {
  registerUser,
  registeredUser,
  findUser,
  updateUser,
  deleteUser,
  userSingleRow,
};
