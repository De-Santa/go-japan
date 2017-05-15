var gulp          = require('gulp'),
	notify          = require("gulp-notify"),
	browserSync     = require('browser-sync').create(),
	sass            = require('gulp-sass'),
	cleanCSS        = require('gulp-clean-css'),
	rename          = require('gulp-rename'),
	autoprefixer    = require('gulp-autoprefixer'),
	ngrok           = require('ngrok'),
	gutil           = require('gulp-util');


//BROWSER-SYNC OPTIONS
var bsOpts = {
	server: {
		baseDir: "app"
	},
	host: 'localhost',
	cors: true,
	ghostMode: false,
	notify: false
};

gulp.task('browser-sync', function() {
	browserSync.init(bsOpts, function (err, browserSync) {
		ngrok.connect({
			name: 'topaloff',
			proto: 'http',
			addr: browserSync.options.get('port'),
			authtoken: 'g1Q8762gENrKZR6rMBr7_7nffWfp9ZXGzuMH9Kt1qa',
			//auth: 'breffi:test',
			region: 'eu'
		}, function (err, url) {
			gutil.log('[ngrok]', ' => ', gutil.colors.magenta.underline(url))
		});
	});
});

gulp.task('scss', function() {
	return gulp.src('scss/**/*.scss')
		.pipe(sass.sync().on("error", notify.onError(sass.logError)))
		//.pipe(rename({suffix: '.min', prefix : ''}))
		.pipe(autoprefixer(['last 15 versions']))
		//.pipe(cleanCSS())
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', ['browser-sync'], function () {
	gulp.watch('scss/**/*.scss', ['scss']);
	gulp.watch('app/js/**/*.js', browserSync.reload);
	gulp.watch('app/*.html', browserSync.reload);

});

gulp.task('default', ['watch']);