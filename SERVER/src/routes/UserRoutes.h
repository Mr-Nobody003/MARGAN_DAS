#ifndef USER_ROUTES_H
#define USER_ROUTES_H

#include <crow.h>
#include "../utils/Database.h"
#include <memory>

class UserRoutes {
private:
    std::shared_ptr<Database> db;

public:
    UserRoutes(std::shared_ptr<Database> database);

    // Register all user routes to the app
    void registerRoutes(crow::SimpleApp& app);

private:
    // Route handlers
    crow::response getAllUsers();
    crow::response getUserById(int id);
    crow::response createUser(const std::string& body);
    crow::response updateUser(int id, const std::string& body);
    crow::response deleteUser(int id);
};

#endif // USER_ROUTES_H
