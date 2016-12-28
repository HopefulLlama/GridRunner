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

	incrementPosition(speed, refreshRate) {
		this.position = this.behaviour.incrementPosition(this.position.x, this.position.y, speed, refreshRate);
	}

	isFinished(width, height, speed, trailLength) {
		return this.behaviour.isFinished(width, height, this.position.x, this.position.y, speed, trailLength);
	}
}