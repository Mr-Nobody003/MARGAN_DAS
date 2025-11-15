# Crow REST API Server

A small C++ REST API server using Crow, SQLite3, nlohmann-json and spdlog.

This repository provides a minimal CRUD (Create, Read, Update, Delete) API for a `User` resource.

**Project root**: `d:\VAL\MARGAN_DAS\SERVER`

## Features

- GET /api/users — list users
- GET /api/users/:id — get user by id
- POST /api/users — create user
- PUT /api/users/:id — update user
- DELETE /api/users/:id — delete user
- Uses SQLite (`app.db`) for persistence

## Requirements

- Windows (tested with MSVC & CMake)
- CMake >= 3.15
- Visual Studio 2022 (MSVC toolchain) or another modern C++ compiler
- vcpkg (for dependency management)

Dependencies (managed via vcpkg manifest):
- crow
- sqlite3
- nlohmann-json
- spdlog
- fmt
- asio

## Build (PowerShell)

Open PowerShell in the project root (`d:\VAL\MARGAN_DAS\SERVER`) and run:

```powershell
# Point to your vcpkg instance shipped in the repo
$env:VCPKG_ROOT='d:\VAL\MARGAN_DAS\SERVER\vcpkg'
cmake -S . -B build -DCMAKE_TOOLCHAIN_FILE="$env:VCPKG_ROOT/scripts/buildsystems/vcpkg.cmake"
cmake --build build --config Debug
```

This will produce the executable `CrowServer.exe` at the project root.

## Run

Run the server (PowerShell):

```powershell
cd d:\VAL\MARGAN_DAS\SERVER
.\CrowServer.exe
```

By default the server listens on port `8080`.

## Database location

The server creates and uses a SQLite database file named `app.db` located in the working directory where the server is started. If you run the executable from `d:\VAL\MARGAN_DAS\SERVER`, the database path will be:

```
d:\VAL\MARGAN_DAS\SERVER\app.db
```

To change the database path, update `main.cpp` where the `Database` object is constructed, for example:

```cpp
// Use a `data` subdirectory
auto db = std::make_shared<Database>("data/app.db");
```

If you choose a subdirectory, create it before running the server or update `Database` to create directories automatically.

## API Endpoints

Base path: `/api/users`

- GET `/api/users`
  - Response: JSON array of user objects

- GET `/api/users/:id`
  - Response: JSON user object or 404 if not found

- POST `/api/users`
  - Request JSON body (example):
    ```json
    {
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "123-456-7890"
    }
    ```
  - Response: 201 Created with created user metadata

- PUT `/api/users/:id`
  - Request JSON body (same schema as POST)
  - Response: 200 OK with updated user

- DELETE `/api/users/:id`
  - Response: 200 OK with deletion confirmation

### Example curl (PowerShell-friendly)

Create a user:

```powershell
curl -X POST http://localhost:8080/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","phone":"123-456-7890"}'
```

Get all users:

```powershell
curl http://localhost:8080/api/users
```

Update user:

```powershell
curl -X PUT http://localhost:8080/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Doe","email":"jane@example.com","phone":"098-765-4321"}'
```

Delete user:

```powershell
curl -X DELETE http://localhost:8080/api/users/1
```

## Project structure

```
./
├─ CMakeLists.txt
├─ main.cpp
├─ README.md  <-- this file
├─ app.db     <-- created at runtime
├─ src/
│  ├─ models/
│  │  └─ User.h
│  ├─ routes/
│  │  ├─ UserRoutes.h
│  │  └─ UserRoutes.cpp
│  └─ utils/
│     ├─ Database.h
│     └─ Database.cpp
└─ vcpkg/     <-- vcpkg included in repo
```

## Testing

- Use `curl`, Postman,Thunderclient or any HTTP client to exercise endpoints.
- Inspect `app.db` with any SQLite client (e.g. `sqlite3` CLI or DB Browser for SQLite).

## Troubleshooting

- Missing CMake toolchain error: ensure CMake configure uses `-DCMAKE_TOOLCHAIN_FILE=<vcpkg>/scripts/buildsystems/vcpkg.cmake`.
- Linker errors for `sqlite3`: ensure `unofficial-sqlite3` is installed by vcpkg and CMakeLists links `unofficial::sqlite3::sqlite3`.

## Contributing

- Add new models under `src/models`
- Add route handlers under `src/routes`
- Add helpers under `src/utils`
- Keep CMake changes minimal and document them here

<!-- ## License

This project follows the repository's license. Add a LICENSE file if needed. -->
