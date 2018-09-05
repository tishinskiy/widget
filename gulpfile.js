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


const returnScripts = function(name) {
	return (
		gulp.task('scripts-' + name, function() {
			return gulp.src([
				'src/widgets/' + name + '/script.js', 
			])
			.pipe(debug({title: "scripts-" + name}))
			// .pipe(plumber())
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
						},
						{
							test: /\.less$/,
							use: [
								{
									loader: 'style-loader'
								}, 
								{
									loader: 'css-loader'
								}, 
								{
									loader: 'less-loader', options: {
										strictMath: true,
										noIeCompat: true
									}
								}
							]
						}
					],
				},
				devtool: 'hidden-source-map',
				mode
			}, webpack))

			.pipe(gulp.dest('./public/widgets/' + name))
			.pipe(browserSync.reload({stream: true}));
		})
	)
}


for (var i = widgets.length - 1; i >= 0; i--) {
	returnScripts(widgets[i])
}

gulp.task('watch', function() {
	for (var i = widgets.length - 1; i >= 0; i--) {
		gulp.watch('src/widgets/' + widgets[i] + '/**', gulp.series('scripts-' + widgets[i]))
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
		// arr.push('less-'+ widgets[i])
		arr.push('scripts-'+ widgets[i])
	}
	return arr
}

gulp.task('build', gulp.series('clean', tasks()));

gulp.task('dev',
	gulp.series('build', gulp.parallel('watch', 'serve'))
);
