import { Sequelize, Op } from "sequelize";
import express from "express";

const router = express.Router();

// models
import Users from "../models/users/users.mjs";

router
  .route("")
  .post(async (req, res) => {
    const findEmail = await Users.findAll({
      where: {
        email: req.query.email,
      },
    });

    if (findEmail.length === 0) {
      await Users.create(req.query);
    }

    res.json(await Users.findAll());
    res.end();
  })
  .get(async (req, res) => {
    if (req.query.searchUserName) {
      const substring = await Users.findAll({
        where: {
          [Op.or]: [
            {
              email: {
                [Op.like]: `%${req.query.searchUserName}%`,
              },
            },
            {
              name: {
                [Op.like]: `%${req.query.searchUserName}%`,
              },
            },
          ],
        },
      });
      res.json(substring);
    }
    res.end();
  })
  .delete(async (req, res) => {
    await Users.destroy({
      where: {
        id: req.query.id,
      },
    });

    res.json(await Users.findAll());
    res.end();
  });

router.get("/getUsers", async (req, res) => {
  res.json(await Users.findAll());
  res.end();
});

export default router;
