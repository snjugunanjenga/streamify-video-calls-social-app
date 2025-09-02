import { generateStreamToken } from "../lib/stream.js";

export async function getStreamToken(req, res) {
  try {
    const userId = req.user?.id || req.user?._id;

    if (!userId) {
      return res.status(400).json({ message: "User ID missing" });
    }

    const token = generateStreamToken(userId);
    res.status(200).json({
      token,
      apiKey: process.env.STREAM_API_KEY, // send to frontend
      userId: req.userId,
    });
  } catch (error) {
    console.error("Error in getStreamToken controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
