module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			all: {
				src: ['*.js', './src/*/*.js']
			},
			options: {
				force: true,
				globals: {
					jQuery: true
				},
				esversion: 6
			}
		},
		concat: {
			dist: {
				src: [
					"src/grid-runner-util.js",
					"src/runner/runner-position.js",
					"src/runner/runner-colour.js",
					"src/runner/runner-colour-manager.js",
					"src/runner/runner-behaviour.js",
					"src/runner/runner-behaviour-manager.js",
					"src/runner/runner.js",
					"src/stage/runner-settings.js",
					"src/stage/stage.js"
				],
				dest: './dist/concat/concat.js'
			}
		},
		es6transpiler: {
			dist: {
				files: {
					'dist/concat/concat.es5.js': 'dist/concat/concat.js'
				}
			}
		},
		uglify: {
			target: {
				files: {
					'./dist/grid-runner.min.js': ['./dist/concat/concat.es5.js']
				}
			}
		},
		clean: ['./dist/concat']
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-es6-transpiler');

	grunt.registerTask('check', ['jshint']);
	grunt.registerTask('build', ['concat', 'es6transpiler', 'uglify', 'clean']);

	grunt.registerTask('default', ['check', 'build']);
};