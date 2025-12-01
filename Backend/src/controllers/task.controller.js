import { getConnection } from "../database/connection.js";
import sql from "mssql";

export const getTasks = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query('SELECT * FROM tasks');
    res.json(result.recordset);

};

export const getTask = async (req, res) => {
    console.log(req.params.id);

    const pool = await getConnection();

    const result = await pool.request()
        .input('id', sql.Int, req.params.id)
        .query('SELECT * FROM tasks WHERE id = @id');
    console.log(result);
    if(result.rowsAffected[0] === 0){
        return res.status(404).json({message: "Task not found"});
    }

    return res.json(result.recordset[0]);
};

export const createTasks = async (req, res) => {

    const pool = await getConnection();

    const result = await pool
        .request()
        .input('userId', sql.Int, req.body.userId)
        .input('title', sql.VarChar, req.body.title)
        .input('description', sql.VarChar, req.body.description)
        .input('isCompleted', sql.Bit, req.body.isCompleted)
        .input('createdAt', sql.VarChar, req.body.createdAt)
        .query('INSERT INTO tasks (userId,title,description,isCompleted,createdAt) VALUES (@userId,@title,@description,@isCompleted,@createdAt); SELECT SCOPE_IDENTITY() AS id;');
    console.log(result);
    res.json({
        id: result.recordset[0].id,
        userId: req.body.userId,
        title: req.body.title,
        description: req.body.description,
        isCompleted: req.body.isCompleted,
        createdAt: req.body.createdAt
    })
};

export const updateTask = async (req, res) => {
    const pool = await getConnection();
    const result = await pool
    .request()
    .input('id', sql.Int, req.params.id)
    .input('userId', sql.Int, req.body.userId)
    .input('title', sql.VarChar, req.body.title)
    .input('description', sql.VarChar, req.body.description)
    .input('isCompleted', sql.Bit, req.body.isCompleted)
    .input('createdAt', sql.VarChar, req.body.createdAt)
    .query('UPDATE tasks SET userId = @userId, title = @title, description = @description, isCompleted = @isCompleted, createdAt = @createdAt WHERE id = @id')

    console.log(result);

    if (result.rowsAffected[0] === 0) {
        return res.status(404).json({ message: "Task not found" });
    }

    return res.json({ message: "Task updated" });

};

export const deleteTask = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request()
    .input("id", sql.Int, req.params.id)
    .query("DELETE FROM tasks WHERE id = @id");

  console.log(result);

  if (result.rowsAffected[0] === 0) {
    return res.status(404).json({ message: "Task not found" });
  }

  return res.json({ message: "Task deleted" });
};

