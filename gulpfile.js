const gulp = require('gulp')
const gulpClean = require('gulp-clean')
const gulpHTMLMin = require('gulp-htmlmin')
const gulpAutoprefixer = require('gulp-autoprefixer')
const gulpCleanCSS = require('gulp-clean-css')
const gulpUglify = require('gulp-uglify')

function cleanDist(callback) {
	return gulp
		.src('dist', {
			read: false,
			allowEmpty: true,
		})
		.pipe(gulpClean())
		.on('end', callback)
}

function copySrc(callback) {
	return gulp
		.src(['src/**/*', '!src/**/*.+(html|css|js)'])
		.pipe(gulp.dest('dist'))
		.on('end', callback)
}

function processHTML(callback) {
	return gulp
		.src('src/**/*.html')
		.pipe(gulpHTMLMin({ collapseWhitespace: true }))
		.pipe(gulp.dest('dist'))
		.on('end', callback)
}

function processCSS(callback) {
	return gulp
		.src('src/**/*.css')
		.pipe(gulpAutoprefixer())
		.pipe(gulpCleanCSS())
		.pipe(gulp.dest('dist'))
		.on('end', callback)
}

function processJS(callback) {
	return gulp.src('src/**/*.js').pipe(gulpUglify()).pipe(gulp.dest('dist')).on('end', callback)
}

exports.clean = cleanDist
exports.build = gulp.series(cleanDist, gulp.parallel(copySrc, processHTML, processCSS, processJS))
