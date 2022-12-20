// models
import Chat from "../models/chat/chat.mjs";

export async function createChat(socket, users) {
  const getUserIds = await Chat.findAll({
    where: {
      user_ids: users.user_ids,
    },
    raw: true,
  });

  if (getUserIds.length === 0) {
    const initChat = await Chat.create(users);
    socket.emit("respCreateChat", initChat.toJSON().id);
  } else {
    socket.emit("respCreateChat", getUserIds[0].id);
  }
}

export async function findChat(socket, chat) {
  if (!chat) return;

  const foundChats = await Chat.findAll({
    where: {
      id: chat.chatId
    }
  });

  socket.emit("respFindChat", foundChats);
}

export async function deleteChat(socket, chat) {
  await Chat.destroy({
    where: {
      id: chat.id,
    },
  });

  socket.emit("respDeleteChat", await Chat.findAll());
}

// router.get(("/getChat"), async (req, res) => {
//   res.json(await Chat.findAll());
//   res.end();
// })