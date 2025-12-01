import express from 'express'
import taskRoutes from "./routes/tasks.routes.js";
import userRoutes from "./routes/users.routes.js";
const app = express();

app.use(express.json());
app.use(taskRoutes);
app.use(userRoutes);

export default app