class RunnerColour {
	constructor(r, g, b) {
		this.r = r;
		this.g = g;
		this.b = b;
	}

	static get RED() {
		return new RunnerColour(255, 0, 0);
	}
	static get GREEN() {
		return new RunnerColour(0, 255, 0);
	}
	static get BLUE() {
		return new RunnerColour(0, 0, 255);
	}
	static get PURPLE() {
		return new RunnerColour(255, 0, 255);
	}
	static get YELLOW() {
		return new RunnerColour(255, 255, 0);
	}
	static get CYAN() {
		return new RunnerColour(0, 255, 255);
	}

	static get COLOURS() {
		return [
			RunnerColour.RED,
			RunnerColour.GREEN,
			RunnerColour.BLUE,
			RunnerColour.PURPLE,
			RunnerColour.YELLOW,
			RunnerColour.CYAN
		];
	}

	getRgb() {
		return "rgb(" + this.r + ", " + this.g + ", " + this.b + ")";
	}

	getRgba(a) {
		return "rgba(" + this.r + ", " + this.g + ", " + this.b + ", " + (a ? a : 1) + ")";
	}
}
