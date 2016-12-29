class RunnerColour {
	constructor(r, g, b) {
		this.r = r;
		this.g = g;
		this.b = b;
	}

	getRgb() {
		return "rgb(" + this.r + ", " + this.g + ", " + this.b + ")";
	}

	getRgba(a) {
		return "rgba(" + this.r + ", " + this.g + ", " + this.b + ", " + (a ? a : 1) + ")";
	}
}
