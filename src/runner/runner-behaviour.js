class RunnerBehaviour {
	constructor(direction, incrementPosition, getStartingPosition, isFinished) {
		this.direction = direction;
		this.incrementPosition = incrementPosition;
		this.getStartingPosition = getStartingPosition;
		this.isFinished = isFinished;
	}

	static get DIRECTION() {
		return {
			LEFT: 0,
			UP: 1,
			RIGHT: 2,
			DOWN: 3
		};
	}

	static get DIRECTIONS() {
		return [
			RunnerBehaviour.DIRECTION.LEFT,
			RunnerBehaviour.DIRECTION.UP,
			RunnerBehaviour.DIRECTION.RIGHT,
			RunnerBehaviour.DIRECTION.DOWN
		];
	}

	static get BEHAVIOUR() {
		return {
			LEFT: new RunnerBehaviour(RunnerBehaviour.DIRECTION.LEFT, function(runner, settings, refreshRate) {
					return new RunnerPosition(runner.position.x - settings.speed / refreshRate, runner.position.y);
				}, function(canvas, settings) {
					let columns = Math.floor(canvas.width / settings.size);
					let rows = Math.floor(canvas.height / settings.size);

					return new RunnerPosition(canvas.width + 100, settings.size * GridRunnerUtil.random(0, rows));
				}, function(canvas, runner, settings) {
					return runner.position.x < 0 - settings.size - settings.trailLength;
				}),
			UP: new RunnerBehaviour(RunnerBehaviour.DIRECTION.UP, function(runner, settings, refreshRate) {
					return new RunnerPosition(runner.position.x, runner.position.y - settings.speed / refreshRate);
				}, function(canvas, settings) {
					let columns = Math.floor(canvas.width / settings.size);
					let rows = Math.floor(canvas.height / settings.size);

					return new RunnerPosition(settings.size * GridRunnerUtil.random(0, columns), canvas.height + 100);
				}, function(canvas, runner, settings) {
					return runner.position.y < 0 - settings.size - settings.trailLength;
				}),
			RIGHT: new RunnerBehaviour(RunnerBehaviour.DIRECTION.RIGHT, function(runner, settings, refreshRate) {
					return new RunnerPosition(runner.position.x + settings.speed / refreshRate, runner.position.y);
				}, function(canvas, settings) {
					let columns = Math.floor(canvas.width / settings.size);
					let rows = Math.floor(canvas.height / settings.size);

					return new RunnerPosition(-100, settings.size * GridRunnerUtil.random(0, rows));
				}, function(canvas, runner, settings) {
					return runner.x > canvas.width + settings.size + settings.trailLength;
				}),
			DOWN: new RunnerBehaviour(RunnerBehaviour.DIRECTION.DOWN, function(runner, settings, refreshRate) {
					return new RunnerPosition(runner.position.x, runner.position.y + settings.speed / refreshRate);
				}, function(canvas, settings) {
					let columns = Math.floor(canvas.width / settings.size);
					let rows = Math.floor(canvas.height / settings.size);

					return new RunnerPosition(settings.size * GridRunnerUtil.random(0, columns), -100);
				}, function(canvas, runner, settings) {
					return runner.position.y > canvas.height + settings.size + settings.trailLength;
				})
		};
	}

	static get BEHAVIOURS() {
		return [
			RunnerBehaviour.BEHAVIOUR.LEFT,
			RunnerBehaviour.BEHAVIOUR.UP,
			RunnerBehaviour.BEHAVIOUR.RIGHT,
			RunnerBehaviour.BEHAVIOUR.DOWN
		];
	}
}