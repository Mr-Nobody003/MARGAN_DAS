#include "UserRoutes.h"
#include <spdlog/spdlog.h>
#include <nlohmann/json.hpp>

using json = nlohmann::json;

UserRoutes::UserRoutes(std::shared_ptr<Database> database) : db(database) {
}

void UserRoutes::registerRoutes(crow::SimpleApp& app) {
    // GET all users
    CROW_ROUTE(app, "/api/users")
        .methods("GET"_method)
        ([this]() {
            return getAllUsers();
        });

    // GET user by ID
    CROW_ROUTE(app, "/api/users/<int>")
        .methods("GET"_method)
        ([this](int id) {
            return getUserById(id);
        });

    // POST create new user
    CROW_ROUTE(app, "/api/users")
        .methods("POST"_method)
        ([this](const crow::request& req) {
            return createUser(req.body);
        });

    // PUT update user
    CROW_ROUTE(app, "/api/users/<int>")
        .methods("PUT"_method)
        ([this](const crow::request& req, int id) {
            return updateUser(id, req.body);
        });

    // DELETE user
    CROW_ROUTE(app, "/api/users/<int>")
        .methods("DELETE"_method)
        ([this](int id) {
            return deleteUser(id);
        });
}

crow::response UserRoutes::getAllUsers() {
    try {
        auto users = db->getAllUsers();
        json response = json::array();
        
        for (const auto& user : users) {
            response.push_back(user.toJson());
        }

        crow::response res(response.dump());
        res.add_header("Content-Type", "application/json");
        return res;
    } catch (const std::exception& e) {
        spdlog::error("Error fetching users: {}", e.what());
        json error = {{"error", "Failed to fetch users"}};
        crow::response res(error.dump());
        res.code = 500;
        res.add_header("Content-Type", "application/json");
        return res;
    }
}

crow::response UserRoutes::getUserById(int id) {
    try {
        auto user = db->getUserById(id);
        if (user.id == 0) {
            json error = {{"error", "User not found"}};
            crow::response res(error.dump());
            res.code = 404;
            res.add_header("Content-Type", "application/json");
            return res;
        }

        crow::response res(user.toJson().dump());
        res.add_header("Content-Type", "application/json");
        return res;
    } catch (const std::exception& e) {
        spdlog::error("Error fetching user {}: {}", id, e.what());
        json error = {{"error", "Failed to fetch user"}};
        crow::response res(error.dump());
        res.code = 500;
        res.add_header("Content-Type", "application/json");
        return res;
    }
}

crow::response UserRoutes::createUser(const std::string& body) {
    try {
        auto data = json::parse(body);
        User user;
        user.name = data["name"];
        user.email = data["email"];
        user.phone = data.value("phone", "");

        if (db->createUser(user)) {
            json response = {{"message", "User created successfully"}, {"user", user.toJson()}};
            crow::response res(response.dump());
            res.code = 201;
            res.add_header("Content-Type", "application/json");
            return res;
        } else {
            json error = {{"error", "Failed to create user"}};
            crow::response res(error.dump());
            res.code = 400;
            res.add_header("Content-Type", "application/json");
            return res;
        }
    } catch (const std::exception& e) {
        spdlog::error("Error creating user: {}", e.what());
        json error = {{"error", "Invalid request format"}};
        crow::response res(error.dump());
        res.code = 400;
        res.add_header("Content-Type", "application/json");
        return res;
    }
}

crow::response UserRoutes::updateUser(int id, const std::string& body) {
    try {
        auto data = json::parse(body);
        User user;
        user.id = id;
        user.name = data["name"];
        user.email = data["email"];
        user.phone = data.value("phone", "");

        if (db->updateUser(user)) {
            json response = {{"message", "User updated successfully"}, {"user", user.toJson()}};
            crow::response res(response.dump());
            res.add_header("Content-Type", "application/json");
            return res;
        } else {
            json error = {{"error", "Failed to update user"}};
            crow::response res(error.dump());
            res.code = 400;
            res.add_header("Content-Type", "application/json");
            return res;
        }
    } catch (const std::exception& e) {
        spdlog::error("Error updating user {}: {}", id, e.what());
        json error = {{"error", "Invalid request format"}};
        crow::response res(error.dump());
        res.code = 400;
        res.add_header("Content-Type", "application/json");
        return res;
    }
}

crow::response UserRoutes::deleteUser(int id) {
    try {
        if (db->deleteUser(id)) {
            json response = {{"message", "User deleted successfully"}};
            crow::response res(response.dump());
            res.add_header("Content-Type", "application/json");
            return res;
        } else {
            json error = {{"error", "Failed to delete user"}};
            crow::response res(error.dump());
            res.code = 400;
            res.add_header("Content-Type", "application/json");
            return res;
        }
    } catch (const std::exception& e) {
        spdlog::error("Error deleting user {}: {}", id, e.what());
        json error = {{"error", "Failed to delete user"}};
        crow::response res(error.dump());
        res.code = 500;
        res.add_header("Content-Type", "application/json");
        return res;
    }
}
