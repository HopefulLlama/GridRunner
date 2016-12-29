class RunnerBehaviourManager {
	constructor(removeDefaults, behavioursToAdd) {
		if(!removeDefaults) {
			this.behaviours = [
				// Left
				new RunnerBehaviour(function(runner, settings, refreshRate) {
					return new RunnerPosition(runner.position.x - settings.speed / refreshRate, runner.position.y);
				}, function(canvas, settings) {
					let columns = Math.floor(canvas.width / settings.size);
					let rows = Math.floor(canvas.height / settings.size);

					return new RunnerPosition(canvas.width + 100, settings.size * GridRunnerUtil.random(0, rows));
				}, function(canvas, runner, settings) {
					return runner.position.x < 0 - settings.size - settings.trailLength;
				}, function(context, runner, settings) {
					context.fillStyle = runner.colour.getRgb();
					context.strokeStyle = runner.colour.getRgb();
					context.fillRect(runner.position.x - settings.size, runner.position.y - settings.size, settings.size * 2, settings.size * 2);
				}, function(context, runner, settings) {
					let segments = settings.initialTrailOpacity * 100;
					let length = settings.trailLength / segments;
					for(let d = 0; d < segments; d++) {
						context.fillStyle = runner.colour.getRgba((segments - d) / 100);
						context.strokeStyle = runner.colour.getRgba((segments - d) / 100);
						context.fillRect(runner.position.x + settings.size + (d * length), runner.position.y - settings.size, length, settings.size * 2);
					}
				}),
				// Up
				new RunnerBehaviour(function(runner, settings, refreshRate) {
					return new RunnerPosition(runner.position.x, runner.position.y - settings.speed / refreshRate);
				}, function(canvas, settings) {
					let columns = Math.floor(canvas.width / settings.size);
					let rows = Math.floor(canvas.height / settings.size);

					return new RunnerPosition(settings.size * GridRunnerUtil.random(0, columns), canvas.height + 100);
				}, function(canvas, runner, settings) {
					return runner.position.y < 0 - settings.size - settings.trailLength;
				}, function(context, runner, settings) {
					context.fillStyle = runner.colour.getRgb();
					context.strokeStyle = runner.colour.getRgb();
					context.fillRect(runner.position.x - settings.size, runner.position.y - settings.size, settings.size * 2, settings.size * 2);
				}, function(context, runner, settings) {
					let segments = settings.initialTrailOpacity * 100;
					let length = settings.trailLength / segments;
					for(let d = 0; d < segments; d++) {
						context.fillStyle = runner.colour.getRgba((segments - d) / 100);
						context.strokeStyle = runner.colour.getRgba((segments - d) / 100);
						context.fillRect(runner.position.x - settings.size, runner.position.y + settings.size + (d * length), settings.size * 2, length);
					}
				}),
				// Right
				new RunnerBehaviour(function(runner, settings, refreshRate) {
					return new RunnerPosition(runner.position.x + settings.speed / refreshRate, runner.position.y);
				}, function(canvas, settings) {
					let columns = Math.floor(canvas.width / settings.size);
					let rows = Math.floor(canvas.height / settings.size);

					return new RunnerPosition(-100, settings.size * GridRunnerUtil.random(0, rows));
				}, function(canvas, runner, settings) {
					return runner.position.x > canvas.width + (settings.size * 2) + settings.trailLength;
				}, function(context, runner, settings) {
					context.fillStyle = runner.colour.getRgb();
					context.strokeStyle = runner.colour.getRgb();
					context.fillRect(runner.position.x - settings.size, runner.position.y - settings.size, settings.size * 2, settings.size * 2);
				}, function(context, runner, settings) {
					let segments = settings.initialTrailOpacity * 100;
					let length = settings.trailLength / segments;
					for(let d = 0; d < segments; d++) {
						context.fillStyle = runner.colour.getRgba((segments - d) / 100);
						context.strokeStyle = runner.colour.getRgba((segments - d) / 100);
						context.fillRect(runner.position.x - settings.size - ((d + 1) * length), runner.position.y - settings.size, length, settings.size * 2);
					}
				}),
				// Down
				new RunnerBehaviour(function(runner, settings, refreshRate) {
					return new RunnerPosition(runner.position.x, runner.position.y + settings.speed / refreshRate);
				}, function(canvas, settings) {
					let columns = Math.floor(canvas.width / settings.size);
					let rows = Math.floor(canvas.height / settings.size);

					return new RunnerPosition(settings.size * GridRunnerUtil.random(0, columns), -100);
				}, function(canvas, runner, settings) {
					return runner.position.y > canvas.height + (settings.size * 2) + settings.trailLength;
				}, function(context, runner, settings) {
					context.fillStyle = runner.colour.getRgb();
					context.strokeStyle = runner.colour.getRgb();
					context.fillRect(runner.position.x - settings.size, runner.position.y - settings.size, settings.size * 2, settings.size * 2);
				}, function(context, runner, settings) {
					let segments = settings.initialTrailOpacity * 100;
					let length = settings.trailLength / segments;
					for(let d = 0; d < segments; d++) {
						context.fillStyle = runner.colour.getRgba((segments - d) / 100);
						context.strokeStyle = runner.colour.getRgba((segments - d) / 100);
						context.fillRect(runner.position.x - settings.size, runner.position.y - settings.size - ((d + 1) * length), settings.size * 2, length);
					}
				})
			];
		} else {
			this.behaviours = [];
		}

		if(Array.isArray(behavioursToAdd)) {
			let filteredBehaviours = behavioursToAdd.filter(function(behaviour) {
				return RunnerBehaviour.prototype.isPrototypeOf(behaviour);
			});

			if(filteredBehaviours.length !== behavioursToAdd.length) {
				console.log("Error adding behaviours: Some behaviours have incorrect prototype.");
			}
			this.behaviours = this.behaviours.concat(filteredBehaviours);
		} else {
			console.log("Error adding behaviours: Not an array.");
		}
	}

	getRandomBehaviour() {
		return GridRunnerUtil.randomElement(this.behaviours);
	}
}