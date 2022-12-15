import express from "express";

const router = express.Router();

// models
import ChatContent from "../models/chat-content/chat-content.mjs";

router
  .route("")
  .post(async (req, res) => {
    console.log(req.query);
    await ChatContent.create(req.query);

    res.json(await ChatContent.findAll({
      where: {
        chat_id: req.query.chat_id
      }
    }));
    res.end();
  })
  .get(async (req, res) => {
    res.json(await ChatContent.findAll({
      where: {
        id: req.query.dialogId
      }
    }));
    res.end();
  })
  .delete(async (req, res) => {
    await ChatContent.destroy({
      where: {
        id: req.query.id,
      },
    });

    res.json(await ChatContent.findAll());
    res.end();
  });

router.get(("/getChatContent"), async (req, res) => {
  res.json(await ChatContent.findAll());
  res.end();
})

export default router;