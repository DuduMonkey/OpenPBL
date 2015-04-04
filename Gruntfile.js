module.exports = function(grunt) {

  grunt.initConfig({

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
    },

    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1,
        sourceMap: true,
        report: 'min'
      },
      all: {
        files: {
          'app/public/dist/css/bundle.min.css': [
            'app/public/assets/libs/bootstrap/dist/css/bootstrap.min.css',
            'app/public/assets/libs/toastr/toastr.min.css',
            'app/public/assets/css/**/*.css'
            ]
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

    jshint: {
      options: {
        jshintrc: true,
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        'app/public/*.js',
        'app/public/sections/**/*.js',
        'app/public/shared/**/*.js'
      ]
    },

    plato: {
      options: {
        exclude: /\.min\.js$/,
        jshint : grunt.file.readJSON('.jshintrc')
      },
      metrics: {
        files: {
          'reports': [
          'app/public/*.js',
          'app/public/sections/**/*.js',
          'app/public/shared/**/*.js',
          'app/server/**/*.js',
          ]
        }
      }
    },

    shell: {
      openReportsDarwin: {
        command: 'open reports/index.html',
        options: {
          stdout: true
        }
      },
      openReportsWin: {
        command: 'start reports/index.html',
        options: {
          stdout: true
        }
      }
    },

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
            'app/public/assets/libs/bootstrap/dist/js/bootstrap.min.js',
            'app/public/assets/libs/angular/angular.min.js',
            'app/public/assets/libs/angular-route/angular-route.min.js',
            'app/public/assets/libs/toastr/toastr.min.js',
            'app/public/app.modules.js',
            'app/public/app.js',
            'app/public/app.constants.js',
            'app/public/shared/**/*.js',
            'app/public/sections/**/*.js'
            ]
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-auto-install');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-plato');

  grunt.registerTask('s', [
    'auto_install',
    'jshint',
    'uglify:dev',
    'cssmin',
    'express:dev'
    ]);

  grunt.registerTask('metrics:win', ['plato:metrics', 'shell:openReportsWin']);
  grunt.registerTask('metrics:darwin', ['plato:metrics', 'shell:openReportsDarwin']);
};
