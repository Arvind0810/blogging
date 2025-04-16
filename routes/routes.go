package routes

import "github.com/gofiber/fiber/v2"

func SetupRoutes(app *fiber.App) {

	app.Get("/posts", func(c *fiber.Ctx) error {
		return c.SendString("List of posts")
	})
}