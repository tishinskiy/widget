;'use strict';

const gulp = require('gulp');
const less = require('gulp-less');
const csso = require('gulp-csso');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber-notifier');
const debug = require('gulp-debug');
const stripDebug = require('gulp-strip-debug');
const cleanCSS = require('gulp-clean-css');
const gulpIf = require('gulp-if');
const babel = require('gulp-babel');
const newer = require('gulp-newer');
const pug = require('gulp-pug');
const browserSync  = require('browser-sync').create();
const del = require('del');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const named = require('vinyl-named');
const isDevelopment = process.env.NODE_ENV != 'development';

const mode = process.env.NODE_ENV == 'development' ? 'development' : 'production'

gulp.task('clean', function(){
	return del('./public')
})

gulp.task('templates', function() {
	return gulp.src('src/index.html')
	.pipe(debug({title: "templates"}))
	.pipe(plumber())
	.pipe(gulp.dest('./public'));
});

const widgets = ['basket', 'cards', 'order', 'regions']

const returnLess = function(name) {
	gulp.task('less-' + name, function() {
		return gulp.src('src/widgets/' + name + '/style.less')
		.pipe(gulpIf(!isDevelopment, 
				newer('./public/styles/')
			))
		.pipe(debug({title: "less"}))
		.pipe(plumber())
		.pipe(less())
		.pipe(autoprefixer())
		// .pipe(csso())
		.pipe(gulpIf(isDevelopment, csso()))
		.pipe(gulp.dest('./public/widgets/' + name));
	});
}

const returnScripts = function(name) {
	return (
		gulp.task('scripts-' + name, function() {
			return gulp.src([
				'src/widgets/' + name + '/script.js', 
			])
			.pipe(debug({title: "scripts"}))
			.pipe(plumber())
			.pipe(named())
			.pipe(webpackStream({
				output: {
					filename: './[name].js',
				},
				module: {
					rules: [
						{
							test: /\.(js)$/,
							exclude: /(node_modules)/,
							loader: 'babel-loader',
							query: {
								presets: ['env']
							}
						}
					],
				},
				devtool: 'hidden-source-map',
				mode
			}))

			.pipe(gulp.dest('./public/widgets/' + name))
		})
	)
}


for (var i = widgets.length - 1; i >= 0; i--) {
	returnLess(widgets[i])
	returnScripts(widgets[i])
}

gulp.task('watch', function() {
	for (var i = widgets.length - 1; i >= 0; i--) {
		gulp.watch('src/widgets/' + widgets[i] + '/*.js', gulp.series('scripts-' + widgets[i]))
		gulp.watch('src/widgets/' + widgets[i] + '/*.less', gulp.series('less-' + widgets[i]))
	}

	gulp.watch('src/index.html', gulp.series('templates'));
});

gulp.task('serve', function() {
	browserSync.init({
		server: 'public'
	});

	browserSync.watch('public/**').on('change', browserSync.reload);
});

const tasks = function(){
	let arr =['templates']
	for (var i = widgets.length - 1; i >= 0; i--) {
		arr.push('less-'+ widgets[i])
		arr.push('scripts-'+ widgets[i])
	}
	return arr
}

gulp.task('build', gulp.series('clean', gulp.parallel(tasks())));

gulp.task('dev',
	gulp.series('build', gulp.parallel('watch', 'serve'))
);
