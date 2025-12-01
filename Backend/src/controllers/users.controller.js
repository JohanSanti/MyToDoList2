import { getConnection } from "../database/connection.js";
import sql from "mssql";

export const getUsers = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM users");
    res.json(result.recordset);
};

export const getUser = async (req, res) => {
    const pool = await getConnection();

    const result = await pool
        .request()
        .input("id", sql.Int, req.params.id)
        .query("SELECT * FROM users WHERE id = @id");

    if (result.rowsAffected[0] === 0) {
        return res.status(404).json({ message: "User not found" });
    }

    return res.json(result.recordset[0]);
};

export const createUser = async (req, res) => {
    const pool = await getConnection();

    const result = await pool
        .request()
        .input("name", sql.NVarChar, req.body.name)
        .input("email", sql.NVarChar, req.body.email)
        .input("password", sql.NVarChar, req.body.password)
        .query(
            "INSERT INTO users (name, email, password) VALUES (@name, @email, @password); SELECT SCOPE_IDENTITY() AS id;"
        );

    return res.json({
        id: result.recordset[0].id,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });
};

export const updateUser = async (req, res) => {
    const pool = await getConnection();

    const result = await pool
        .request()
        .input("id", sql.Int, req.params.id)
        .input("name", sql.NVarChar, req.body.name)
        .input("email", sql.NVarChar, req.body.email)
        .input("password", sql.NVarChar, req.body.password)
        .query(
            "UPDATE users SET name = @name, email = @email, password = @password WHERE id = @id"
        );

    if (result.rowsAffected[0] === 0) {
        return res.status(404).json({ message: "User not found" });
    }

    return res.json({ message: "User updated" });
};

export const deleteUser = async (req, res) => {
    const pool = await getConnection();

    const result = await pool
        .request()
        .input("id", sql.Int, req.params.id)
        .query("DELETE FROM users WHERE id = @id");

    if (result.rowsAffected[0] === 0) {
        return res.status(404).json({ message: "User not found" });
    }

    return res.json({ message: "User deleted" });
};
