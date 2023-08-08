const express = require("express");
const router = express.Router();
const usersControllers = require("../controllers/users.controller");
const validateBody = require("../middlewares/validateBody");
const { createSchema, updateSchema } = require("../schemas/userSchema");

/* GET users listing. */

router.get("/", usersControllers.getUsers);
router.post("/", validateBody(createSchema), usersControllers.createUser);
router.patch("/:id", validateBody(updateSchema), usersControllers.updateUser);
router.delete("/:id", usersControllers.deleteUser);

module.exports = router;
