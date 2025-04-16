package main

import (
	"log"
	"os"

	"github.com/Arvind0810/blogging.git/config"
	"github.com/Arvind0810/blogging.git/database"
	"github.com/Arvind0810/blogging.git/routes"
	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
)

func main() {
	// This is the main entry point for the Go application.
	// The code will be executed when the application is run.
	// You can add your application logic here.

	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	config.LoadEnv()
	database.ConnectDB()

	app := fiber.New()

	routes.SetupRoutes(app)

	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
	}

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, from Backend!")
	})
	log.Fatal(app.Listen(":"+port))
}