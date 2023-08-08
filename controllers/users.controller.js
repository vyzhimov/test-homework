const db = require("../db/db");

class UsersController {
  async getUsers(req, res, next) {
    const { role = "" } = req.query;

    const getQuery = role
      ? `SELECT * FROM users JOIN profiles ON users.profileld = profiles.id WHERE role = '${role}';`
      : "SELECT * FROM users JOIN profiles ON users.profileld = profiles.id;";

    try {
      const users = await db.query(getQuery);
      res.json(users.rows);
    } catch (error) {
      next(error);
    }
  }

  async createUser(req, res, next) {
    const { username, first_name, last_name, email, role, state } = req.body;

    try {
      await db.query("BEGIN");

      const newProfile = await db.query(
        "INSERT INTO profiles (first_name, last_name, state) VALUES ($1, $2, $3) RETURNING *;",
        [first_name, last_name, state]
      );

      const newUser = await db.query(
        "INSERT INTO users (username, email, role, profileld) VALUES ($1, $2, $3, $4) RETURNING *;",
        [username, email, role, newProfile.rows[0].id]
      );

      await db.query("COMMIT");

      res
        .status(201)
        .json({ newProfile: newProfile.rows[0], newUser: newUser.rows[0] });
    } catch (error) {
      await db.query("ROLLBACK");
      next(error);
    }
  }

  async updateUser(req, res, next) {
    const { id } = req.params;
    const {
      username = "",
      first_name = "",
      last_name = "",
      email = "",
      role = "",
      state = "",
    } = req.body;

    try {
      await db.query("BEGIN");

      username &&
        (await db.query(
          `UPDATE users SET username = '${username}' WHERE id = ${id};`
        ));

      first_name &&
        (await db.query(
          `UPDATE profiles SET first_name = '${first_name}' WHERE id = ${id};`
        ));

      last_name &&
        (await db.query(
          `UPDATE profiles SET last_name = '${last_name}' WHERE id = ${id};`
        ));

      email &&
        (await db.query(
          `UPDATE users SET email = '${email}' WHERE id = ${id};`
        ));

      role &&
        (await db.query(`UPDATE users SET role = '${role}' WHERE id = ${id};`));

      state &&
        (await db.query(
          `UPDATE profiles SET state = '${state}' WHERE id = ${id};`
        ));

      await db.query("COMMIT");

      res.json({ message: "user updated successfully" });
    } catch (error) {
      await db.query("ROLLBACK");
      next(error);
    }
  }

  async deleteUser(req, res, next) {
    const { id } = req.params;

    try {
      await db.query("BEGIN");

      await db.query(`DELETE FROM users WHERE id = ${id};`);

      await db.query(`DELETE FROM profiles WHERE id = ${id};`);

      await db.query("COMMIT");

      res.json({ message: `user id${id} deleted succesfully` });
    } catch (error) {
      await db.query("ROLLBACK");
      next(error);
    }
  }
}

module.exports = new UsersController();
