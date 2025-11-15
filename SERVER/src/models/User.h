#ifndef USER_H
#define USER_H

#include <string>
#include <nlohmann/json.hpp>

using json = nlohmann::json;

class User {
public:
    int id;
    std::string name;
    std::string email;
    std::string phone;

    User() : id(0) {}
    User(int id, const std::string& name, const std::string& email, const std::string& phone)
        : id(id), name(name), email(email), phone(phone) {}

    // Convert User to JSON
    json toJson() const {
        return json{
            {"id", id},
            {"name", name},
            {"email", email},
            {"phone", phone}
        };
    }

    // Create User from JSON
    static User fromJson(const json& j) {
        User user;
        if (j.contains("id")) user.id = j["id"];
        if (j.contains("name")) user.name = j["name"];
        if (j.contains("email")) user.email = j["email"];
        if (j.contains("phone")) user.phone = j["phone"];
        return user;
    }
};

#endif // USER_H
