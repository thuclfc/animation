var gulp=require('gulp');
var concat=require('gulp-concat');
var minify=require('gulp-minify');
var cleanCss=require('gulp-clean-css');
var sass=require('gulp-sass');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var rev=require('gulp-rev');
var del=require('del');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

gulp.task('sass', function () {
    return gulp.src('project/assets/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('project/assets/css'))
        .pipe(browserSync.stream());
});

gulp.task('img', function () {
   return gulp.src('project/assets/images/**/*.+(png|jpg|gif|svg)')
       .pipe(imagemin({
           progressive: true,
           svgoPlugins: [{removeViewBox: false}],
           use: [pngquant()]
       }))
       .pipe(gulp.dest('project/build/images'))
       .pipe(browserSync.stream());
});

gulp.task('pack-js', function () {
   return gulp.src('project/assets/js/*.js')
       .pipe(concat('bundle.js'))
       .pipe(minify({
           ext:{
               min:'.js'
           },
           noSource: true
       }))
       .pipe(gulp.dest('project/build/js'))
       .pipe(browserSync.stream());
});

gulp.task('pack-css', function () {
   return gulp.src('project/assets/css/*.css')
       .pipe(concat('style1.css'))
       .pipe(cleanCss())
       .pipe(gulp.dest('project/build/css'))
       .pipe(browserSync.stream());
});

gulp.task('html', function () {
    return gulp.src('project/**/*.html')
        .pipe(browserSync.stream());

});

gulp.task('watch', function () {
    browserSync.init({
        server: "./project"
    });
   gulp.watch('project/assets/js/**/*.js',['pack-js']);
   gulp.watch('project/assets/css/**/*.css',['pack-css']);
   gulp.watch('project/assets/scss/**/*.scss',['sass']);
   gulp.watch('project/assets/images/**/*.+(png|jpg|gif|svg)',['img']);
   gulp.watch('project/**/*.html',['html']);
});

gulp.task('default',['watch']);