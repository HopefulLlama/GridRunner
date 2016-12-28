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
			LEFT: new RunnerBehaviour(RunnerBehaviour.DIRECTION.LEFT, function(x, y, speed, refreshRate) {
					return new RunnerPosition(x - speed / refreshRate, y);
				}, function(width, height, size) {
					let columns = Math.floor(width / size);
					let rows = Math.floor(height / size);

					return new RunnerPosition(width + 100, size * GridRunnerUtil.random(0, rows));
				}, function(width, height, x, y, size, trailLength) {
					return x < 0 - size - trailLength;
				}),
			UP: new RunnerBehaviour(RunnerBehaviour.DIRECTION.UP, function(x, y, speed, refreshRate) {
					return new RunnerPosition(x, y - speed / refreshRate);
				}, function(width, height, size) {
					let columns = Math.floor(width / size);
					let rows = Math.floor(height / size);

					return new RunnerPosition(size * GridRunnerUtil.random(0, columns), height + 100);
				}, function(width, height, x, y, size, trailLength) {
					return y < 0 - size - trailLength;
				}),
			RIGHT: new RunnerBehaviour(RunnerBehaviour.DIRECTION.RIGHT, function(x, y, speed, refreshRate) {
					return new RunnerPosition(x + speed / refreshRate, y);
				}, function(width, height, size) {
					let columns = Math.floor(width / size);
					let rows = Math.floor(height / size);

					return new RunnerPosition(-100, size * GridRunnerUtil.random(0, rows));
				}, function(width, height, x, y, size, trailLength) {
					return x > width + size + trailLength;
				}),
			DOWN: new RunnerBehaviour(RunnerBehaviour.DIRECTION.DOWN, function(x, y, speed, refreshRate) {
					return new RunnerPosition(x, y + speed / refreshRate);
				}, function(width, height, size) {
					let columns = Math.floor(width / size);
					let rows = Math.floor(height / size);

					return new RunnerPosition(size * GridRunnerUtil.random(0, columns), -100);
				}, function(width, height, x, y, size, trailLength) {
					return y > height + size + trailLength;
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