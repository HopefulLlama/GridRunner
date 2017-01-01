class Stage {
	constructor(canvasId, refreshRate, backgroundColour, runnerSettings, runnerColourManager, runnerBehaviourManager) {
		this.canvas = document.getElementById(canvasId);
		this.context = this.canvas.getContext("2d");
		this.refreshRate = (refreshRate !== undefined) ? refreshRate : 60 ;
		this.runnerSettings = (runnerSettings !== undefined) ? runnerSettings : new RunnerSettings(10, 75, 250, 20, 300, 160, 0.75);
		this.runnerColourManager = (runnerColourManager !== undefined) ? runnerColourManager : new RunnerColourManager(false, []);
		this.runnerBehaviourManager = (runnerBehaviourManager !== undefined) ? runnerBehaviourManager : new RunnerBehaviourManager(false, []);

		this.runners = [];

		this.drawingIntervalId = null;
		this.spawningIntervalId = null;

		this.setContextSize();

		backgroundColour = (backgroundColour !== undefined) ? backgroundColour : {r: 0, g: 0, b: 0};
		this.setBgColour(backgroundColour.r, backgroundColour.g, backgroundColour.b);

		let _this = this;
		window.onresize = function() {
			_this.setContextSize();
		};
	}

	startSpawning() {
		if(this.spawningIntervalId === null) {
			let _this = this;
			this.spawningIntervalId = setInterval(function() {
				if(GridRunnerUtil.random(0, 100) < _this.runnerSettings.spawnChance && _this.runners.length < _this.runnerSettings.maxRunners) {
					_this.runners.push(Runner.newRandomRunner(_this.context.canvas, _this.runnerSettings, _this.runnerColourManager, _this.runnerBehaviourManager));
				}
			}, this.runnerSettings.spawnDelay);
		}
	}

	stopSpawning() {
		if(this.spawningIntervalId !== null) {
			clearInterval(this.spawningIntervalId);
		}
	}

	setBgColour(r, g, b) {
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
		if(this.spawningIntervalId === null) {
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
	}

	stopDrawing() {
		if(this.drawingIntervalId !== null) {
			clearInterval(this.drawingIntervalId);
		}
	}

	start() {
		this.startDrawing();
		this.startSpawning();
	}

	pause() {
		this.stopDrawing();
		this.stopSpawning();
	}

	stop() {
		this.pause();
		this.clear();
		this.runners = [];
	}
}