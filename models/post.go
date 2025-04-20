package models

import "gorm.io/gorm"

type Post struct {
	gorm.Model
	Title    string `gorm:"not null"`
	Slug     string `gorm:"uniqueIndex;not null"`
	Content  string `gorm:"type:text"`
	UserID   uint   // Foreign key
	User     User   `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	Status   string `gorm:"default:published"` // draft, published
}