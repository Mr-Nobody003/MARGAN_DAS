cmake_minimum_required(VERSION 3.15)

# Enable vcpkg manifest mode early (before project() so vcpkg features are recognized)
set(VCPKG_FEATURE_FLAGS "manifests")

# IMPORTANT: CMake's toolchain file must be provided at configure time (via -DCMAKE_TOOLCHAIN_FILE=...)
# Setting `CMAKE_TOOLCHAIN_FILE` inside this file after `project()` is too late and will not enable vcpkg toolchain behavior.
# Detect common misconfiguration and stop early with actionable instructions.
if(NOT DEFINED CMAKE_TOOLCHAIN_FILE)
  if(EXISTS "${CMAKE_SOURCE_DIR}/vcpkg/scripts/buildsystems/vcpkg.cmake")
    message(FATAL_ERROR "vcpkg toolchain not passed to CMake. Run CMake with:\n  -DCMAKE_TOOLCHAIN_FILE=${CMAKE_SOURCE_DIR}/vcpkg/scripts/buildsystems/vcpkg.cmake\n\nOr set the environment variable VCPKG_ROOT to your vcpkg folder before configuring.\nExample (PowerShell):\n  $env:VCPKG_ROOT='${CMAKE_SOURCE_DIR}/vcpkg'; cmake -S . -B build -DCMAKE_TOOLCHAIN_FILE=\"$env:VCPKG_ROOT/scripts/buildsystems/vcpkg.cmake\"\n\nIf you use VS Code CMake Tools, add this to your workspace settings:\n  \"cmake.configureArgs\": [\"-DCMAKE_TOOLCHAIN_FILE=${CMAKE_SOURCE_DIR}/vcpkg/scripts/buildsystems/vcpkg.cmake\"]")
  elseif(DEFINED ENV{VCPKG_ROOT})
    message(FATAL_ERROR "CMake was not invoked with -DCMAKE_TOOLCHAIN_FILE but VCPKG_ROOT is set. Please pass the toolchain file explicitly: -DCMAKE_TOOLCHAIN_FILE=\"$ENV{VCPKG_ROOT}/scripts/buildsystems/vcpkg.cmake\"")
  else()
    message(FATAL_ERROR "No vcpkg toolchain detected. Install vcpkg or set VCPKG_ROOT, and invoke CMake with -DCMAKE_TOOLCHAIN_FILE=<vcpkg-root>/scripts/buildsystems/vcpkg.cmake")
  endif()
endif()

project(portfolio_server)
set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Set include directory if it exists
if(EXISTS "${CMAKE_SOURCE_DIR}/include")
  include_directories(${CMAKE_SOURCE_DIR}/include)
endif()

# Set output directories for build artifacts
# For a simpler layout similar to the requested template, place runtime artifacts in the source dir
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_SOURCE_DIR})
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY_DEBUG ${CMAKE_SOURCE_DIR})
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY_RELEASE ${CMAKE_SOURCE_DIR})
set(CMAKE_LIBRARY_OUTPUT_DIRECTORY ${CMAKE_SOURCE_DIR}/lib)
set(CMAKE_ARCHIVE_OUTPUT_DIRECTORY ${CMAKE_SOURCE_DIR}/lib)

# Collect source files from src directory
file(GLOB_RECURSE SOURCES "src/*.cpp")

# Add source files: use `main.cpp` in project root plus any sources under `src/` if present
add_executable(CrowServer
  main.cpp
  ${SOURCES}
)

# Ensure proper Windows target version and UTF-8 source encoding for MSVC
if(MSVC)
  target_compile_options(CrowServer PRIVATE /utf-8)
endif()

target_compile_definitions(CrowServer PRIVATE _WIN32_WINNT=0x0A00)

# Link dependencies managed by vcpkg (use CONFIG REQUIRED for vcpkg-provided targets)

# Use the package names as provided by vcpkg
find_package(Crow CONFIG REQUIRED)
find_package(asio CONFIG REQUIRED)
find_package(fmt CONFIG REQUIRED)
find_package(spdlog CONFIG REQUIRED)

target_link_libraries(CrowServer PRIVATE
  Crow::Crow
  asio::asio
  fmt::fmt
  spdlog::spdlog
)
