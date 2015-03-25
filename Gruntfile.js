module.exports = function(grunt) {

  grunt.initConfig({
    uglify: {
      options: {
        mangle: false,
      },
      dev: {
        options: {
          sourceMap: true,
          sourceMapName: 'app/public/dist/js/bundle.min.map'
        },
        files: {
          'app/public/dist/js/bundle.min.js': [
            'app/public/assets/libs/jquery/dist/jquery.min.js', 
            'app/public/assets/libs/angular/angular.min.js',
            'app/public/app.module.js',
            'app/public/shared/**/*.js',
            'app/public/sections/**/*.js'
          ]
        }
      }
    },
    connect: {
      dev: {
        options: {
          base: 'app/public/',
          livereload: true,
          port: 9000,
          hostname: 'localhost',
          keepalive: true,
          protocol: 'http'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('s', ['uglify:dev', 'connect:dev']);
}
