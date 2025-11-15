#ifndef DATABASE_H
#define DATABASE_H

#include <string>
#include <vector>
#include <memory>
#include <sqlite3.h>
#include "../models/User.h"

class Database {
private:
    sqlite3* db;
    std::string dbPath;

public:
    Database(const std::string& dbPath = "app.db");
    ~Database();

    // Initialize database and create tables
    bool initialize();

    // User operations
    bool createUser(const User& user);
    User getUserById(int id);
    std::vector<User> getAllUsers();
    bool updateUser(const User& user);
    bool deleteUser(int id);

private:
    bool execute(const std::string& query);
    std::string getLastError() const;
};

#endif // DATABASE_H
