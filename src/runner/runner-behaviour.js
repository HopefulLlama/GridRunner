class RunnerBehaviour {
	constructor(incrementPosition, getStartingPosition, isFinished, draw, drawTrail) {
		this.incrementPosition = incrementPosition;
		this.getStartingPosition = getStartingPosition;
		this.isFinished = isFinished;

		this.draw = draw;
		this.drawTrail = drawTrail;
	}
}