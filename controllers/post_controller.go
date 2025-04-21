package controllers

import (
	"github.com/Arvind0810/blogging.git/database"
	"github.com/Arvind0810/blogging.git/middleware"
	"github.com/Arvind0810/blogging.git/models"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
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

func GetPostBySlug(c *fiber.Ctx) error {
	slug := c.Params("slug")
	var post models.Post

	if err := database.DB.Preload("User").Where("slug = ? AND status = ?", slug, "published").First(&post).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "Post not found"})
	}

	return c.JSON(post)
}

func UpdatePost(c *fiber.Ctx) error {
	userID, _ := middleware.ExtractUserIDFromToken(c)

	postID := c.Params("id")

	var post models.Post

	if err := database.DB.First(&post, postID).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "Post not found"})
	}

	if post.UserID != userID {
		return c.Status(403).JSON(fiber.Map{"error": "You are not authorized to update this post"})
	}

	var data models.Post
	if err := c.BodyParser(&data); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid Input"})
	}

	post.Title = data.Title
	post.Slug = data.Slug
	post.Content = data.Content
	post.Status = data.Status

	database.DB.Save(&post)
	database.DB.Preload("User").First(&post, post.ID)
	return c.JSON(post)
}

func DeletePost(c *fiber.Ctx) error {
	userID, _ := middleware.ExtractUserIDFromToken(c)
	postID := c.Params("id")
	user := c.Locals("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	role := claims["role"].(string)
	var post models.Post
	if err := database.DB.First(&post, postID).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "Post not found"})
	}

	if post.UserID != userID && role != "admin"{
		return c.Status(403).JSON(fiber.Map{"error": "You are not authorized to delete this post"})
	}

	database.DB.Delete(&post)
	return c.Status(204).JSON(fiber.Map{"message": "Post deleted successfully"})
}