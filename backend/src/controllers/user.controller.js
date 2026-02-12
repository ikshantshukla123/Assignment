import bcrypt from "bcrypt";
import User from "../models/User.model.js";
import ActivityLog from "../models/ActivityLog.model.js";





// it is same as admin just role = users here and no self chekc is implemented as users are managed by admin 



export const getUsers = async (req, res) => {
  const users = await User.find({ role: "user" }).select("-password");
  res.json(users);
};


export const createUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  const exists = await User.findOne({ username });
  if (exists) {
    return res.status(409).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    password: hashedPassword,
    role: "user",
  });

  await ActivityLog.create({
    action: "CREATE_USER",
    performedBy: req.user.userId,
    targetUser: user._id,
  });

  res.status(201).json({ message: "User created" });
};


export const updateUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);
  if (!user || user.role !== "user") {
    return res.status(404).json({ message: "User not found" });
  }

  const { username, password } = req.body;

  if (username) user.username = username;
  if (password) user.password = await bcrypt.hash(password, 10);

  await user.save();

  await ActivityLog.create({
    action: "UPDATE_USER",
    performedBy: req.user.userId,
    targetUser: user._id,
  });

  res.json({ message: "User updated" });
};


export const deleteUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);
  if (!user || user.role !== "user") {
    return res.status(404).json({ message: "User not found" });
  }

  await user.deleteOne();

  await ActivityLog.create({
    action: "DELETE_USER",
    performedBy: req.user.userId,
    targetUser: id,
  });

  res.json({ message: "User deleted" });
};
