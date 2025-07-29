-- Activar vuelo
onof.MouseButton1Down:connect(function()

	if nowe == true then
		nowe = false
		-- Rehabilitar todos los estados
		local states = Enum.HumanoidStateType:GetEnumItems()
		for _, state in ipairs(states) do
			speaker.Character.Humanoid:SetStateEnabled(state, true)
		end
		speaker.Character.Humanoid:ChangeState(Enum.HumanoidStateType.RunningNoPhysics)

	else 
		nowe = true

		-- Desactivar animaciones y estados innecesarios
		local states = Enum.HumanoidStateType:GetEnumItems()
		for _, state in ipairs(states) do
			speaker.Character.Humanoid:SetStateEnabled(state, false)
		end
		speaker.Character.Animate.Disabled = true

		-- Cambiar a estado 'Physics' para evitar sonidos de agua
		speaker.Character.Humanoid:ChangeState(Enum.HumanoidStateType.Physics)

		-- Empezar movimiento personalizado
		for i = 1, speeds do
			spawn(function()
				local hb = game:GetService("RunService").Heartbeat
				tpwalking = true
				local chr = game.Players.LocalPlayer.Character
				local hum = chr and chr:FindFirstChildWhichIsA("Humanoid")
				while tpwalking and hb:Wait() and chr and hum and hum.Parent do
					if hum.MoveDirection.Magnitude > 0 then
						chr:TranslateBy(hum.MoveDirection)
					end
				end
			end)
		end

		-- Detener animaciones visuales
		local Hum = speaker.Character:FindFirstChildOfClass("Humanoid") or speaker.Character:FindFirstChildOfClass("AnimationController")
		for _, anim in pairs(Hum:GetPlayingAnimationTracks()) do
			anim:AdjustSpeed(0)
		end
	end
end)
