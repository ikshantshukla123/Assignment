import Announcement from "../models/Announcement.model.js";





//all users can read announcements, only admin can create announcements
export const getAnnouncements = async (req, res) => {
  const userId = req.user.userId;

  const announcements = await Announcement.find({
    $or: [{ toUser: null }, { toUser: userId }],
  })
    .populate("fromAdmin", "username")
    .sort({ createdAt: -1 }); //. this -1 will show new announcements first

  res.json(announcements);
};





export const createAnnouncement = async (req, res) => {
  const { content, toUserId } = req.body;

  if (!content) {
    return res.status(400).json({ message: "Content is required" });
  }

  const announcement = await Announcement.create({
    content,
    fromAdmin: req.user.userId,
    toUser: toUserId || null,
  });

  // emit via socket
  const io = req.app.get("io");

  if (toUserId) {
    io.to(toUserId).emit("new_announcement", announcement);
    
  } else {
    io.emit("new_announcement", announcement);
  }

  res.status(201).json(announcement);
};
