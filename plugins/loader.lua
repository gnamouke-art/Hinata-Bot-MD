if not game:IsLoaded() then
	game.Loaded:Wait()
end

repeat wait() until game:GetService("Players")
repeat wait() until game:GetService("Players").LocalPlayer
repeat wait() until game:GetService("Players").LocalPlayer:FindFirstChild("PlayerGui")
repeat wait() until game:GetService("ReplicatedStorage"):FindFirstChild("Neverlose_Loader")

local Neverlose_Loader = game:GetService("ReplicatedStorage"):WaitForChild("Neverlose_Loader")
local Get = Neverlose_Loader:WaitForChild("Get")
local Load = Neverlose_Loader:WaitForChild("Load")
local Services = require(Get:InvokeServer("Services"))
local UI = Load:InvokeServer("UI")
local Functions = Load:InvokeServer("Functions")
local Theme = Load:InvokeServer("Theme")
local LocalPlayer = Services.Players.LocalPlayer
local TweenService = Services.TweenService
local HttpService = Services.HttpService
local TextService = Services.TextService
local Mouse = LocalPlayer:GetMouse()
local GetMouseLocation = UserInputService.GetMouseLocation

-- Tokio Hub branding
UI.Main.Main.Top.Title.Text = "Tokio Hub"
UI.Main.Main.Top.DisplayName.Text = "Agente del Tokio Hub"

-- Make UI draggable
Functions:Drag(UI.Main.Main.Top, UI.Main.Main)

-- Animate UI in
TweenService:Create(
	UI.Main.Main,
	TweenInfo.new(0.35, Enum.EasingStyle.Sine, Enum.EasingDirection.InOut),
	{ Size = UDim2.new(0, 635, 0, 410) }
):Play()

wait(0.5)

TweenService:Create(
	UI.Main.Main,
	TweenInfo.new(0.25, Enum.EasingStyle.Sine, Enum.EasingDirection.InOut),
	{ Size = UDim2.new(0, 620, 0, 400) }
):Play()

-- Connect all buttons
Functions:Connect(UI.Main)

-- Make UI visible
UI.Main.Visible = true

-- Show welcome message
Functions:Notify("Bienvenido", "Gracias por usar Tokio Hub. ¡Disfruta tu experiencia!", 5)

-- Load any startup modules (if needed)
local StartupModules = Load:InvokeServer("StartupModules")
for _, module in pairs(StartupModules) do
	local success, result = pcall(function()
		require(module)
	end)
	if not success then
		warn("[Tokio Hub] Error al cargar un módulo de inicio:", result)
	end
end

-- Optional: load settings
local Settings = Load:InvokeServer("Settings")
if Settings then
	pcall(function()
		Functions:ApplySettings(Settings)
	end)
end

-- Monitor player activity (optional)
spawn(function()
	while wait(10) do
		pcall(function()
			if not LocalPlayer or not LocalPlayer.Parent then
				UI.Main.Visible = false
			end
		end)
	end
end)

-- Clean up UI on player leave
LocalPlayer.AncestryChanged:Connect(function()
	if not LocalPlayer:IsDescendantOf(game) then
		UI.Main:Destroy()
	end
end)

-- Success confirmation
print("[Tokio Hub] Cargado correctamente.")
