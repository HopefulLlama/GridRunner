class GridRunnerUtil {
	static random(min, max) {
		return Math.floor(Math.random() * (max + 1 - min) + min);
	}

	static randomElement(array) {
		return array[GridRunnerUtil.random(0, array.length - 1)];
	}
}