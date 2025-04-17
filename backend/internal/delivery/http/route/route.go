package route

import (
	"backend/internal/delivery/http/controller"

	"github.com/gofiber/fiber/v2"
)

type RouteConfig struct {
	App            *fiber.App
	UserController *controller.UserController
	// AuthMiddleware fiber.Handler
}

func (c *RouteConfig) Setup() {
	c.SetupGuestRoute()
	// c.SetupAuthRoute()
}

func (c *RouteConfig) SetupGuestRoute() {
	c.App.Post("/register", c.UserController.Register)
	c.App.Post("/login", c.UserController.Login)
	c.App.Post("/auth/web3-login", c.UserController.LoginWithWeb3)
}

// func (c *RouteConfig) SetupAuthRoute() {
// 	c.App.Use(c.AuthMiddleware)
// 	c.App.Get("/api/users", c.UserController.Get)
// }
