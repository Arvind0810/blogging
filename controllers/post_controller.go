package controllers

import (
	"github.com/Arvind0810/blogging.git/database"
	"github.com/Arvind0810/blogging.git/middleware"
	"github.com/Arvind0810/blogging.git/models"
	"github.com/gofiber/fiber/v2"
)

func CreatePost(c *fiber.Ctx) error {
	userID, _ := middleware.ExtractUserIDFromToken(c)

	var post models.Post
	if err := c.BodyParser(&post); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid Input"})
	}

	post.UserID = userID

	if err := database.DB.Create(&post).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to create post"})
	}

	if err := database.DB.Preload("User").First(&post, post.ID).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to retrieve created post"})
	}
	return c.JSON(post)
}

func GetAllPosts(c *fiber.Ctx) error {
	var posts []models.Post
	if err := database.DB.Preload("User").Where("status= ?", "published").Find(&posts).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to retrieve posts"})
	}
	return c.JSON(posts)
}

func GetMyPosts(c *fiber.Ctx) error {
	userID, _ := middleware.ExtractUserIDFromToken(c)

	var posts []models.Post

	if err := database.DB.Where("user_id = ?", userID).Find(&posts).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to retrieve posts"})
	}

	return c.JSON(posts)
}