package routes

import (
	"github.com/Arvind0810/blogging.git/controllers"
	"github.com/Arvind0810/blogging.git/middleware"
	"github.com/gofiber/fiber/v2"
)

func PostRoutes(app *fiber.App) {
	api := app.Group("/api/posts")

	api.Get("/", controllers.GetAllPosts)

	api.Use(middleware.Protected()) // Protect all routes under /api/posts with authentication middleware
	api.Post("/", controllers.CreatePost)
	api.Get("/me", controllers.GetMyPosts)
}