window.onload = function() {
	let stage = new Stage(
		document.getElementById("canvas"), 
		60, 
		{r: 0, g: 0, b: 0},
		new RunnerSettings(10, 75, 250, 20, 300, 160, 0.75), 
		new RunnerColourManager(false, []), 
		new RunnerBehaviourManager(false, [])
	);
	stage.start()
};