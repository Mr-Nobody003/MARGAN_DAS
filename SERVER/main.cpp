
#include <crow.h>
#include <nlohmann/json.hpp>
#include <spdlog/spdlog.h>

int main()
{
	spdlog::info("Starting Crow server on port 8080");

	crow::SimpleApp app;

	CROW_ROUTE(app, "/")([](){
		nlohmann::json j;
		j["message"] = "Hello from Crow";
		crow::response res(j.dump());
		res.add_header("Content-Type", "application/json");
		return res;
	});

	CROW_ROUTE(app, "/hello/<string>")([](const std::string& name){
		nlohmann::json j;
		j["message"] = std::string("Hello, ") + name;
		crow::response res(j.dump());
		res.add_header("Content-Type", "application/json");
		return res;
	});

	app.port(8080).multithreaded().run();
	return 0;
}
