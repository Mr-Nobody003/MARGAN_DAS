cmake_minimum_required(VERSION 3.15)
project(portfolio_server)
set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Enable vcpkg manifest mode
set(VCPKG_FEATURE_FLAGS "manifests")

# Add source files
add_executable(server
  main.cpp
  src/your_source_file.cpp
)

# Link dependencies managed by vcpkg
find_package(crow CONFIG REQUIRED)
find_package(nlohmann_json CONFIG REQUIRED)
find_package(OpenSSL REQUIRED)
find_package(redis++ CONFIG REQUIRED)

target_link_libraries(server
  PRIVATE
    crow::crow
    nlohmann_json::nlohmann_json
    OpenSSL::SSL OpenSSL::Crypto
    redis++::redis++
)
