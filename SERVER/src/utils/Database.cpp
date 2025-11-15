#include "Database.h"
#include <spdlog/spdlog.h>
#include <iostream>

Database::Database(const std::string& dbPath) : db(nullptr), dbPath(dbPath) {
}

Database::~Database() {
    if (db) {
        sqlite3_close(db);
    }
}

bool Database::initialize() {
    int rc = sqlite3_open(dbPath.c_str(), &db);
    if (rc) {
        spdlog::error("Cannot open database: {}", sqlite3_errmsg(db));
        return false;
    }

    // Create users table
    const char* sql = R"(
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            phone TEXT
        );
    )";

    if (!execute(sql)) {
        spdlog::error("Failed to create users table");
        return false;
    }

    spdlog::info("Database initialized successfully");
    return true;
}

bool Database::execute(const std::string& query) {
    char* errMsg = nullptr;
    int rc = sqlite3_exec(db, query.c_str(), nullptr, nullptr, &errMsg);
    if (rc != SQLITE_OK) {
        spdlog::error("SQL error: {}", errMsg);
        sqlite3_free(errMsg);
        return false;
    }
    return true;
}

bool Database::createUser(const User& user) {
    std::string sql = "INSERT INTO users (name, email, phone) VALUES ('" + user.name + "', '" + 
                      user.email + "', '" + user.phone + "');";
    return execute(sql);
}

User Database::getUserById(int id) {
    User user;
    std::string sql = "SELECT id, name, email, phone FROM users WHERE id = " + std::to_string(id) + ";";

    sqlite3_stmt* stmt;
    if (sqlite3_prepare_v2(db, sql.c_str(), -1, &stmt, nullptr) == SQLITE_OK) {
        if (sqlite3_step(stmt) == SQLITE_ROW) {
            user.id = sqlite3_column_int(stmt, 0);
            user.name = reinterpret_cast<const char*>(sqlite3_column_text(stmt, 1));
            user.email = reinterpret_cast<const char*>(sqlite3_column_text(stmt, 2));
            user.phone = reinterpret_cast<const char*>(sqlite3_column_text(stmt, 3));
        }
    }
    sqlite3_finalize(stmt);
    return user;
}

std::vector<User> Database::getAllUsers() {
    std::vector<User> users;
    std::string sql = "SELECT id, name, email, phone FROM users;";

    sqlite3_stmt* stmt;
    if (sqlite3_prepare_v2(db, sql.c_str(), -1, &stmt, nullptr) == SQLITE_OK) {
        while (sqlite3_step(stmt) == SQLITE_ROW) {
            User user;
            user.id = sqlite3_column_int(stmt, 0);
            user.name = reinterpret_cast<const char*>(sqlite3_column_text(stmt, 1));
            user.email = reinterpret_cast<const char*>(sqlite3_column_text(stmt, 2));
            user.phone = reinterpret_cast<const char*>(sqlite3_column_text(stmt, 3));
            users.push_back(user);
        }
    }
    sqlite3_finalize(stmt);
    return users;
}

bool Database::updateUser(const User& user) {
    std::string sql = "UPDATE users SET name = '" + user.name + "', email = '" + 
                      user.email + "', phone = '" + user.phone + "' WHERE id = " + 
                      std::to_string(user.id) + ";";
    return execute(sql);
}

bool Database::deleteUser(int id) {
    std::string sql = "DELETE FROM users WHERE id = " + std::to_string(id) + ";";
    return execute(sql);
}
