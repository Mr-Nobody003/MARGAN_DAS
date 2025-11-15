
#include <crow.h>
#include <nlohmann/json.hpp>
#include <spdlog/spdlog.h>
#include "src/routes/UserRoutes.h"
#include "src/utils/Database.h"
#include <memory>

int main()
{
	spdlog::info("Starting Crow server on port 8080");

	// Initialize database
	auto db = std::make_shared<Database>("app.db");
	if (!db->initialize()) {
		spdlog::error("Failed to initialize database");
		return 1;
	}

	crow::SimpleApp app;

	// Health check endpoint
	CROW_ROUTE(app, "/")([](){
		nlohmann::json j;
		j["message"] = "REST API Server is running";
		j["version"] = "1.0.0";
		crow::response res(j.dump());
		res.add_header("Content-Type", "application/json");
		return res;
	});

	// Register user routes
	UserRoutes userRoutes(db);
	userRoutes.registerRoutes(app);

	app.port(8080).multithreaded().run();
	return 0;
}
