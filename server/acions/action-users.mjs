import { Op } from "sequelize";

// models
import Users from "../models/users/users.mjs";

export async function createUsers(socket, query) {
  if (!query) return;

  const findEmail = await Users.findAll({
    where: {
      email: query.email,
    },
  });

  if (findEmail.length === 0) {
    await Users.create(query);
  }

  socket.emit("respCreatedUser", await Users.findAll());
}

export async function findUsers(socket, searchText) {
  if (searchText === "allUsers") {
    socket.emit("respFoundUsers", await Users.findAll());
  } else if (typeof searchText === "number") {
    socket.emit("respFoundUsers", await Users.findAll({
      where: {
        id: searchText
      }
    }));
  } else {
    const substring = await Users.findAll({
      where: {
        [Op.or]: [
          {
            email: {
              [Op.like]: `%${searchText}%`,
            },
          },
          {
            name: {
              [Op.like]: `%${searchText}%`,
            },
          },
        ],
      },
    });
    socket.emit("respFoundUsers", substring);
  }
}

export async function updateUsers(io, userId, updateString) {
  await Users.update(updateString, {
    where: {
      id: userId,
    }
  });

  io.emit("updateUsers", await Users.findAll());
}

export async function deleteUsers(socket, user) {
  await Users.destroy({
    where: {
      id: user.id,
    },
  });

  socket.emit("respDeleteUsers", await Users.findAll());
}

// router.get("/getUsers", async (req, res) => {
//   res.json(await Users.findAll());
//   res.end();
// });
