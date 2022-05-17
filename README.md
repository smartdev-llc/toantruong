#Available routes

1. Get all users (protected)

- Path: /users
- Method: Get
- Required headers: Bearer token

2. Register

- Path: /register
- Method: Post
- Required request body: user data; format: { username: value, password: value }

3. Login

- Path: /login
- Method: Post
- Required request body: user data; format: { username: value, password: value }
