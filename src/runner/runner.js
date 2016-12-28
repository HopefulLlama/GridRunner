class Runner {
	constructor(colour, behaviour, position) {
		this.colour = colour;
		this.behaviour = behaviour;
		this.position = position;
	}

	static newRandomRunner(width, height, size) {
		let colour = GridRunnerUtil.randomElement(RunnerColour.COLOURS);
		let behaviour = GridRunnerUtil.randomElement(RunnerBehaviour.BEHAVIOURS);

		return new Runner(colour, behaviour, behaviour.getStartingPosition(width, height, size));
	}

	static get SIZE() {
		return 20;
	}

	static get TRAIL_LENGTH() {
		return 160;
	}

	static get INITIAL_TRAIL_OPACITY() {
		return 0.75;
	}

	static get SPEED() {
		return 300;
	}
	incrementPosition(speed, refreshRate) {
		console.log("BEFORE: ", this.position);
		this.position = this.behaviour.incrementPosition(this.position.x, this.position.y, Runner.SPEED, refreshRate);
		console.log("AFTER: ", this.position);
	}
	isFinished(width, height, speed, trailLength) {
		return this.behaviour.isFinished(width, height, this.position.x, this.position.y, speed, trailLength);
	}
}