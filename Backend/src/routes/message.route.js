import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getMessages, getUsersForSideBar, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.get('/messages/user', protectRoute, getUsersForSideBar)
router.get('/messages/:id', protectRoute, getMessages)

router.post("/messages/send/:id", protectRoute, sendMessage)

export default router;