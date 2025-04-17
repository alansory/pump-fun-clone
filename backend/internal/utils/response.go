package utils

import "github.com/gofiber/fiber/v2"

// JSONResponse is a utility function to handle both success and error responses
func JSONResponse(ctx *fiber.Ctx, statusCode int, message string, data interface{}, errs interface{}) error {
	if ctx == nil {
		return fiber.NewError(fiber.StatusInternalServerError, "context cannot be nil")
	}

	response := fiber.Map{
		"code":    statusCode,
		"message": message,
	}

	// If there are errors, include the errors and do not include data
	if errs != nil {
		response["errors"] = errs
	} else if data != nil {
		// Include data only if there are no errors
		response["data"] = data
	}

	return ctx.Status(statusCode).JSON(response)
}
