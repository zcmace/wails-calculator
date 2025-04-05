package main

import (
	"context"
	"strconv"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Calculator operations
func (a *App) Calculate(operation string, num1 float64, num2 float64) string {
	var result float64

	switch operation {
	case "+":
		result = num1 + num2
	case "-":
		result = num1 - num2
	case "×":
		result = num1 * num2
	case "÷":
		if num2 == 0 {
			return "Error: Division by zero"
		}
		result = num1 / num2
	default:
		return "Error: Invalid operation"
	}

	// Format the result to remove trailing zeros
	return strconv.FormatFloat(result, 'f', -1, 64)
}

// Clear the calculator
func (a *App) Clear() string {
	return "0"
}
