class RunnerColourManager {
	constructor(removeDefaults, coloursToAdd) {
		if(!removeDefaults) {
			this.colours = [
				new RunnerColour(255, 0, 0), // Red
				new RunnerColour(0, 255, 0), // Green
				new RunnerColour(0, 0, 255), // BLUE
				new RunnerColour(255, 0, 255), // Purple? Fushchjiasdsa?
				new RunnerColour(255, 255, 0), // YELLOW
				new RunnerColour(0, 255, 255) // Cyan
			];
		} else {
			this.colours = [];
		}

		if(Array.isArray(coloursToAdd)) {
			let filteredColours = coloursToAdd.filter(function(colour) {
				return RunnerColour.prototype.isPrototypeOf(colour);
			});

			if(filteredColours.length !== coloursToAdd.length) {
				console.log("Error adding colours: Some colours have incorrect prototype.");
			}
			this.colours = this.colours.concat(filteredColours);
		} else {
			console.log("Error adding colours: Not an array.");
		}
	}

	getRandomColour() {
		return GridRunnerUtil.randomElement(this.colours);
	}
}