# Sistema de Gestión de Tareas (MyToDoList2)

## 📁 Diagrama de Carpetas — Backend (Node.js + Express)
```
backend/
│
├── src/
│   ├── controllers/
│   │   ├── task.controller.js
│   │   └── user.controller.js
│   │
│   ├── routes/
│   │   ├── tasks.routes.js
│   │   └── users.routes.js
│   │
│   ├── database/
│   │   └── connection.js
│   │
│   ├── middlewares/
│   │   └── auth.middleware.js   (opcional - JWT)
│   │
│   ├── app.js
│   └── index.js
│
├── package.json
└── .env

```

## 📁 Diagrama de Carpetas — Frontend (Ionic + Angular)
```
frontend/
│
├── src/
│   ├── app/
│   │   ├── pages/
│   │   │   ├── login/
│   │   │   │   ├── login.page.html
│   │   │   │   ├── login.page.ts
│   │   │   │   └── login.page.scss
│   │   │   │
│   │   │   ├── register/
│   │   │   │   ├── register.page.html
│   │   │   │   ├── register.page.ts
│   │   │   │   └── register.page.scss
│   │   │   │
│   │   │   ├── tasks/
│   │   │   │   ├── tasks.page.html
│   │   │   │   ├── tasks.page.ts
│   │   │   │   └── tasks.page.scss
│   │   │   │
│   │   │   └── task-detail/
│   │   │       ├── task-detail.page.html
│   │   │       ├── task-detail.page.ts
│   │   │       └── task-detail.page.scss
│   │   │
│   │   ├── services/
│   │   │   ├── task.service.ts
│   │   │   └── user.service.ts
│   │   │
│   │   ├── guards/
│   │   │   └── auth.guard.ts
│   │   │
│   │   ├── app-routing.module.ts
│   │   └── app.module.ts
│   │
│   ├── assets/
│   └── index.html
│
└── package.json

```


# Rutas (Backend Node + Express)
## Usuarios

- POST /register — Registro de usuario

- POST /login — Inicio de sesión

## Tasks

- GET /tasks — Listar tareas

- GET /tasks/:id — Obtener una tarea por ID

- POST /tasks — Crear una tarea

- PUT /tasks/:id — Actualizar una tarea

- DELETE /tasks/:id — Eliminar una tarea


| Login | Tasks | Detail |
| --- | --- | --- |
| <img style="height: 400px" src="Imagenes/Captura 1.png"> | <img style="height: 400px" src="Imagenes/Captura 3.png"> | <img style="height: 400px" src="Imagenes/Captura 4.png"> |
