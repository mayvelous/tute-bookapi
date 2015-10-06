var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    gulpMocha = require('gulp-mocha'),
    env = require('gulp-env'),
    notify = require('gulp-notify'),
    livereload = require('gulp-livereload');
    //supertest = require('supertest');

// if the task name is other than 'default' need to run 'gulp xx', otherwise just 'gulp' will run the app
gulp.task('default', function(){
    // listen for changes
    livereload.listen();
    // configure nodemon
    nodemon({
        script: 'app.js', // the script to run the app
        ext: 'js',
        env:{
            PORT: 8000
        },
        ignore: '[./node_modules/**]' // ignore file changes in these dir
    }).on('restart', function(){
        // when the app has restarted, run the livereload
        gulp.src('app.js')
            .pipe(livereload())
            .pipe(notify('Reloading page, please wait...'));

        });
});

gulp.task('test', function(){
    env({vars:{ENV:'test'}});
    gulp.src('tests/*.js', {read:false})
        .pipe(gulpMocha({reporter: 'nyan'}));
});
