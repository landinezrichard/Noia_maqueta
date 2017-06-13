/*
INSTALAR TODO CON:

	npm i -D gulp gulp-stylus nib gulp-pug gulp-image-optimization gulp-util gulp-group-css-media-queries browser-sync
*/

/*Para ver los errores que arroja gulp-util, ir a:
	https://nodejs.org/api/errors.html#errors_error_code
*/

// Funciona bien con node-v5.12.0

//---------------------------------------------------------------------
// DEPENDENCIAS
//---------------------------------------------------------------------
var gulp    = require('gulp'),
	browserSync = require('browser-sync').create(),  
	stylus    = require('gulp-stylus'),
	nib       = require('nib'),
	pug       = require('gulp-pug'),
	imageop   = require('gulp-image-optimization'),
	gutil     = require('gulp-util'),
	groupQuerys= require('gulp-group-css-media-queries');

var glob = require("glob");
	
var fs = require('fs');

//---------------------------------------------------------------------
//  RUTAS DE LOS ARCHIVOS
//---------------------------------------------------------------------
var paths = {
	css:{
		main  : 'dev/stylus/estilos.styl',
		watch : 'dev/**/*.styl',
		dest  : 'public/css/'
	},
	html:{
		main  : 'dev/index.pug',
		watch : 'dev/**/*.pug',
		dest  : 'public/html/',
		inline: 'public/index.html',
		html  : 'dev/html/*.pug'
	},
	js:{
		main  : 'dev/app.js',
		watch : 'dev/**/*.js',
		dest  : 'public/js/',
		other : 'dev/js/*.js'
	},
	images:{
	// watch : ['dev/assets/**/*.png','dev/assets/**/*.jpg','dev/assets/**/*.gif','dev/assets/**/*.jpeg'],    
		watch : ['dev/assets/**/*.png','dev/assets/**/*.jpg','dev/assets/**/*.gif'],
		dest  : 'public/' //se guardan en public/images/
	},
	fonts:{
		watch : ['dev/assets/**/*.eot','dev/assets/**/*.svg','dev/assets/**/*.ttf','dev/assets/**/*.woff'],
		dest  : 'public/'//se guardan en public/fonts/
	},
	server:{
		folder : './public',
		folder2 : './public/html'
	}

};

//---------------------------------------------------------------------
// RUN SERVER
//---------------------------------------------------------------------
gulp.task('server', function(){ 
	// Serve files from "public" of this project
	browserSync.init({
			server:{
					baseDir: paths.server.folder,
					index: "./html/index.html",
					directory: true
			}
	});
});

//---------------------------------------------------------------------
// TAREA build-css
//---------------------------------------------------------------------
gulp.task('build-css', function(){
	return gulp.src(paths.css.main)
	.pipe(stylus({
		use: nib(),
		'include css': true
	}))
	.on('error', gutil.log)
	.pipe(groupQuerys())
	.on('error', gutil.log)
	.pipe(gulp.dest(paths.css.dest))
	.pipe(browserSync.reload({stream: true}));
});

//---------------------------------------------------------------------
// TAREA build-html
//---------------------------------------------------------------------
gulp.task('build-html', function() {
	return gulp.src(paths.html.html)
	.pipe(pug({
		pretty: true
	}))
	.on('error', gutil.log)
	.pipe(gulp.dest(paths.html.dest))
	.pipe(browserSync.reload({stream: true}));
});

//---------------------------------------------------------------------
// COPIAR JS
//---------------------------------------------------------------------
gulp.task('copy-js', function(){
	return gulp.src(paths.js.other)
		.pipe(gulp.dest(paths.js.dest))
		.pipe(browserSync.reload({stream: true}));
});

//---------------------------------------------------------------------
// TAREA build-JS
//---------------------------------------------------------------------
gulp.task('build-js', ['copy-js']);

//---------------------------------------------------------------------
// ENCONTRAR ARCHIVOS
//---------------------------------------------------------------------
function findFiles(busqueda){
	return glob(busqueda,function(err,files){
		if (err) throw err;
		files.forEach(function(item,index,array){
			
			var imgDev = item.split("/").pop();

			var buscarPublic = paths.images.dest+"**/"+imgDev;

			return glob(buscarPublic,function(err,files){
				if (err) throw err;
				if(files == ''){
					//Si no encuentra la imagen, en la carpeta de destino, la optimiza
					// console.log("Files esta vacia, se optimizara la imagen");
					return gulp.src('dev/assets/**/'+imgDev)
						.pipe(imageop({
							optimizationLevel: 7,
							progressive: true,
							interlaced: true
						}))
						.pipe(gulp.dest(paths.images.dest))
						.pipe(browserSync.reload({stream: true}));
				}
			});

		});
	});
}

/*Este esta basado en este script para encontrar y borrar archivos:
*/

// var glob = require("glob");
// var fs = require("fs");

// // Find files
// glob("**/file.txt",function(err,files){
//      if (err) throw err;
//      files.forEach(function(item,index,array){
//           console.log(item + " found");
//      });
//      // Delete files
//      files.forEach(function(item,index,array){
//           fs.unlink(item, function(err){
//                if (err) throw err;
//                console.log(item + " deleted");
//           });
//      });
// });


//---------------------------------------------------------------------
// TAREA MINIFICAR Y OPTIMIZAR IMAGENES
//---------------------------------------------------------------------
gulp.task('image-min', function(){
	return paths.images.watch.forEach(function(busqueda,index,array){
	  return findFiles(busqueda);
		}
	);
});

//---------------------------------------------------------------------
// TAREA COPIAR FUENTES
//---------------------------------------------------------------------
gulp.task('copy-fonts', function(){
	return paths.fonts.watch.forEach(function(busqueda,index,array){

		return glob(busqueda,function(err,files){
			if (err) throw err;
			files.forEach(function(item,index,array){
				
				var fontDev = item.split("/").pop();

				var buscarPublic = paths.fonts.dest+"**/"+fontDev;

				return glob(buscarPublic,function(err,files){
					if (err) throw err;
					if(files == ''){
						//Si no encuentra la fuente, en la carpeta de destino, la copia
						return gulp.src('dev/assets/**/'+fontDev)
							.pipe(gulp.dest(paths.fonts.dest))
							.pipe(browserSync.reload({stream: true}));
					}
				});

			});
		});
	});	
});

//---------------------------------------------------------------------
// TAREA WATCH
//---------------------------------------------------------------------
gulp.task('watch', function(){
	gulp.watch(paths.css.watch, ['build-css']);
	gulp.watch(paths.html.watch, ['build-html']);
	gulp.watch(paths.js.watch, ['build-js']);
	gulp.watch(paths.images.watch, ['image-min']);
	gulp.watch(paths.fonts.watch, ['copy-fonts']);
});

//---------------------------------------------------------------------
// BUILD ALL
//---------------------------------------------------------------------
gulp.task('build', ['build-css','build-html','build-js','assets']);

//---------------------------------------------------------------------
// PREPARAR ASSETS (IMAGENES, FONTS)
//---------------------------------------------------------------------
gulp.task('assets',['image-min','copy-fonts']);

//---------------------------------------------------------------------
// TAREA POR DEFECTO
//---------------------------------------------------------------------
gulp.task('default', ['server','build','watch']);