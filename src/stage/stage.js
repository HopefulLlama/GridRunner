class Stage {
	constructor(canvas, refreshRate, runnerSettings, runnerColourManager, runnerBehaviourManager) {
		this.canvas = canvas;
		this.context = canvas.getContext("2d");
		this.refreshRate = refreshRate;
		this.runnerSettings = runnerSettings;
		this.runnerColourManager = runnerColourManager;
		this.runnerBehaviourManager = runnerBehaviourManager;

		this.runners = [];

		this.drawingIntervalId = null;
		this.spawningIntervalId = null;
	}

	startSpawning() {
		let _this = this;
		this.spawningIntervalId = setInterval(function() {
			if(GridRunnerUtil.random(0, 100) < _this.runnerSettings.spawnChance && _this.runners.length < _this.runnerSettings.maxRunners) {
				_this.runners.push(Runner.newRandomRunner(_this.context.canvas, _this.runnerSettings, _this.runnerColourManager, _this.runnerBehaviourManager));
			}
		}, this.runnerSettings.spawnDelay);
	}

	stopSpawning() {
		if(this.spawningIntervalId !== null) {
			clearInterval(this.spawningIntervalId);
		}
	}

	setBgColor(r, g, b) {
		this.canvas.style.backgroundColor = "rgb(" + r + ", " + g + ", " + b +")";
	}

	setContextSize() {
		this.context.canvas.width = this.canvas.clientWidth;
		this.context.canvas.height = this.canvas.clientHeight;
	}

	clear() {
		this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
	}

	startDrawing() {
		let _this = this;
		this.drawingIntervalId = setInterval(function() {
			_this.clear();

			for(let r = _this.runners.length - 1; r >= 0; r--) {
				let runner = _this.runners[r];
				runner.incrementPosition(_this.runnerSettings, _this.refreshRate);

				if(runner.isFinished(_this.context.canvas, _this.runnerSettings)) {
					_this.runners.splice(r, 1);
				}
			}

			for(let r = _this.runners.length - 1; r > 0; r--) {
				let runner = _this.runners[r];
				runner.drawTrail(_this.context, _this.runnerSettings);
			}
			
			for(let r = _this.runners.length - 1; r > 0; r--) {
				let runner = _this.runners[r];
				runner.draw(_this.context, _this.runnerSettings);
			}

		}, 1e3 / this.refreshRate);
	}

	stopDrawing() {
		if(this.drawingIntervalId !== null) {
			clearInterval(this.drawingIntervalId);
		}
	}
}