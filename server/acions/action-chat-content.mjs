// models
import ChatContent from "../models/chat-content/chat-content.mjs";

export async function createChatContent(io, chatContent) {
  await ChatContent.create(chatContent);

  io.emit("createChatContent", await ChatContent.findAll());
}

export async function findChatContent(socket, query) {
  if (!query) {
    const allChatContent = await ChatContent.findAll();
    socket.emit("findChatContent", allChatContent);
  } else {
    const founfChatContent = await ChatContent.findAll({
      where: {
        id: query.dialogId
      }
    });
    socket.emit("findChatContent", founfChatContent);
  }
}

export async function deleteChatContent(socket, chatContent) {
  await ChatContent.destroy({
    where: {
      id: chatContent.id,
    },
  });

  socket.emit("respDeleteChatContent", await ChatContent.findAll());
}

// router.get(("/getChatContent"), async (req, res) => {
//   res.json(await ChatContent.findAll({
//     order: [['updatedAt', 'ASC']]
//   }));
//   res.end();
// })
