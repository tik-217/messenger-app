import express from "express";

const router = express.Router();

// models
import Chat from "../models/chat/chat.mjs";

router
  .route("")
  .post(async (req, res) => {
    const initChat = await Chat.create(req.query);

    res.json(initChat.toJSON().id);
    res.end();
  })
  .get(async (req, res) => {
    if (req.query.chatId) {
      res.json(await Chat.findAll({
        where: {
          id: req.query.chatId
        }
      }));
    }
    res.end();
  })
  .delete(async (req, res) => {
    await Chat.destroy({
      where: {
        id: req.query.id,
      },
    });

    res.json(await Chat.findAll());
    res.end();
  });

router.get(("/getChat"), async (req, res) => {
  res.json(await Chat.findAll());
  res.end();
})

export default router;