module.exports = function(grunt) {

  grunt.initConfig({
    uglify: {
      options: {
        mangle: false,
      },
      dev: {
        options: {
          sourceMap: true,
          sourceMapName: 'app/public/dist/js/bundle.min.js.map'
        },
        files: {
          'app/public/dist/js/bundle.min.js': [
            'app/public/assets/libs/jquery/dist/jquery.min.js', 
            'app/public/assets/libs/angular/angular.min.js',
            'app/public/assets/libs/angular-route/angular-route.min.js',
            'app/public/app.modules.js',
            'app/public/app.js',
            'app/public/shared/**/*.js',
            'app/public/sections/**/*.js'
            ]
        }
      }
    },
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1,
        sourceMap: true,
        report: 'min'
      },
      target: {
        files: {
          'app/public/dist/css/bundle.min.css': [
            'app/public/assets/libs/bootstrap/dist/css/bootstrap.min.css'
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
    },
    express: {
      options: {
        background: true,
        port: 9000,
        debug: true
      },
      dev: {
        options: {
          script: 'app/server/server.js'
        }
      }
    },
    auto_install: {
    local: {},
      subdir: {
        options: {
          cwd: 'subdir',
          stdout: true,
          stderr: true,
          failOnError: true,
          npm: true,
          bower: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-auto-install');

  grunt.registerTask('s', ['auto_install', 'uglify:dev', 'cssmin', 'express:dev']);
}
