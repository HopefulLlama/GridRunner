class Stage {
	constructor(canvas, refreshRate, maxRunners) {
		this.canvas = canvas;
		this.context = canvas.getContext("2d");
		this.refreshRate = refreshRate;

		this.maxRunners = maxRunners;
		this.runners = [];

		this.drawingIntervalId = null;
		this.spawningIntervalId = null;
	}


	startSpawning() {
		let _this = this;
		this.spawningIntervalId = setInterval(function() {
			if(GridRunnerUtil.random(0, 100) < 101) {
				_this.spawnRunner();
			}
		}, 250);
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
				runner.incrementPosition(Runner.SPEED, _this.refreshRate);

				if(runner.isFinished(_this.context.canvas.width, _this.context.canvas.height, Runner.SPEED, Runner.TRAIL_LENGTH)) {
					_this.runners.splice(r, 1);
				}
			}

			for(let r = _this.runners.length - 1; r > 0; r--) {
				let runner = _this.runners[r];
				_this.drawRunnerTrail(runner);
			}
			
			for(let r = _this.runners.length - 1; r > 0; r--) {
				let runner = _this.runners[r];
				_this.drawRunner(runner);
			}

		}, 1e3 / this.refreshRate);
	}

	drawRunner(runner) {
		this.context.fillStyle = runner.colour.getRgb();
		this.context.strokeStyle = runner.colour.getRgb();
		this.context.fillRect(runner.position.x - Runner.SIZE, runner.position.y - Runner.SIZE, Runner.SIZE * 2, Runner.SIZE * 2);
	}

	drawRunnerTrail(runner) {
		let segments = Runner.INITIAL_TRAIL_OPACITY * 100;
		let length = Runner.TRAIL_LENGTH / segments;
		for(let d = 0; d < segments; d++) {
			this.context.fillStyle = runner.colour.getRgba((segments - d) / 100);
			this.context.strokeStyle = runner.colour.getRgba((segments - d) / 100);
			
			switch(runner.behaviour.direction) {
				case RunnerBehaviour.DIRECTION.LEFT:
					this.context.fillRect(runner.position.x + Runner.SIZE + (d * length), runner.position.y - Runner.SIZE, length, Runner.SIZE * 2);
					break;
				case RunnerBehaviour.DIRECTION.UP:
					this.context.fillRect(runner.position.x - Runner.SIZE, runner.position.y + Runner.SIZE + (d * length), Runner.SIZE * 2, length);
					break;
				case RunnerBehaviour.DIRECTION.RIGHT:
					this.context.fillRect(runner.position.x - Runner.SIZE - ((d + 1) * length), runner.position.y - Runner.SIZE, length, Runner.SIZE * 2);
					break;
				case RunnerBehaviour.DIRECTION.DOWN:
					this.context.fillRect(runner.position.x - Runner.SIZE, runner.position.y - Runner.SIZE - ((d + 1) * length), Runner.SIZE * 2, length);
					break;
			}
		}
	}

	stopDrawing() {
		if(this.drawingIntervalId !== null) {
			clearInterval(this.drawingIntervalId);
		}
	}

	spawnRunner() {
		if(this.runners.length < this.maxRunners) {
			this.runners.push(Runner.newRandomRunner(this.context.canvas.width, this.context.canvas.height, Runner.SIZE));
		}
	}
}