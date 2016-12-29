class Runner {
	constructor(colour, behaviour, position) {
		this.colour = colour;
		this.behaviour = behaviour;
		this.position = position;
	}

	static newRandomRunner(canvas, settings) {
		let colour = GridRunnerUtil.randomElement(RunnerColour.COLOURS);
		let behaviour = GridRunnerUtil.randomElement(RunnerBehaviour.BEHAVIOURS);

		return new Runner(colour, behaviour, behaviour.getStartingPosition(canvas, settings));
	}

	incrementPosition(settings, refreshRate) {
		this.position = this.behaviour.incrementPosition(this, settings, refreshRate);
	}

	isFinished(canvas, settings) {
		return this.behaviour.isFinished(canvas, this, settings);
	}

	draw(context, settings) {
		this.behaviour.draw(context, this, settings);
	}

	drawTrail(context, settings) {
		this.behaviour.drawTrail(context, this, settings);
	}
}