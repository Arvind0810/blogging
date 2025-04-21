package models

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Username string `json:"username" gorm:"unique;not null"`
	Email    string `json:"email" gorm:"unique;not null"`
	Password string `json:"-" gorm:"not null"`
	Role     string `json:"role" gorm:"default:'user'"` // admin, editor, user
	Posts    []Post `json:"posts" gorm:"foreignKey:UserID"`
}

type SafeUser struct {
	ID 	 uint   `json:"id"`
	Username string `json:"username"`
	Email    string `json:"email"`
	Role     string `json:"role"`
}
