# Store Backend API

A simple Node.js and Express backend for managing users, products, authentication, and orders.

## Technologies

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- dotenv
- Postman

## Project structure

```text
store-backend/
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── orderController.js
│   │   ├── productController.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── roleMiddleware.js
│   ├── models/
│   │   ├── Order.js
│   │   ├── Product.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── productRoutes.js
│   │   └── userRoutes.js
│   └── server.js
├── .env
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── postman_collection.json
└── README.md
```

## Setup

1. Copy `.env.example` to `.env`.
2. Update the MongoDB connection string and JWT secret.
3. Install dependencies:

```bash
npm install
```

4. Start the server:

```bash
npm run dev
```

## API overview

### Status

- `GET /api/status`

### Authentication

- `POST /api/auth/register`
- `POST /api/auth/login`

### Users

- `POST /api/users`
- `GET /api/users`
- `GET /api/users/:id`
- `PUT /api/users/:id`
- `DELETE /api/users/:id`

### Products

- `POST /api/products`
- `GET /api/products`
- `GET /api/products/:id`
- `PUT /api/products/:id`
- `DELETE /api/products/:id`

### Orders

- `POST /api/orders`
- `GET /api/orders`
- `GET /api/orders/:id`

## Authentication and RBAC

The project uses JWT-based authentication and a simple role-based access system.

Roles:

- `user` - can view products and their own orders.
- `manager` - can manage products and view orders.
- `admin` - can manage products and users.

## Request flow

```text
Request → Route → Middleware → Controller → Model → MongoDB
```
