window.onload = function() {
	let stage = new Stage(document.getElementById("canvas"), 60, 10);
	stage.setBgColor(0, 0, 0);
	stage.setContextSize();

	window.onresize = function() {
		stage.setContextSize();
	};

	stage.startSpawning();
	stage.startDrawing();
};