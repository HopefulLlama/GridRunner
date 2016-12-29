window.onload = function() {
	let stage = new Stage(
		document.getElementById("canvas"), 
		60, 
		new RunnerSettings(10, 75, 250, 20, 300, 160, 0.75), 
		new RunnerColourManager(false, [new RunnerColour(255, 255, 255)]), 
		new RunnerBehaviourManager(false, [])
	);
	stage.setBgColor(0, 0, 0);
	stage.setContextSize();

	window.onresize = function() {
		stage.setContextSize();
	};

	stage.startSpawning();
	stage.startDrawing();
};