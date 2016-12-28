function random(min, max) {
	return Math.floor(Math.random() * (max + 1 - min) + min);
}

var stage;
window.onload = function() {
	stage = new Stage(document.getElementById("canvas"), 60, 10);
	stage.setBgColor(0, 0, 0);
	stage.setContextSize();

	window.onresize = function() {
		stage.setContextSize();
	};

	stage.startSpawning();
	stage.startDrawing();
};

function Stage(canvas, refreshRate, maxRunners) {
	this.canvas = canvas;
	this.context = canvas.getContext("2d");
	this.refreshRate = refreshRate;

	this.maxRunners = maxRunners;
	this.runners = [];

	this.drawingIntervalId = null;
	this.spawningIntervalId = null;
}

Stage.prototype.startSpawning = function() {
	var _this = this;
	this.spawningIntervalId = setInterval(function() {
		if(random(0, 100) < 75) {
			_this.spawnRunner();
		}
	}, 250);
};

Stage.prototype.stopSpawning = function() {
	if(this.spawningIntervalId !== null) {
		clearInterval(this.spawningIntervalId);
	}
}

Stage.prototype.setBgColor = function(r, g, b) {
	this.canvas.style.backgroundColor = "rgb(" + r + ", " + g + ", " + b +")";
};

Stage.prototype.setContextSize = function() {
	this.context.canvas.width = this.canvas.clientWidth;
	this.context.canvas.height = this.canvas.clientHeight;
};

Stage.prototype.clear = function() {
	this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
};

Stage.prototype.startDrawing = function() {
	var _this = this;
	this.drawingIntervalId = setInterval(function() {
		_this.clear();

		for(var r = _this.runners.length - 1; r > 0; r--) {
			var runner = _this.runners[r];
			runner.incrementPosition(_this.refreshRate);

			if(_this.isRunnerFinished(runner)) {
				_this.runners.splice(r, 1);
			}
		}

		for(var r = _this.runners.length - 1; r > 0; r--) {
			var runner = _this.runners[r];
			_this.drawRunnerTrail(runner);
		}
		
		for(var r = _this.runners.length - 1; r > 0; r--) {
			var runner = _this.runners[r];
			_this.drawRunner(runner);
		}

	}, 1e3 / this.refreshRate);
};

Stage.prototype.drawRunner = function(runner) {
	this.context.fillStyle = runner.colour.getRgb();
	this.context.strokeStyle = runner.colour.getRgb();
	this.context.fillRect(runner.x - Runner.SIZE, runner.y - Runner.SIZE, Runner.SIZE * 2, Runner.SIZE * 2);
};

Stage.prototype.drawRunnerTrail = function(runner) {
	var segments = Runner.INITIAL_TRAIL_OPACITY * 100;
	var length = Runner.TRAIL_LENGTH / segments;
	for(var d = 0; d < segments; d++) {
		this.context.fillStyle = runner.colour.getRgba((segments - d) / 100);
		this.context.strokeStyle = runner.colour.getRgba((segments - d) / 100);
		
		switch(runner.direction) {
			case Runner.LEFT:
				this.context.fillRect(runner.x + Runner.SIZE + (d * length), runner.y - Runner.SIZE, length, Runner.SIZE * 2);
				break;
			case Runner.UP:
				this.context.fillRect(runner.x - Runner.SIZE, runner.y + Runner.SIZE + (d * length), Runner.SIZE * 2, length);
				break;
			case Runner.RIGHT:
				this.context.fillRect(runner.x - Runner.SIZE - ((d + 1) * length), runner.y - Runner.SIZE, length, Runner.SIZE * 2);
				break;
			case Runner.DOWN:
				this.context.fillRect(runner.x - Runner.SIZE, runner.y - Runner.SIZE - ((d + 1) * length), Runner.SIZE * 2, length);
				break;
		}
	}
};

Stage.prototype.stopDrawing = function() {
	if(this.drawingIntervalId !== null) {
		clearInterval(this.drawingIntervalId);
	}
};

Stage.prototype.spawnRunner = function() {
	if(this.runners.length < this.maxRunners) {
		var startingInfo = Runner.getStartingInformation(this.context.canvas.width, this.context.canvas.height);
		this.runners.push(new Runner(
			RunnerColour.COLOURS[random(0, RunnerColour.COLOURS.length - 1)],
			startingInfo.direction,
			startingInfo.x,
			startingInfo.y
		));
	}
};

Stage.prototype.isRunnerFinished = function(runner) {
	switch(runner.direction) {
		case Runner.LEFT:
			return runner.x < 0 - Runner.SIZE - Runner.TRAIL_LENGTH;
		case Runner.UP:
			return runner.y < 0 - Runner.SIZE - Runner.TRAIL_LENGTH;
		case Runner.RIGHT:
			return runner.x > this.context.canvas.width + Runner.SIZE + Runner.TRAIL_LENGTH;
		case Runner.DOWN:
			return runner.y > this.context.canvas.height + Runner.SIZE + Runner.TRAIL_LENGTH;
	}
	return false;
};

function RunnerColour(r, g, b) {
	this.r = r;
	this.g = g;
	this.b = b;
}

RunnerColour.RED = new RunnerColour(255, 0, 0);
RunnerColour.GREEN = new RunnerColour(0, 255, 0);
RunnerColour.BLUE = new RunnerColour(0, 0, 255);
RunnerColour.PURPLE = new RunnerColour(255, 0, 255);
RunnerColour.YELLOW = new RunnerColour(0, 255, 255);
RunnerColour.ORANGE = new RunnerColour(255, 255, 0);

RunnerColour.COLOURS = [
	RunnerColour.RED,
	RunnerColour.GREEN,
	RunnerColour.BLUE,
	RunnerColour.PURPLE,
	RunnerColour.YELLOW,
	RunnerColour.ORANGE
];

RunnerColour.prototype.getRgb = function() {
	return "rgb(" + this.r + ", " + this.g + ", " + this.b + ")";
}

RunnerColour.prototype.getRgba = function(a) {
	return "rgba(" + this.r + ", " + this.g + ", " + this.b + ", " + a + ")";
}

function Runner(colour, direction, x, y) {
	this.colour = colour;
	this.direction = direction;
	this.x = x;
	this.y = y;
	this.startingX = x;
	this.startingY = y;
}

Runner.LEFT = 0;
Runner.UP = 1;
Runner.RIGHT = 2;
Runner.DOWN = 3;

Runner.DIRECTIONS = [
	Runner.LEFT,
	Runner.UP,
	Runner.RIGHT,
	Runner.DOWN
];

Runner.SIZE = 20;
Runner.TRAIL_LENGTH = 160;
Runner.INITIAL_TRAIL_OPACITY = 0.75;
Runner.SPEED = 300;

Runner.getStartingInformation = function(width, height) {
	var columns = Math.floor(width / Runner.SIZE);
	var rows = Math.floor(height / Runner.SIZE);

	var startingInfo = {
		direction: Runner.DIRECTIONS[random(0, Runner.DIRECTIONS.length - 1)],
		x: null,
		y: null
	};
	switch(startingInfo.direction) {
		case Runner.LEFT:
			startingInfo.x = width + 100;
			startingInfo.y = Runner.SIZE * random(0, rows);
			break;
		case Runner.UP:
			startingInfo.x = Runner.SIZE * random(0, columns);
			startingInfo.y = height + 100;
			break;
		case Runner.RIGHT:
			startingInfo.x = -100;
			startingInfo.y = Runner.SIZE * random(0, rows);
			break;
		case Runner.DOWN:
			startingInfo.x = Runner.SIZE * random(0, columns);
			startingInfo.y = -100;
			break;
		default:
			console.log("Error in calculating Runner position.");
			break;
	}
	return startingInfo;
};

Runner.prototype.incrementPosition = function(refreshRate) {
	var difference = Runner.SPEED / refreshRate;
	switch(this.direction) {
		case Runner.LEFT:
			this.x -= difference;
			break;
		case Runner.UP:
			this.y -= difference;
			break;
		case Runner.RIGHT:
			this.x += difference;
			break;
		case Runner.DOWN:
			this.y += difference;
			break;
		default:
			console.log("Error in calculating Runner position.");
			break;
	}
};